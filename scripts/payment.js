import { db } from "./firebaseConfig.js";
import {
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

const payNowButton = document.getElementById("pay-now-button");

// Replace with your Razorpay API Key
const razorpayApiKey = "YOUR_RAZORPAY_KEY";

payNowButton.addEventListener("click", async () => {
  // Fetch cart and user details
  const userId = "YOUR_USER_ID"; // Replace with logged-in user ID
  const userDocRef = doc(db, "users", userId);
  const userDoc = await getDoc(userDocRef);

  if (!userDoc.exists()) {
    alert("User not found!");
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (totalAmount === 0) {
    alert("Cart is empty!");
    return;
  }

  // Initialize Razorpay payment
  const options = {
    key: razorpayApiKey,
    amount: totalAmount * 100, // Amount in paise
    currency: "INR",
    name: "Catering Service",
    description: "Order Payment",
    handler: async function (response) {
      alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);

      // Save order details in Firestore
      await updateDoc(userDocRef, {
        orders: [
          ...(userDoc.data().orders || []),
          { cart, paymentId: response.razorpay_payment_id, totalAmount },
        ],
      });

      // Clear cart and redirect
      localStorage.removeItem("cart");
      window.location.href = "confirmation.html";
    },
    prefill: {
      name: userDoc.data().name,
      email: userDoc.data().email,
    },
    theme: {
      color: "#3399cc",
    },
  };

  const rzp = new Razorpay(options);
  rzp.open();
});
