// backend/server.js
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const cors = require("cors");
const nodemailer = require("nodemailer");

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
    db.all(sql, params, (err, rows) => err ? rej(err) : res(rows));
  });
}
function dbGet(sql, params = []) {
  return new Promise((res, rej) => {
    db.get(sql, params, (err, row) => err ? rej(err) : res(row));
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
// Correo
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "perfumesdurataroyal@gmail.com",
    pass: "aphj noff cnsj xksv" 
  }
});

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

    // 📧 Enviar correo
    let html = `<h2>Nuevo Pedido</h2>
      <p><b>Cliente:</b> ${customer}</p>
      <p><b>Dirección:</b> ${address}</p>
      <p><b>Teléfono:</b> ${phone}</p>
      <h3>Productos:</h3>
      <ul>
        ${items.map(it => `<li>${it.name} (x${it.qty}) - $${(it.price * it.qty).toFixed(2)}</li>`).join("")}
      </ul>
      <p><b>Total:</b> $${total.toFixed(2)}</p>
      <p><b>Pedido ID:</b> ${orderId}</p>`;

    await transporter.sendMail({
      from: '"Pedidos Perfumes" <yurleyloaiza42@gmail.com>',
      to: "Julianandres353@gmail.com, yurleytur@gmail.com, Ducuara1988@gmail.com", 
      subject: "🛒 Nuevo Pedido de Perfumes",
      html
    });

    res.json({ message: "Pedido registrado y correo enviado", orderId });
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
         WHERE oi.order_id = ?`, [o.id]
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
