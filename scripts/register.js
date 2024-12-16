import { auth, db } from "./firebaseConfig.js";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import {
  collection,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document
    .getElementById("confirm-password")
    .value.trim();
  const phone = document.getElementById("phone").value.trim();

  // Validate passwords
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    // Register user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Update user profile with the name
    await updateProfile(user, {
      displayName: name,
    });

    // Add additional user details to Firestore
    await setDoc(doc(collection(db, "users"), user.uid), {
      name,
      email,
      phone,
      uid: user.uid,
    });

    alert("Registration successful! You can now log in.");
    window.location.href = "login.html"; // Redirect to login page
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
});
