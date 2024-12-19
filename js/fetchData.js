"use strict";
// fetchData.js

async function fetchItems(category) {
  const response = await fetch("data/items.json");
  const data = await response.json();

  // Filter items på kategori
  const filteredItems = filterItemsByCategory(data, category);
  renderItems(filteredItems);
}

// Function til at filter items på kategori
function filterItemsByCategory(items, category) {
  if (category === "NEW ARRIVALS") {
    return items.filter((item) => item.category === "New Arrival");
  } else if (category === "BEST SELLERS") {
    return items.filter((item) => item.category === "Best Seller");
  } else if (category === "DEALS") {
    return items.filter((item) => item.category === "Deals");
  } else {
    return items; // vis alle items, hvis ingen kategori er valgt
  }
}

// Function til at render items i html
function renderItems(items) {
  const carousel = document.getElementById("carousel");
  carousel.innerHTML = ""; // Fjerner eksisterende items

  // for hver item laver den html
  items.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("box");

    itemElement.innerHTML = `
      <div class="item-image">
        <img src="${item.image}" alt="${item.title}" />
      </div>
      <div class="item-details">
        <h2>${item.title}</h2>
        <p>${item.description}</p>
        <p class="item-price">${item.price}</p>
        <span class="item-category">${item.category}</span>
      </div>
    `;

    carousel.appendChild(itemElement);
  });
}

// Event listeners for the category buttons
document.getElementById("newArrivalsBtn").addEventListener("click", (e) => {
  e.preventDefault();
  fetchItems("NEW ARRIVALS");
});

document.getElementById("bestSellersBtn").addEventListener("click", (e) => {
  e.preventDefault();
  fetchItems("BEST SELLERS");
});

document.getElementById("dealsBtn").addEventListener("click", (e) => {
  e.preventDefault();
  fetchItems("DEALS");
});

// Fetch all items initially (you can change this to a default category)
fetchItems("Default");
