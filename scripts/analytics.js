import { db } from "./firebaseConfig.js";
import {
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

async function fetchAnalyticsData() {
  const usersSnapshot = await getDocs(collection(db, "users"));
  const salesData = {};
  let userCount = 0;

  usersSnapshot.forEach((doc) => {
    userCount++;
    const orders = doc.data().orders || [];
    orders.forEach((order) => {
      const date = new Date(order.date).toLocaleDateString();
      salesData[date] = (salesData[date] || 0) + order.totalAmount;
    });
  });

  return { salesData, userCount };
}

fetchAnalyticsData().then(({ salesData, userCount }) => {
  // Prepare sales chart
  const salesCtx = document.getElementById("sales-chart").getContext("2d");
  new Chart(salesCtx, {
    type: "line",
    data: {
      labels: Object.keys(salesData),
      datasets: [
        {
          label: "Daily Sales (₹)",
          data: Object.values(salesData),
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 2,
          fill: false,
        },
      ],
    },
    options: { responsive: true },
  });

  // Prepare user count chart
  const userCtx = document.getElementById("user-chart").getContext("2d");
  new Chart(userCtx, {
    type: "bar",
    data: {
      labels: ["Users"],
      datasets: [
        {
          label: "Total Users",
          data: [userCount],
          backgroundColor: "rgba(153, 102, 255, 0.6)",
        },
      ],
    },
    options: { responsive: true },
  });
});
