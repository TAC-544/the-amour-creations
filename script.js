/* ===============================
   script.js — unified site logic
   - products rendering (shop)
   - filters
   - add to cart, cart sidebar
   - cart page + checkout
   - reviews (star ratings)
   - gallery lightbox
   - floating hearts
   =============================== */

/* ---------- Sample product data ----------
   Replace or extend these arrays with your real inventory.
   For many items, add more entries and point img to:
   images/bracelets/bracelet1.jpg ... bracelet20.jpg
   images/charms/charm1.jpg ... charm30.jpg
   images/bouquets/bouquet1.jpg ... bouquet15.jpg
*/
const products = [
  { id: "b1", category: "bracelet", name: "Customized Crystal Butterfly Charm Bracelet", price: 100, img: "images/bracelets/b1.jpg", colors: ["Pink","Lavender","Sky Blue","Mint Green","Yellow", "Orange"] },
  { id: "b2", category: "bracelet", name: "Flower Charm  Bracelet", price: 60, img: "images/bracelets/b2.jpg", colors: ["Rose Gold","Navy Blue","Pink","Sky Blue","Red","Orange"] },
  { id: "b2", category: "bracelet", name: "Black and White Marble Bracelet", price: 75, img: "images/bracelets/b5.jpeg", colors: [] },
  { id: "b2", category: "bracelet", name: "Crystal and Color Bracelet", price: 40, img: "images/bracelets/b3.jpg", colors: ["Lavender","Pink","Yellow","Blue","Orange"] },
  { id: "b2", category: "bracelet", name: "Crystal Color Bracelet", price: 40, img: "images/bracelets/b4.jpg", colors: ["Blue","Green","Pink","Purple","Yellow","Orange"] },

  { id: "ch2", category: "charm", name: "Lavender and Pearls Phone Charm", price: 100, img: "images/charms/c5.jpg", colors: [] },
  { id: "ch2", category: "charm", name: "Panda Charm Lavender Phone Charm", price: 150, img: "images/charms/c15.jpg", colors: ["Lavender","Pink","Orange"] },
  { id: "ch1", category: "charm", name: "Orange and Pearls Phone Charm", price: 100, img: "images/charms/c1.jpg", colors: [] },
  { id: "ch2", category: "charm", name: "Blue and Pearls Phone Charm", price: 100, img: "images/charms/c2.jpg", colors: [] },
  { id: "ch2", category: "charm", name: "Yellow and Pearls Phone Charm", price: 100, img: "images/charms/c3.jpg", colors: [] },
  { id: "ch2", category: "charm", name: "Green and Pearls Phone Charm", price: 100, img: "images/charms/c4.jpg", colors: [] },
  { id: "ch2", category: "charm", name: "Baby Pink and Pearls Phone Charm", price: 100, img: "images/charms/c6.jpg", colors: [] },
  { id: "ch2", category: "charm", name: "Pink Aesthetic Phone Charm", price: 100, img: "images/charms/c7.jpg", colors: [] },
  { id: "ch2", category: "charm", name: "Trending Pink and Pearls Phone Charm", price: 100, img: "images/charms/c8.jpg", colors: [] },
  { id: "ch2", category: "charm", name: "Simple yet elegant Pearls Phone Charm", price: 60, img: "images/charms/c9.jpg", colors: [] },
  { id: "ch2", category: "charm", name: "Floral Pearl Phone Charm", price: 60, img: "images/charms/c10.jpg", colors: [] },
  { id: "ch2", category: "charm", name: "Heavy Aesthetic Pearl Phone Charm", price: 200, img: "images/charms/c11.jpg", colors: [] },
  { id: "ch2", category: "charm", name: "Simple Pearl Phone Charm", price: 60, img: "images/charms/c12.jpg", colors: [] },
  { id: "ch2", category: "charm", name: "Rainbow colorful Phone Charm", price: 100, img: "images/charms/c16.png", colors: [] },
  { id: "ch2", category: "charm", name: "Pearl and Lavender Phone Charm", price: 100, img: "images/charms/c17.png", colors: [] },
  { id: "ch2", category: "charm", name: "Sky Blue Pearl Phone Charm", price: 100, img: "images/charms/c18.jpeg", colors: [] },
  { id: "ch2", category: "charm", name: "Lavender Aesthetic Pearl Phone Charm", price: 150, img: "images/charms/c13.jpg", colors: ["Lavender","Pink","Orange"] },
  { id: "ch2", category: "charm", name: "Crown Charm Lavender Phone Charm", price: 150, img: "images/charms/c14.jpg", colors: ["Lavender","Pink","Orange"] },
  { id: "ch2", category: "charm", name: "Panda Charm Lavender Phone Charm", price: 150, img: "images/charms/c15.jpg", colors: ["Lavender","Pink","Orange"] },

  { id: "bou1", category: "bouquet", name: "Navy Blue Flower Bouquet", price: 299, img: "images/bouquets/r1.jpg", colors: [] },
  { id: "bou2", category: "bouquet", name: "Mini Red Rose Flower Bouquet", price: 300, img: "images/bouquets/r5.jpeg", colors: [] },
  { id: "bou2", category: "bouquet", name: "Queen Gifting Red Rose Flower Bouquet", price: 599, img: "images/bouquets/r3.jpg", colors: [] },
  { id: "bou2", category: "bouquet", name: "Large Red Rose Flower Bouquet", price: 299, img: "images/bouquets/r4.jpg", colors: [] },

  { id: "c1", category: "candle", name: "White Candle", price: 150, img: "images/candles/c1.webp", colors: [] }
  //{ id: "c2", category: "candle", name: "Rose Candle", price: 449, img: "images/candles/c2.jpg", colors: [] }
];
// NOTE: add more objects to this `products` array to match your full inventory

/* ---------- Utilities ---------- */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

/* ---------- Cart (persistent) ---------- */
let cart = JSON.parse(localStorage.getItem("cart")) || [];
function saveCart(){ localStorage.setItem("cart", JSON.stringify(cart)); }

/* ---------- CART UI ELEMENTS (some pages may not have them) ---------- */
const cartBtn = document.getElementById("cart-btn");
const closeCartBtn = document.getElementById("close-cart");
const cartSidebar = document.getElementById("cart-sidebar");
const cartItemsContainer = document.getElementById("cart-items");
const cartCountEls = $$("#cart-count");
const cartTotalSidebar = document.getElementById("cart-total");

/* Open / Close sidebar */
cartBtn?.addEventListener("click", ()=> { cartSidebar?.classList.add("active"); });
closeCartBtn?.addEventListener("click", ()=> { cartSidebar?.classList.remove("active"); });

/* Update cart UI everywhere */
function updateCartUI(){
  // sidebar
  if(cartItemsContainer){
    cartItemsContainer.innerHTML = "";
    let total=0;
    cart.forEach((it,idx)=>{
      total += it.price * it.quantity;
      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <img src="${it.img}" alt="${it.name}">
        <div class="cart-item-info">
          <h4>${it.name}</h4>
          <p>₹${it.price} × ${it.quantity}${it.color? ' | '+it.color : ''}</p>
        </div>
        <span class="remove-item" data-index="${idx}">×</span>
      `;
      cartItemsContainer.appendChild(div);
    });
    cartTotalSidebar && (cartTotalSidebar.textContent = total);
    // remove handlers
    $$("#cart-items .remove-item").forEach(btn=>{
      btn.addEventListener("click", (e)=>{
        const i = Number(e.target.dataset.index);
        cart.splice(i,1);
        saveCart();
        updateCartUI();
        renderCartFullPage();
      });
    });
  }

  // cart count (all elements)
  cartCountEls.forEach(el => el.textContent = cart.length);

  // cart page total
  const cartTotalFull = document.getElementById("cart-total-full");
  if(cartTotalFull){
    let total=0;
    cart.forEach(item => total += item.price * item.quantity);
    cartTotalFull.textContent = `Total: ₹${total}`;
  }
}

/* Add to cart given product id and optional color */
function addToCartById(id, chosenColor=null){
  const p = products.find(x=>x.id===id);
  if(!p) return alert("Product not found");
  const existing = cart.find(it => it.id===id && it.color === (chosenColor||"Default"));
  if(existing){
    existing.quantity += 1;
  } else {
    cart.push({ id: p.id, name: p.name, price: p.price, img: p.img, color: chosenColor||"Default", quantity: 1 });
  }
  saveCart();
  updateCartUI();
  showTinyToast(`${p.name} (${chosenColor||'Default'}) added to cart`);
}

/* Use delegation for shop add buttons (buttons rendered dynamically) */
document.addEventListener("click", (e)=>{
  if(e.target.matches(".add-to-cart-btn")){
    e.preventDefault();
    const id = e.target.dataset.id;
    // look up selected color (select has id color-{id} or dataset on card)
    let color = null;
    const sel = document.querySelector(`#color-${id}`);
    if(sel) color = sel.value;
    addToCartById(id, color);
  }
});

/* tiny toast alert */
function showTinyToast(text){
  alert(text); // simple — replace with fancier UI if you like
}

/* ---------- Render products (shop page) ---------- */
function renderProductsGrid(category="all", targetId="product-grid"){
  const container = document.getElementById(targetId);
  if(!container) return;
  container.innerHTML = "";
  const list = category === "all" ? products : products.filter(p=>p.category === category);
  if(list.length === 0) container.innerHTML = "<p>No items yet in this category.</p>";
  list.forEach(p=>{
    const card = document.createElement("div");
    card.className = "product";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}" loading="lazy">
      <h3>${p.name}</h3>
      <p class="price">₹${p.price}</p>
      ${p.colors && p.colors.length ? `
        <label>Color:</label>
        <select id="color-${p.id}" class="color-select">
          ${p.colors.map(c=>`<option value="${c}">${c}</option>`).join("")}
        </select>
      ` : ""}
      <a href="#" class="btn small add-to-cart-btn" data-id="${p.id}">Add to Cart</a>
    `;
    container.appendChild(card);
  });
}

/* On shop page: filter buttons */
$$(".filter-btn").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    $$(".filter-btn").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    const cat = btn.dataset.category;
    renderProductsGrid(cat, "product-grid");
  });
});

/* On load: render shop products and home previews */
document.addEventListener("DOMContentLoaded", ()=>{
  // render all in shop page (if present)
  renderProductsGrid("all", "product-grid");

  // home preview: first 2 of each category
  const makePreview = (category, targetId) => {
    const c = products.filter(p=>p.category===category).slice(0,2);
    const container = document.getElementById(targetId);
    if(!container) return;
    container.innerHTML = "";
    c.forEach(p=> {
      const card = document.createElement("div");
      card.className = "product";
      card.innerHTML = `
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        <h4>${p.name}</h4>
        <p>₹${p.price}</p>
      `;
      container.appendChild(card);
    });
  };
  makePreview("bracelet","home-bracelets");
  makePreview("charm","home-charms");
  makePreview("bouquet","home-bouquets");
  makePreview("candle","home-candles");

  // initialize cart UI
  updateCartUI();

  // fill cart full page if exists
  renderCartFullPage();

  // checkout page: populate order summary
  populateCheckoutPage();

  // reviews form
  initReviews();

  // gallery lightbox
  initLightbox();

  // shop: sidebar checkout click
  const sidebarCheckout = document.getElementById("sidebar-checkout");
  sidebarCheckout?.addEventListener("click", ()=>{
    window.location.href = "checkout.html";
  });
});

/* ---------- cart full page rendering ---------- */
function renderCartFullPage(){
  const el = document.getElementById("cart-items-full");
  if(!el) return;
  el.innerHTML = "";
  if(cart.length === 0) el.innerHTML = "<p>Your cart is empty 💕</p>";
  let total=0;
  cart.forEach((it, i)=>{
    total += it.price * it.quantity;
    const row = document.createElement("div");
    row.className = "cart-item-full";
    row.innerHTML = `
      <img src="${it.img}" alt="${it.name}" style="width:120px; height:120px; object-fit:cover; border-radius:10px;">
      <div>
        <h4>${it.name}</h4>
        <p>Color: ${it.color}</p>
        <p>Price: ₹${it.price} × ${it.quantity}</p>
        <button class="btn small remove-from-full" data-idx="${i}">Remove</button>
      </div>
    `;
    el.appendChild(row);
  });
  const totalEl = document.getElementById("cart-total-full");
  if(totalEl) totalEl.textContent = `Total: ₹${total}`;

  $$(".remove-from-full").forEach(btn=>{
    btn.addEventListener("click", (e)=>{
      const idx = Number(e.target.dataset.idx);
      cart.splice(idx,1);
      saveCart();
      renderCartFullPage();
      updateCartUI();
    });
  });
}

/* ---------- Checkout page logic (with Formspree AJAX submit) ---------- */
function populateCheckoutPage(){
  if(!window.location.pathname.includes("checkout.html")) return;
  const orderItemsContainer = document.getElementById("order-items");
  const orderTotalDisplay = document.getElementById("order-total");
  let total = 0;
  orderItemsContainer.innerHTML = "";
  if(cart.length === 0){
    orderItemsContainer.innerHTML = "<p>Your cart is empty 💕</p>";
    orderTotalDisplay.textContent = "";
  } else {
    cart.forEach(item => {
      total += item.price * item.quantity;
      const p = document.createElement("p");
      p.textContent = `${item.name} (${item.color}) - ₹${item.price} × ${item.quantity}`;
      orderItemsContainer.appendChild(p);
    });
    orderTotalDisplay.textContent = `Total: ₹${total}`;
  }

  const checkoutForm = document.getElementById("checkout-form");
  if(!checkoutForm) return;

  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const payment = document.getElementById("payment").value;

    // compose order details
    let orderText = "Order Details:\n";
    let sum = 0;
    cart.forEach(it=> {
      orderText += `${it.name} (${it.color}) - ₹${it.price} × ${it.quantity}\n`;
      sum += it.price * it.quantity;
    });
    orderText += `\nTotal: ₹${sum}\n\nCustomer Info:\nName: ${name}\nEmail: ${email}\nAddress: ${address}\nPayment: ${payment}`;

    const hidden = document.getElementById("orderDetails");
    if(hidden) hidden.value = orderText;

    // Submit to Formspree via fetch so we can show confirmation without leaving
    const url = checkoutForm.action;
    fetch(url, {
      method: "POST",
      body: new FormData(checkoutForm),
      headers: { "Accept": "application/json" }
    }).then(resp => {
      if(resp.ok){
        // show thank you section
        document.getElementById("customer-name").textContent = name;
        checkoutForm.classList.add("hidden");
        document.querySelector(".order-summary").classList.add("hidden");
        document.getElementById("thank-you-message").classList.remove("hidden");
        showHearts();
        // clear cart
        cart = [];
        saveCart();
        updateCartUI();
      } else {
        resp.json().then(data => alert("Error submitting order. Please try again."));
      }
    }).catch(err => {
      alert("Error sending order — please check your Formspree endpoint and internet connection.");
      console.error(err);
    });
  });
}

/* ---------- Reviews handling (client-side append + optional Formspree email) ---------- */
function initReviews(){
  const reviewForm = document.getElementById("review-form");
  if(!reviewForm) return;
  reviewForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const name = document.getElementById("reviewer-name").value;
    const text = document.getElementById("review-text").value;
    const ratingEl = document.querySelector('input[name="rating"]:checked');
    const rating = ratingEl ? Number(ratingEl.value) : 5;
    const stars = "★".repeat(rating) + "☆".repeat(5-rating);

    const newReview = document.createElement("div");
    newReview.className = "review-card";
    newReview.innerHTML = `<div class="stars">${stars}</div><p>"${text}"</p><h4>— ${name}</h4>`;
    document.querySelector(".review-grid").appendChild(newReview);

    // If you added Formspree action on the form and a hidden field #reviewDetails,
    // populate it so the review is emailed to you too:
    const hid = document.getElementById("reviewDetails");
    if(hid){
      hid.value = `Name: ${name}\nRating: ${rating}\nReview: ${text}`;
      // optionally submit via fetch here similar to checkout if desired
    }

    reviewForm.reset();
    showHearts();
  });
}

/* ---------- Gallery Lightbox ---------- */
function initLightbox(){
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const captionText = document.getElementById("caption");
  const closeBtn = document.querySelector(".close");
  const galleryImages = document.querySelectorAll(".gallery-img");
  if(!lightbox) return;

  galleryImages.forEach(img => {
    img.addEventListener("click", function(){
      lightbox.style.display = "block";
      lightboxImg.src = this.src;
      captionText.textContent = this.alt || "";
    });
  });
  closeBtn.addEventListener("click", ()=> lightbox.style.display = "none");
  window.addEventListener("click", (e)=> { if(e.target === lightbox) lightbox.style.display = "none"; });
}

/* ---------- Floating Hearts ---------- */
function showHearts(){
  for(let i=0;i<10;i++){
    const heart = document.createElement("div");
    heart.textContent = "💖";
    heart.className = "heart";
    heart.style.left = Math.random() * (window.innerWidth - 40) + "px";
    heart.style.fontSize = (16 + Math.random()*20) + "px";
    document.body.appendChild(heart);
    setTimeout(()=> heart.remove(), 3000);
  }
}

/* ---------- Cart initialization helpers ---------- */
function ensureCartDefaults(){
  if(!Array.isArray(cart)) cart = [];
  cart.forEach(it=>{ if(!it.quantity) it.quantity=1; });
  saveCart();
  updateCartUI();
}
ensureCartDefaults();

document.getElementById('cart-btn').addEventListener('click', function() {
  window.location.href = "cart.html"; // or open cart modal
});

