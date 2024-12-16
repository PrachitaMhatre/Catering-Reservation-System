// Example menu data (can also be fetched from Firestore)
const menuData = [
  {
    id: "1",
    name: "Chicken Biryani",
    description: "Delicious spiced rice with tender chicken.",
    price: 200,
    image: "path/to/chicken-biryani.jpg",
  },
  {
    id: "2",
    name: "Paneer Butter Masala",
    description: "Creamy curry with paneer cubes.",
    price: 180,
    image: "path/to/paneer-butter-masala.jpg",
  },
  {
    id: "3",
    name: "Garlic Naan",
    description: "Fluffy bread with garlic topping.",
    price: 40,
    image: "path/to/garlic-naan.jpg",
  },
];

// Cart data
let cart = [];

// Display menu items
const menuContainer = document.getElementById("menu-container");
menuData.forEach((item) => {
  const menuItem = document.createElement("div");
  menuItem.classList.add("menu-item");
  menuItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p><strong>₹${item.price}</strong></p>
        <button onclick="addToCart('${item.id}')">Add to Cart</button>
    `;
  menuContainer.appendChild(menuItem);
});

// Add to cart function
function addToCart(itemId) {
  const item = menuData.find((i) => i.id === itemId);
  const existingItem = cart.find((i) => i.id === itemId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  renderCart();
}

// Render cart
const cartContainer = document.getElementById("cart-container");
function renderCart() {
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty!</p>";
    return;
  }

  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
            <p><strong>${item.name}</strong> - ₹${item.price} x ${item.quantity}</p>
            <button onclick="removeFromCart('${item.id}')">Remove</button>
        `;
    cartContainer.appendChild(cartItem);
  });
}

// Remove from cart
function removeFromCart(itemId) {
  cart = cart.filter((item) => item.id !== itemId);
  renderCart();
}

// Checkout
document.getElementById("checkout-button").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Checkout complete! Redirecting to payment...");
  // Redirect to payment page
  window.location.href = "payment.html";
});
