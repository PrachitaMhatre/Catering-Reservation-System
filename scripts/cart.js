import { db } from "./firebaseConfig.js";
import {
  getDoc,
  doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

const cartItemsContainer = document.getElementById("cart-items");
const cartTotalElement = document.getElementById("cart-total");
const checkoutButton = document.getElementById("checkout-button");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartUI() {
  cartItemsContainer.innerHTML = ""; // Clear the container
  let total = 0;

  cart.forEach((item, index) => {
    const itemElement = document.createElement("div");
    itemElement.className = "cart-item";
    itemElement.innerHTML = `
            <p><strong>${item.name}</strong></p>
            <p>Price: $${item.price}</p>
            <p>Quantity: 
                <button onclick="updateQuantity(${index}, -1)">-</button>
                ${item.quantity}
                <button onclick="updateQuantity(${index}, 1)">+</button>
            </p>
            <button onclick="removeItem(${index})">Remove</button>
        `;
    cartItemsContainer.appendChild(itemElement);
    total += item.price * item.quantity;
  });

  cartTotalElement.textContent = `$${total.toFixed(2)}`;
  localStorage.setItem("cart", JSON.stringify(cart));
}

window.updateQuantity = (index, change) => {
  if (cart[index].quantity + change > 0) {
    cart[index].quantity += change;
  } else {
    cart.splice(index, 1); // Remove the item if quantity becomes zero
  }
  updateCartUI();
};

window.removeItem = (index) => {
  cart.splice(index, 1);
  updateCartUI();
};

checkoutButton.addEventListener("click", async () => {
  try {
    // Save the cart to Firestore under the user's orders
    const userId = "YOUR_USER_ID"; // Replace with actual logged-in user's ID
    const userDocRef = doc(db, "users", userId);

    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      await updateDoc(userDocRef, {
        orders: cart,
      });
      alert("Order placed successfully!");
      localStorage.removeItem("cart");
      cart = [];
      updateCartUI();
    } else {
      alert("User not found!");
    }
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
});

updateCartUI();
