import { auth } from "./firebaseConfig.js";
import {
  updateProfile,
  updatePassword,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

const profileForm = document.getElementById("profile-form");

profileForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userName = document.getElementById("user-name").value;
  const userPhone = document.getElementById("user-phone").value;
  const userPassword = document.getElementById("user-password").value;

  try {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: userName,
        phoneNumber: userPhone,
      });
      if (userPassword) {
        await updatePassword(auth.currentUser, userPassword);
      }
      alert("Profile updated successfully!");
    } else {
      alert("No user is logged in!");
    }
  } catch (error) {
    alert(error.message);
  }
});
