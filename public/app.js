document.addEventListener("DOMContentLoaded", () => {
  const productGrid = document.getElementById("productGrid");
  const cartBtn = document.getElementById("cartBtn");
  const cartCounter = document.getElementById("cartCounter");
  const cartDrawer = document.getElementById("cartDrawer");
  const drawerOverlay = document.getElementById("drawerOverlay");
  const closeCart = document.getElementById("closeCart");
  const cartItemsEl = document.getElementById("cartItems");
  const cartTotalEl = document.getElementById("cartTotal");
  const clearCartBtn = document.getElementById("clearCartBtn");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const customerName = document.getElementById("customerName");
  const customerAddress = document.getElementById("customerAddress");
  const customerPhone = document.getElementById("customerPhone");
  const yearEl = document.getElementById("year");
  yearEl.textContent = new Date().getFullYear();

  // Paginación
  const prevPageBtn = document.getElementById("prevPage");
  const nextPageBtn = document.getElementById("nextPage");
  const pageInfo = document.getElementById("pageInfo");
  let currentPage = 1;
  const pageSize = 28; 

  let products = [];
  let filteredProducts = [];
  let cart = {};

  // ================================
  // Configuración de alertas personalizadas
  const swalBase = {
    background: "#000000",
    color: "#FFD700",
    confirmButtonColor: "#FFD700",
    cancelButtonColor: "#666",
    iconColor: "#FFD700",
    customClass: {
      popup: "swal-custom-popup",
      title: "swal-custom-title",
      confirmButton: "swal-custom-btn"
    }
  };

  // ================================
  // Cargar productos
  async function loadProducts() {
    try {
      const res = await fetch("/api/products");
      products = await res.json();
      filteredProducts = products.slice();
      renderPage();
    } catch (err) {
      console.error("Error cargando productos", err);
      productGrid.innerHTML = "<p class='muted'>No se pudieron cargar los productos.</p>";
    }
  }

  function renderPage() {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const list = filteredProducts.slice(start, end);

    productGrid.innerHTML = "";
    list.forEach(p => {
      const div = document.createElement("article");
      div.className = "card";
      const imgSrc = (p.images && p.images.length > 0)
        ? p.images[0]
        : "https://via.placeholder.com/600x400?text=Perfume";
      div.innerHTML = `
        <img class="thumb" src="${imgSrc}" alt="${p.name}" />
        <div class="body">
          <h3>${p.name}</h3>
          <p class="muted">${p.description || ""}</p>
          <div class="meta">
            <div class="price">$${p.price.toFixed(2)}</div>
            <button class="btn primary small" data-id="${p.id}">Agregar</button>
          </div>
        </div>
      `;
      div.querySelector("button").addEventListener("click", () => addToCart(p.id, 1));
      productGrid.appendChild(div);
    });

    // Estado de paginación
    const totalPages = Math.ceil(filteredProducts.length / pageSize) || 1;
    pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
  }

  // Eventos de paginación
  prevPageBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderPage();
    }
  });
  nextPageBtn.addEventListener("click", () => {
    const totalPages = Math.ceil(filteredProducts.length / pageSize);
    if (currentPage < totalPages) {
      currentPage++;
      renderPage();
    }
  });

  // ================================
  // Carrito 

  function addToCart(id, qty) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    if (cart[id]) {
      cart[id].qty += qty;
    } else {
      cart[id] = { id: p.id, name: p.name, price: p.price, qty, image: (p.images && p.images[0]) || "" };
    }
    updateCartCounter();
    renderCart();
  }

  function updateCartCounter() {
    const count = Object.values(cart).reduce((s, it) => s + it.qty, 0);
    cartCounter.textContent = count;
  }

  function renderCart() {
    const items = Object.values(cart);
    cartItemsEl.innerHTML = "";
    if (items.length === 0) {
      cartItemsEl.innerHTML = `<p class="muted">Tu carrito está vacío</p>`;
      cartTotalEl.textContent = `$0.00`;
      return;
    }
    let total = 0;
    items.forEach(it => {
      total += it.price * it.qty;
      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <img src="${it.image || 'https://via.placeholder.com/120'}" alt="${it.name}" />
        <div class="info">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <strong>${it.name}</strong>
            <div class="muted">$${(it.price * it.qty).toFixed(2)}</div>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-top:6px">
            <div class="qty-controls">
              <button class="dec" data-id="${it.id}">-</button>
              <div style="padding:6px 10px;border-radius:8px;background:black;color:#d4af37;border:1px solid rgba(10,37,64,0.04);margin:0 6px">${it.qty}</div>
              <button class="inc" data-id="${it.id}">+</button>
            </div>
            <button class="btn ghost remove" data-id="${it.id}">Eliminar</button>
          </div>
        </div>
      `;
      cartItemsEl.appendChild(div);
    });

    cartItemsEl.querySelectorAll(".inc").forEach(b => b.addEventListener("click", () => {
      const id = Number(b.dataset.id);
      cart[id].qty++;
      renderCart(); updateCartCounter();
    }));
    cartItemsEl.querySelectorAll(".dec").forEach(b => b.addEventListener("click", () => {
      const id = Number(b.dataset.id);
      cart[id].qty--;
      if (cart[id].qty <= 0) delete cart[id];
      renderCart(); updateCartCounter();
    }));
    cartItemsEl.querySelectorAll(".remove").forEach(b => b.addEventListener("click", () => {
      const id = Number(b.dataset.id);
      delete cart[id];
      renderCart(); updateCartCounter();
    }));

    cartTotalEl.textContent = `$${total.toFixed(2)}`;
  }

  clearCartBtn.addEventListener("click", () => {
    cart = {};
    renderCart();
    updateCartCounter();
  });

  cartBtn.addEventListener("click", () => {
    cartDrawer.classList.add("open");
    drawerOverlay.classList.remove("hidden");
  });
  closeCart.addEventListener("click", () => {
    cartDrawer.classList.remove("open");
    drawerOverlay.classList.add("hidden");
  });
  drawerOverlay.addEventListener("click", () => {
    cartDrawer.classList.remove("open");
    drawerOverlay.classList.add("hidden");
  });

  // ================================
  // Checkout (pedido + correo) ...
  // 🔹 (igual a tu versión, solo cambia el Swal de confirmación)

  checkoutBtn.addEventListener("click", async () => {
    const name = customerName.value.trim();
    const address = customerAddress.value.trim();
    const phone = customerPhone.value.trim();

    if (!name || !address || !phone) {
      return Swal.fire({
        ...swalBase,
        icon: "warning",
        title: "Datos incompletos",
        text: "Ingresa tu nombre, dirección y teléfono"
      });
    }

    const items = Object.values(cart).map(it => ({
      id: it.id, name: it.name, qty: it.qty, price: it.price
    }));

    if (items.length === 0) {
      return Swal.fire({
        ...swalBase,
        icon: "info",
        title: "Carrito vacío",
        text: "Agrega productos antes de continuar"
      });
    }

    try {
      Swal.fire({
        ...swalBase,
        title: "Enviando pedido...",
        text: "Por favor espera",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
      });

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer: name, address, phone, items })
      });

      const data = await res.json();
      Swal.close();

      if (res.ok) {
        Swal.fire({
          ...swalBase,
          title: "Pedido confirmado",
          text: "Pronto nos pondremos en contacto para confirmar tu pedido.",
          icon: "success",
          confirmButtonText: "Aceptar"
        });

        cart = {};
        renderCart();
        updateCartCounter();
        customerName.value = "";
        customerAddress.value = "";
        customerPhone.value = "";
        cartDrawer.classList.remove("open");
        drawerOverlay.classList.add("hidden");
      } else {
        Swal.fire({
          ...swalBase,
          icon: "error",
          title: "❌ Error",
          text: data.error || "No se pudo procesar el pedido"
        });
      }
    } catch (err) {
      Swal.close();
      Swal.fire({
        ...swalBase,
        icon: "error",
        title: "⚠️ Error",
        text: "No se pudo conectar con el servidor"
      });
    }
  });

  // ================================
  // Filtros
  const searchInput = document.getElementById("search");
  const sortSelect = document.getElementById("sort");
  searchInput.addEventListener("input", () => applyFilters());
  sortSelect.addEventListener("change", () => applyFilters());

  function applyFilters() {
    const q = searchInput.value.toLowerCase().trim();
    filteredProducts = products.slice();
    if (q) filteredProducts = filteredProducts.filter(p => (p.name + " " + p.description).toLowerCase().includes(q));
    const sort = sortSelect.value;
    if (sort === "price-asc") filteredProducts.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") filteredProducts.sort((a, b) => b.price - a.price);
    currentPage = 1;
    renderPage();
  }

  loadProducts();
});
