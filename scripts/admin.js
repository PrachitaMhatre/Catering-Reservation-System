import { db } from "./firebaseConfig.js";
import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

const productForm = document.getElementById("product-form");
productForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("product-name").value;
  const price = document.getElementById("product-price").value;

  try {
    await addDoc(collection(db, "products"), { name, price });
    alert("Product added!");
    productForm.reset();
  } catch (error) {
    alert(error.message);
  }
});
