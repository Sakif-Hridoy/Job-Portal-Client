// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGCLFzx9e0Twq2HeB4_MoZjkaF1rBirZE",
  authDomain: "job-portal-74fb8.firebaseapp.com",
  projectId: "job-portal-74fb8",
  storageBucket: "job-portal-74fb8.firebasestorage.app",
  messagingSenderId: "298876090879",
  appId: "1:298876090879:web:997b3c8cebd23c72ffcfca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;