import { db } from "./firebaseConfig.js";
import {
  addDoc,
  collection,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

const orderForm = document.getElementById("order-form");
orderForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("customer-name").value;
  const address = document.getElementById("address").value || "Pickup";
  const phone = document.getElementById("phone").value;
  const orderType = document.querySelector(
    'input[name="order-type"]:checked'
  ).value;

  try {
    await addDoc(collection(db, "orders"), {
      name,
      address,
      phone,
      orderType,
      orderTime: new Date().toISOString(),
    });
    alert("Order placed successfully!");
    orderForm.reset();
    window.location.href = "index.html";
  } catch (error) {
    alert(error.message);
  }
});
