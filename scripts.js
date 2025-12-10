const $ = (sel, scope = document) => scope.querySelector(sel);
const $$ = (sel, scope = document) => [...scope.querySelectorAll(sel)];

document.addEventListener("DOMContentLoaded", () => {
  highlightNav();
  renderProducts();
  hydrateOrderForm();
});

// --- данные каталога ---
const products = [
  { name: "Лунный камень", price: 4900, img: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAFwAXAMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAFBgQHAAECA//EADgQAAEDAwIDAwgJBQAAAAAAAAEAAgMEBREhMRJBUQYioQcTMkJhcbHRFCNSU3KRksHwFWKBouH/xAAYAQADAQEAAAAAAAAAAAAAAAABAgMABP/EAB0RAQEAAgMBAQEAAAAAAAAAAAEAAhEDEiExURP/2gAMAwEAAhEDEQA/AKOWLFi1rF1HG+V3DExz3dGjJTHZuzDpWNnuRMcZ1EQ0cff0TPTxU1IzzdJAxg9gVMeNZXKRobBc5RkUpaOryAvU9m7gNxF+tO7uN/VeT4HnkVQ4iHaRZbLXx7wcQ/tcCoUkckTuGVjmHo4YT++FwUWogbK0tlY17ehGUHh/Ld5HWI3X2XGX0mfbGf2QUggkEYI3BUssXH7MO7SxYtJY2019lLM3hbcKpufuWEf7fJArLQ/1C4xQHPB6T/wj+YVivaI2NYwAADGAq8eO/ZVvJxdI5SIKbO65hZqiELdF0vhKWmU7QNlxIxo5KScrydG4pTFZthD54wUPmYjb6ckbKJNSk8k4U2CvahF4tonY6eFv1zRlwHrj5pklpXdFGdA9uoCOfGZEplpkFYid+oxS1nGwYjm7wHQ8x/OqGLgTTq6D2cewVLxNqKkjUuDB/jU/FMkwy9c+Suijq6emifjhfI8uycDdTq2mfDVSQvGHscWuHtBwV1cR8KeTeMDM4RKGPTZcUdK5x2R+joCQMjwVklGGxUpedl7ih0zhN9mtFPMXNnJaOuF1UWkMeWxEPGdCh2x3qHsn/QM8lsWku9VOEVqwMka9MKbDbmD0mgNCzkQkVvZx0h9FTYuxDpWHiHD7wnGeppKBpIALgl+4dp34IY7ARM8n5DrVt5TuykdvsxnikDpIXhxaOh0Px8FU6ujtVK+vtlzL3EgUsjvyaSqXXHzI5+V8RMa0/JJORTZbgGOV7M9OJu/j4Jtmtcs1dKXtAdxnOPeqz8l11FDepKSQ9yrZ3c/bbqPDPgrdjuzY3atCtxOyTKl2yzcOMhH6e3saOSCQ35mmMKSL20jIcnyGUY+yBjBoQAuyIhuQlt16I2d4qLNeSdnJerNNclXBE3UjRBrlfWtaWsOAluquziD3kErK8uJ1TGJCIXS7ukJ7yBS1mdyo9fMGSua12cHCGSTEndMmyG9NMvFe2OyXA51fTvZ+oY/dVWm7tVVebtrafPendt7Br8cJRXFmBlXHZdwSyQTMmhcWSRuDmuHIjZW3Z7yy725lSwgSYxIwH0Xc1UKI2S7TWir87F3o3aSR/aHzR48+r7BN1qfSXMO69GXBw5oVR11PcqYT0sgcOY5tPQhbdxArtESixn+oE+suH1pPNB/OOC6mjqY4I55IpGxS54HlpDXY0ODzW623TJqzTdD56onZeDnOK8i1xK2ghu3PO6WRz3HJJyVxo1rpJHBrGjLnHYBdFjYmGSZwYxoyS44wlW/Xr6ZmmpctpwdTzf8A8UuTkAmxx3QbxXG4VrpRpGO7GOjVBWLFxrutYtrSxa1Loaqoo5RNSyujeOYO/vHNNFD2uGA24Qa/eRfJKUZwxbOu6fHLI+QQaw4LzaqgDgqowTyceE/kVKM9K5ukzCPxKsCFgaNdFX+rL0rGnr7fCPrKmJvs4xlCKztPRxAikjdM7qRgeKT1iV5GxiUq43OruDszv7nJjdGhQV6LRUn2e4WLZ3WkLX//2Q==" },
  { name: "Марсианская почва", price: 5300, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Mars_Valles_Marineris_EDIT.jpg/960px-Mars_Valles_Marineris_EDIT.jpg" },
  { name: "Фотонный двигатель", price: 15200, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ37Xg0ONfZOAVbfBs5A0Sj_S_fPSk041F66jfuK-vAnxJ31sDijjmdnacgSuM8ahhqVwq_KtoV&s=10" },
  { name: "Мини-метеорит", price: 2100, img: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=900&q=80" },
  { name: "Гравитационный стабилизатор", price: 8700, img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=900&q=80" },
  { name: "Космический кристалл", price: 4500, img: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=900&q=80" },
  { name: "Орбитальная антенна", price: 6900, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Starblazer_khabarovsk_teleport.jpg/960px-Starblazer_khabarovsk_teleport.jpg" },
  { name: "Нейтронный аккумулятор", price: 9400, img: "https://images.unsplash.com/photo-1447433865958-f402f562b843?auto=format&fit=crop&w=900&q=80" },
  { name: "Галактическая карта", price: 3200, img: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?auto=format&fit=crop&w=900&q=80" },
  { name: "Сувенир «Ровер»", price: 2700, img: "data:image/jpeg;base64,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" }
];

const cart = {};

function highlightNav() {
  const current = window.location.pathname.split("/").pop() || "index.html";
  $$(".nav-link").forEach(link => {
    if (link.getAttribute("href") === current) {
      link.classList.add("active-page");
      link.setAttribute("aria-current", "page");
    }
  });
}

function renderProducts() {
  const list = $("#product-list");
  if (!list) return;

  list.innerHTML = products.map((item, i) => `
    <div class="col-md-6 col-lg-4">
      <article class="product-card h-100">
        <h4 class="mb-1">${item.name}</h4>
        <img src="${item.img || `https://picsum.photos/seed/${i}/420/260`}" class="img-fluid rounded mb-2" alt="${item.name}">
        <div class="d-flex justify-content-between align-items-center">
          <span class="price">${item.price.toLocaleString("ru-RU")} ₽</span>
        </div>
        <label class="mt-2 small text-muted d-block">Количество</label>
        <input type="number" min="0" value="0" class="form-control form-control-sm qty-input text-center" data-index="${i}" data-price="${item.price}" aria-label="Количество для ${item.name}">
      </article>
    </div>
  `).join("");

  list.addEventListener("input", onQuantityChange);
  renderTotal();
}

function hydrateOrderForm() {
  const form = $("form[action='https://httpbin.org/post']");
  if (!form) return;

  form.customer_name.value ||= "Гость музея";
  form.product_name.value = form.product_name.value || "Космический сувенир";
  form.item_count.value ||= 1;
  const delivery = form.querySelector("[name='delivery']");
  if (delivery && !form.querySelector("[name='delivery']:checked")) delivery.checked = true;

  const hint = $(".price-hint");
  if (hint) hint.textContent = "";
}

function onQuantityChange(e) {
  if (!e.target.classList.contains("qty-input")) return;
  const { index, price } = e.target.dataset;
  const qty = Math.max(0, parseInt(e.target.value, 10) || 0);
  e.target.value = qty;
  cart[index] = { qty, price: Number(price) };
  renderTotal();
}

function renderTotal() {
  const el = $("#total-sum");
  if (!el) return;
  const sum = Object.values(cart).reduce((s, { qty, price }) => s + qty * price, 0);
  sum = sum-0.05*sum; // скидка 5%  
  el.textContent = sum.toLocaleString("ru-RU");
}
