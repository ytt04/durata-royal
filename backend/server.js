// backend/server.js
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");
const cors = require("cors");

// 1) Cargar .env desde la RAÍZ (donde está el README)
const envPath = path.join(__dirname, "..", ".env");
require("dotenv").config({ path: envPath });
// (debug opcional)
console.log("[env] path:", envPath, "exists?", fs.existsSync(envPath), "| BREVO?", !!process.env.BREVO_API_KEY);

const app = express();
app.use(cors());
app.use(express.json());

// ================================
// DB
const dbPath = path.join(__dirname, "database.sqlite");
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    images TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer TEXT NOT NULL,
    address TEXT,
    phone TEXT,
    total REAL NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER,
    FOREIGN KEY(order_id) REFERENCES orders(id),
    FOREIGN KEY(product_id) REFERENCES products(id)
  )`);
});

function dbAll(sql, params = []) {
  return new Promise((res, rej) => {
    db.all(sql, params, (err, rows) => (err ? rej(err) : res(rows)));
  });
}
function dbGet(sql, params = []) {
  return new Promise((res, rej) => {
    db.get(sql, params, (err, row) => (err ? rej(err) : res(row)));
  });
}
function dbRun(sql, params = []) {
  return new Promise((res, rej) => {
    db.run(sql, params, function (err) {
      if (err) return rej(err);
      res(this);
    });
  });
}

// ================================
// Correo por API HTTPS (Brevo)
const BREVO_API_KEY = process.env.BREVO_API_KEY || "";

/** Enviar email usando la API de Brevo (no requiere librería extra en Node 18+) */
async function sendEmailBrevo({ to, from, subject, html }) {
  if (!BREVO_API_KEY) {
    console.warn("⚠️ Falta BREVO_API_KEY. Se omite envío.");
    return;
  }

  // Parsear "Nombre <email@dominio>"
  const m = /^(.*)<(.+)>$/.exec(from) || [];
  const sender = {
    name: (m[1] || "").trim() || from,
    email: (m[2] || from).trim()
  };

  // Formato que espera Brevo
  const toList = to.map(email => ({ email }));

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": BREVO_API_KEY
    },
    body: JSON.stringify({
      sender,
      to: toList,
      subject,
      htmlContent: html
    })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Brevo error ${res.status}: ${text}`);
  }
  return res.json();
}

// from/to (puedes dejarlos en .env)
const MAIL_FROM = process.env.MAIL_FROM || "Perfumes Durata Royal <perfumesdurataroyal@gmail.com>";
const MAIL_TO = (process.env.ORDER_TO || "Julianandres353@gmail.com, yurleytur@gmail.com, Ducuara1988@gmail.com")
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);

// ================================
// Endpoints
app.get("/api/products", async (req, res) => {
  try {
    const rows = await dbAll("SELECT * FROM products ORDER BY id");
    const products = rows.map(r => {
      let imgs = [];
      try { imgs = JSON.parse(r.images || "[]"); } catch { imgs = []; }
      return { ...r, images: imgs };
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/orders", async (req, res) => {
  try {
    const { customer, address, phone, items } = req.body;
    if (!customer || !address || !phone || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Datos inválidos" });
    }

    let total = 0;
    for (const it of items) {
      const prod = await dbGet("SELECT price FROM products WHERE id = ?", [it.id]);
      if (!prod) return res.status(400).json({ error: `Producto ${it.id} no existe` });
      total += prod.price * (it.qty || 1);
    }

    const result = await dbRun(
      "INSERT INTO orders (customer, address, phone, total) VALUES (?, ?, ?, ?)",
      [customer, address, phone, total]
    );
    const orderId = result.lastID;

    for (const it of items) {
      await dbRun(
        "INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)",
        [orderId, it.id, it.qty || 1]
      );
    }

    // Email (Brevo). Si no hay API key, no rompe el flujo.
    const html = `<h2>Nuevo Pedido</h2>
      <p><b>Cliente:</b> ${customer}</p>
      <p><b>Dirección:</b> ${address}</p>
      <p><b>Teléfono:</b> ${phone}</p>
      <h3>Productos:</h3>
      <ul>
        ${items.map(it => `<li>${it.name ?? it.id} (x${it.qty}) - $${((it.price || 0) * (it.qty || 1)).toFixed(2)}</li>`).join("")}
      </ul>
      <p><b>Total:</b> $${total.toFixed(2)}</p>
      <p><b>Pedido ID:</b> ${orderId}</p>`;

    try {
      await sendEmailBrevo({
        to: MAIL_TO,
        from: MAIL_FROM, // debe estar verificado en Brevo → Settings > Senders
        subject: "🛒 Nuevo Pedido de Perfumes",
        html
      });
    } catch (e) {
      console.error("❌ Error enviando correo (Brevo):", e.message);
      // Si quieres, no rompas el flujo: podrías responder 202 y seguir
    }

    res.json({ message: "Pedido registrado", orderId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/orders", async (req, res) => {
  try {
    const orders = await dbAll("SELECT * FROM orders ORDER BY created_at DESC");
    const result = [];
    for (const o of orders) {
      const items = await dbAll(
        `SELECT oi.quantity, p.id, p.name, p.price
         FROM order_items oi
         JOIN products p ON oi.product_id = p.id
         WHERE oi.order_id = ?`,
        [o.id]
      );
      result.push({ ...o, items });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================================
// Frontend
app.use("/", express.static(path.join(__dirname, "../public")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
