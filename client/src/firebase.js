// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "auth-2fd63.firebaseapp.com",
  projectId: "auth-2fd63",
  storageBucket: "auth-2fd63.appspot.com",
  messagingSenderId: "528466824579",
  appId: "1:528466824579:web:bbd096a77b3476e7de7ab6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);