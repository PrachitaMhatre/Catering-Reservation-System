// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXIxoS8keREOChPrcgHo35HWnAO3AMOtc",
  authDomain: "catering-system-dba18.firebaseapp.com",
  databaseURL: "https://catering-system-dba18-default-rtdb.firebaseio.com",
  projectId: "catering-system-dba18",
  storageBucket: "catering-system-dba18.firebasestorage.app",
  messagingSenderId: "987243198898",
  appId: "1:987243198898:web:befefda2470cff6f4f0cab",
  measurementId: "G-CQSDYP4Z89",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
