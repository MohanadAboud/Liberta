"use strict";

const categories = document.querySelectorAll(".category-btn");
const menuItemsContainer = document.getElementById("menu-items");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const closeCartBtn = document.getElementById("close-cart");
const cartItemsContainer = document.getElementById("cart-items");
let cart = {};
let currentCategory = "all";

// Updated Menu Items for your specific categories
const menuItems = [
  { id: 1, name: "Margherita Pizza", category: "Italiensk Pizza", image: "img/margherita.webp", price: 95 },
  { id: 2, name: "Quatro Formaggi", category: "Italiensk Pizza", image: "img/Quatro_Formaggi.webp", price: 105 },
  { id: 5, name: "Cheeseburger", category: "Burgere", image: "img/cheese-burger.webp", price: 105 },
  { id: 6, name: "kyllinge burger", category: "Burgere", image: "img/Kylling.webp", price: 105 },
  { id: 7, name: "Proscuitto E Funghi", category: "Frokost tilbud", image: "img/Proscuitto_E_Funghi.webp", price: 60 },
  { id: 8, name: "Hawaii", category: "Frokost tilbud", image: "img/hawaii.webp", price: 60 },
  { id: 9, name: "Coca-Cola", category: "Drikkevarer", image: "img/bottle.webp", price: 20 },
  { id: 10, name: "Pepsi", category: "Drikkevarer", image: "img/pepsi.webp", price: 20 },
  { id: 10, name: "Quinta de Ramozeiros Red", category: "Drikkevarer", image: "img/Vin.webp", price: 120 },
  { id: 11, name: "Løgringe", category: "Ekstra", image: "img/Løgringe.webp", price: 20 },
  { id: 12, name: "Chili Cheese Tops", category: "Ekstra", image: "img/Chili_Cheese_Tops.webp", price: 20 },
];

// Function to render the menu based on category
function renderMenu(category) {
  menuItemsContainer.innerHTML = "";
  const filteredItems = category === "all" ? menuItems : menuItems.filter((item) => item.category === category);

  filteredItems.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item");
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>$${item.price}</p>
      <button class="add-btn" data-id="${item.id}">Add</button>
    `;
    menuItemsContainer.appendChild(itemDiv);
  });

  // Attach event listeners to "Add" buttons
  const addBtns = document.querySelectorAll(".add-btn");
  addBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const itemId = parseInt(e.target.getAttribute("data-id"));
      addItemToCart(itemId);
    });
  });
}

// Function to add an item to the cart
function addItemToCart(itemId) {
  const item = menuItems.find((i) => i.id === itemId);
  if (cart[itemId]) {
    cart[itemId].quantity++;
  } else {
    cart[itemId] = { ...item, quantity: 1 };
  }
  updateCart();
}

// Function to update the cart display
function updateCart() {
  cartBtn.textContent = `Shopping Cart (${Object.values(cart).reduce((sum, item) => sum + item.quantity, 0)})`;
  renderCartItems();
  displayTotalPrice(); // Call function to display total price
}

// Function to render cart items
function renderCartItems() {
  cartItemsContainer.innerHTML = "";
  if (Object.keys(cart).length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  Object.values(cart).forEach((item) => {
    const cartItemDiv = document.createElement("div");
    cartItemDiv.classList.add("cart-item");

    cartItemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div>
        <h4>${item.name}</h4> <!-- Item name -->
        <p>$${item.price}</p>
      </div>
      <div class="quantity-controls">
        <button class="minus-btn" data-id="${item.id}">-</button>
        <span class="item-quantity" data-id="${item.id}">${item.quantity}</span>
        <button class="plus-btn" data-id="${item.id}">+</button>
      </div>
    `;

    cartItemsContainer.appendChild(cartItemDiv);
  });

  // Attach event listeners to minus and plus buttons
  document.querySelectorAll(".minus-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const itemId = parseInt(e.target.getAttribute("data-id"));
      modifyItemQuantity(itemId, -1);
    });
  });

  document.querySelectorAll(".plus-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const itemId = parseInt(e.target.getAttribute("data-id"));
      modifyItemQuantity(itemId, 1);
    });
  });
}

// Function to display the total price of the cart
function displayTotalPrice() {
  const totalPrice = Object.values(cart).reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const totalElement = document.getElementById("total-price");
  if (totalElement) {
    totalElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
  } else {
    // If the total element is not found, create it and append to the cart modal
    const totalElement = document.createElement("div");
    totalElement.id = "total-price";
    totalElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
    cartItemsContainer.appendChild(totalElement);
  }
}

// Function to modify item quantity
function modifyItemQuantity(itemId, change) {
  if (cart[itemId]) {
    cart[itemId].quantity += change;
    if (cart[itemId].quantity <= 0) {
      delete cart[itemId];
    }
  }
  updateCart();
}

// Event listener for category buttons
categories.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    currentCategory = e.target.getAttribute("data-category");
    renderMenu(currentCategory);
  });
});

// Event listener for cart button
cartBtn.addEventListener("click", () => {
  cartModal.style.display = "block";
});

// Event listener for close cart button
closeCartBtn.addEventListener("click", () => {
  cartModal.style.display = "none";
});

// Initialize
renderMenu("all");

const goToCheckoutBtn = document.createElement("button");
goToCheckoutBtn.id = "go-to-checkout";
goToCheckoutBtn.textContent = "Gå til kassen"; // The text for the button
cartModal.querySelector(".cart-content").appendChild(goToCheckoutBtn);

// Add event listener for the checkout button
goToCheckoutBtn.addEventListener("click", () => {
  // Assuming you have a checkout page URL
  window.location.href = "checkout.html"; // Replace with your checkout page URL
});
