document.addEventListener("DOMContentLoaded", () => {
  // --------- Elementos base
  const productGrid = document.getElementById("productGrid");
  const cartBtn = document.getElementById("cartBtn");
  const cartCounter = document.getElementById("cartCounter");
  const cartDrawer = document.getElementById("cartDrawer");
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

  // --------- Paginación
  const prevPageBtn = document.getElementById("prevPage");
  const nextPageBtn = document.getElementById("nextPage");
  const pageInfo = document.getElementById("pageInfo");
  let currentPage = 1;
  const pageSize = 28;

  // --------- Datos
  let products = [];
  let filteredProducts = [];
  let cart = {};

  // --------- SweetAlert base (paleta dorada)
  const swalBase = {
    background: "#000000",
    color: "#FFD700",
    confirmButtonColor: "#FFD700",
    cancelButtonColor: "#666",
    iconColor: "#FFD700",
  };

  // ================================
  // POP-UP DE PROMOCIONES (solo 1 vez por día)
  const PROMO_KEY_PREFIX = "promoShown-";
  function promoKeyForToday() {
    const d = new Date();
    return `${PROMO_KEY_PREFIX}${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  }
  function shouldShowPromoToday() {
    return !localStorage.getItem(promoKeyForToday());
  }
  function markPromoShownToday() {
    localStorage.setItem(promoKeyForToday(), "1");
  }

  async function showWelcomePromo() {
    // Demo estático (puedes reemplazar por fetch a /api/promos)
    const promos = [
      // { title: "2×1 en Miniaturas", desc: "Combina tus aromas favoritos.", badge: "-50%", img: "https://via.placeholder.com/960x420?text=Promo+1" },
      { title: "Dos perfumes por solo $190.000", desc: "Envío gratis en Bogotá por lanzamiento.", badge: "ENVÍO GRATIS", img: "img/lineagld.png" },
      { title: "Personalizados", desc: "Precio especial por tiempo limitado.", badge: "Envío Gratis en Bogotá", img: "img/perfumes.png" }
    ];

    const slides = promos.map(p => `
      <div style="margin-bottom:16px;border:1px solid rgba(212,175,55,.25);border-radius:12px;overflow:hidden;background:#0b0b0b">
        <div style="position:relative">
          <img src="${p.img}" alt="${p.title}" style="width:100%;display:block;max-height:240px;object-fit:cover">
          <span style="
            position:absolute;top:10px;left:10px;background:rgba(212,175,55,.9);
            color:#000;padding:4px 8px;border-radius:999px;font-weight:800;font-size:.8rem;
          ">${p.badge}</span>
        </div>
        <div style="padding:10px 12px">
          <div style="font-weight:800;color:#f5d87f">${p.title}</div>
          <div style="color:#b8b8b8;font-size:.95rem">${p.desc}</div>
        </div>
      </div>
    `).join("");

    Swal.fire({
      ...swalBase,
      title: "🎉 Bienvenido a Perfumes Durata Royal",
      html: `
        <div style="text-align:left;max-height:60vh;overflow:auto">
          <p style="margin-top:0;color:#b8b8b8">
            Aprovecha nuestras <strong style="color:#f5d87f">promociones de hoy</strong>:
          </p>
          ${slides}
        </div>
      `,
    
    }).then((res) => {
      if (res.value === 1 || res.dismiss) markPromoShownToday();

      if (res.isConfirmed) {
        document.getElementById("productGrid")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  function initWelcomePromoPopup() {
    if (!shouldShowPromoToday()) return;
    setTimeout(() => {
      const modalAbierto = !document.getElementById("productModal").classList.contains("hidden");
      const drawerAbierto = document.getElementById("cartDrawer").classList.contains("open");
      if (modalAbierto || drawerAbierto) {
        setTimeout(initWelcomePromoPopup, 1500);
        return;
      }
      showWelcomePromo();
    }, 1000);
  }
  // ================================

  // --------- Cargar productos
  async function loadProducts() {
    try {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Respuesta no OK");
      products = await res.json();
    } catch (err) {
      console.error("Error cargando productos", err);
      // Fallback para demo
      products = [
        { id: 1, name: "Aroma Royal", description: "Notas cítricas y ámbar.", price: 89.9, images: [] },
        { id: 2, name: "Nocturne", description: "Vainilla y sándalo.", price: 109.5, images: [] },
        { id: 3, name: "Fleur d'Or", description: "Floral intenso.", price: 95.0, images: [] }
      ];
    }
    filteredProducts = products.slice();
    renderPage();
  }

  // --------- Render de página y tarjetas
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
            <div class="price">$${Number(p.price).toFixed(2)}</div>
            <button class="btn primary small" data-id="${p.id}">Agregar</button>
          </div>
        </div>
      `;

      // Abrir modal al hacer clic en la tarjeta (img o título)
      div.querySelector("img.thumb").addEventListener("click", () => openProductModal(p));
      div.querySelector("h3").addEventListener("click", () => openProductModal(p));
      // Agregar al carrito
      div.querySelector("button").addEventListener("click", (e) => {
        e.stopPropagation();
        addToCart(p.id, 1);
      });

      productGrid.appendChild(div);
    });

    const totalPages = Math.ceil(filteredProducts.length / pageSize) || 1;
    pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
  }

  // --------- Eventos de paginación
  prevPageBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderPage();
    }
  });
  nextPageBtn.addEventListener("click", () => {
    const totalPages = Math.ceil(filteredProducts.length / pageSize) || 1;
    if (currentPage < totalPages) {
      currentPage++;
      renderPage();
    }
  });

  // --------- Carrito
  function addToCart(id, qty) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    if (cart[id]) {
      cart[id].qty += qty;
    } else {
      cart[id] = { id: p.id, name: p.name, price: Number(p.price), qty, image: (p.images && p.images[0]) || "" };
    }
    updateCartCounter();
    renderCart();
  }

  function updateCartCounter() {
    const count = Object.values(cart).reduce((s, it) => s + it.qty, 0);
    cartCounter.textContent = String(count);
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
              <span>${it.qty}</span>
              <button class="inc" data-id="${it.id}">+</button>
            </div>
            <button class="btn ghost remove" data-id="${it.id}">Eliminar</button>
          </div>
        </div>
      `;
      cartItemsEl.appendChild(div);
    });

    // Eventos de cantidad y eliminar
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

  // Drawer (tu CSS usa clase .open)
  cartBtn.addEventListener("click", () => {
    cartDrawer.classList.add("open");
    cartDrawer.setAttribute("aria-hidden", "false");
  });
  closeCart.addEventListener("click", () => {
    cartDrawer.classList.remove("open");
    cartDrawer.setAttribute("aria-hidden", "true");
  });

  // --------- Checkout
  checkoutBtn.addEventListener("click", async () => {
    const name = customerName.value.trim();
    const address = customerAddress.value.trim();
    const phone = customerPhone.value.trim();

    if (!name || !address || !phone) {
      return Swal.fire({
        ...swalBase, icon: "warning",
        title: "Datos incompletos", text: "Ingresa tu nombre, dirección y teléfono"
      });
    }

    const items = Object.values(cart).map(it => ({
      id: it.id, name: it.name, qty: it.qty, price: it.price
    }));

    if (items.length === 0) {
      return Swal.fire({
        ...swalBase, icon: "info",
        title: "Carrito vacío", text: "Agrega productos antes de continuar"
      });
    }

    try {
      Swal.fire({
        ...swalBase, title: "Enviando pedido...", text: "Por favor espera",
        allowOutsideClick: false, didOpen: () => Swal.showLoading()
      });

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer: name, address, phone, items })
      });

      const data = await res.json().catch(() => ({}));
      Swal.close();

      if (res.ok) {
        Swal.fire({
          ...swalBase, icon: "success",
          title: "Pedido confirmado", text: "Pronto nos pondremos en contacto."
        });
        cart = {};
        renderCart(); updateCartCounter();
        customerName.value = ""; customerAddress.value = ""; customerPhone.value = "";
        cartDrawer.classList.remove("open");
        cartDrawer.setAttribute("aria-hidden", "true");
      } else {
        Swal.fire({
          ...swalBase, icon: "error",
          title: "❌ Error", text: data.error || "No se pudo procesar el pedido"
        });
      }
    } catch (err) {
      Swal.close();
      Swal.fire({
        ...swalBase, icon: "error",
        title: "⚠️ Error", text: "No se pudo conectar con el servidor"
      });
    }
  });

  // --------- Modal de producto (sin overlay extra)
  const productModal = document.getElementById("productModal");
  const closeModal = document.getElementById("closeModal");
  const mainImg = document.getElementById("mainImg");
  const thumbnails = document.getElementById("thumbnails");
  const modalName = document.getElementById("modalName");
  const modalDesc = document.getElementById("modalDesc");
  const modalPrice = document.getElementById("modalPrice");
  const modalQty = document.getElementById("modalQty");
  const modalAdd = document.getElementById("modalAdd");
  let currentImgIndex = 0;
  let currentProduct = null;

  function openProductModal(product) {
    currentProduct = product;
    currentImgIndex = 0;

    const imgs = product.images && product.images.length > 0
      ? product.images
      : ["https://via.placeholder.com/800x600?text=Perfume"];

    mainImg.src = imgs[0];
    mainImg.alt = product.name;

    thumbnails.innerHTML = "";
    imgs.forEach((src, i) => {
      const t = document.createElement("img");
      t.src = src;
      t.alt = `Vista ${i + 1} de ${product.name}`;
      t.className = `thumb-small${i === 0 ? " active" : ""}`;
      t.addEventListener("click", () => {
        currentImgIndex = i;
        mainImg.src = src;
        thumbnails.querySelectorAll(".thumb-small").forEach(im => im.classList.remove("active"));
        t.classList.add("active");
      });
      thumbnails.appendChild(t);
    });

    modalName.textContent = product.name;
    modalDesc.textContent = product.description || "";
    modalPrice.textContent = `$${Number(product.price).toFixed(2)}`;
    modalQty.value = 1;

    productModal.classList.remove("hidden");
    productModal.setAttribute("aria-hidden", "false");
  }

  function closeProductModal() {
    productModal.classList.add("hidden");
    productModal.setAttribute("aria-hidden", "true");
  }

  closeModal.addEventListener("click", closeProductModal);
  // Cerrar modal con click en fondo y con ESC
  productModal.addEventListener("click", (e) => {
    const card = e.target.closest(".modal-card");
    if (!card) closeProductModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !productModal.classList.contains("hidden")) {
      closeProductModal();
    }
  });

  // Carrusel
  document.getElementById("prevImg").addEventListener("click", (e) => {
    e.stopPropagation();
    if (!currentProduct) return;
    const imgs = currentProduct.images && currentProduct.images.length > 0
      ? currentProduct.images
      : ["https://via.placeholder.com/800x600?text=Perfume"];
    currentImgIndex = (currentImgIndex - 1 + imgs.length) % imgs.length;
    mainImg.src = imgs[currentImgIndex];
    thumbnails.querySelectorAll(".thumb-small").forEach((im, idx) => im.classList.toggle("active", idx === currentImgIndex));
  });

  document.getElementById("nextImg").addEventListener("click", (e) => {
    e.stopPropagation();
    if (!currentProduct) return;
    const imgs = currentProduct.images && currentProduct.images.length > 0
      ? currentProduct.images
      : ["https://via.placeholder.com/800x600?text=Perfume"];
    currentImgIndex = (currentImgIndex + 1) % imgs.length;
    mainImg.src = imgs[currentImgIndex];
    thumbnails.querySelectorAll(".thumb-small").forEach((im, idx) => im.classList.toggle("active", idx === currentImgIndex));
  });

  // Agregar al carrito desde modal
  modalAdd.addEventListener("click", () => {
    if (!currentProduct) return;
    const qty = Math.max(1, parseInt(modalQty.value, 10) || 1);
    addToCart(currentProduct.id, qty);
    closeProductModal();
  });

  // --------- Filtros
  const searchInput = document.getElementById("search");
  const sortSelect = document.getElementById("sort");

  function applyFilters() {
    const q = (searchInput.value || "").toLowerCase().trim();
    filteredProducts = products.slice();

    if (q) {
      filteredProducts = filteredProducts.filter(p =>
        (`${p.name} ${p.description || ""}`).toLowerCase().includes(q)
      );
    }

    const sort = sortSelect.value;
    if (sort === "price-asc") filteredProducts.sort((a, b) => Number(a.price) - Number(b.price));
    if (sort === "price-desc") filteredProducts.sort((a, b) => Number(b.price) - Number(a.price));
    // "popular" mantiene orden original

    currentPage = 1;
    renderPage();
  }

  searchInput.addEventListener("input", applyFilters);
  sortSelect.addEventListener("change", applyFilters);

  // --------- Inicio
  // Cargamos productos y luego inicializamos el pop-up de bienvenida
  loadProducts().then(() => {
    initWelcomePromoPopup();
  });
});
