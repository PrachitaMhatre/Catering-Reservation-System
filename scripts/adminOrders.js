import { db } from "./firebaseConfig.js";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

const ordersContainer = document.getElementById("orders-container");

async function fetchOrders() {
  const querySnapshot = await getDocs(collection(db, "orders"));
  ordersContainer.innerHTML = ""; // Clear the container
  querySnapshot.forEach((docSnapshot) => {
    const order = docSnapshot.data();
    const orderElement = document.createElement("div");
    orderElement.className = "order";
    orderElement.innerHTML = `
            <p><strong>Name:</strong> ${order.name}</p>
            <p><strong>Address:</strong> ${order.address}</p>
            <p><strong>Phone:</strong> ${order.phone}</p>
            <p><strong>Order Type:</strong> ${order.orderType}</p>
            <p><strong>Order Time:</strong> ${new Date(
              order.orderTime
            ).toLocaleString()}</p>
            <button onclick="deleteOrder('${
              docSnapshot.id
            }')">Delete Order</button>
        `;
    ordersContainer.appendChild(orderElement);
  });
}

async function deleteOrder(orderId) {
  if (confirm("Are you sure you want to delete this order?")) {
    try {
      await deleteDoc(doc(db, "orders", orderId));
      alert("Order deleted successfully!");
      fetchOrders();
    } catch (error) {
      alert(error.message);
    }
  }
}

fetchOrders();
