import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDS01SFn8XEMhOTlZ_arD4YhVsBKsqXUhU",
  authDomain: "resume-screening-portal-117f3.firebaseapp.com",
  projectId: "resume-screening-portal-117f3",
  storageBucket: "resume-screening-portal-117f3.firebasestorage.app",
  messagingSenderId: "170352412587",
  appId: "1:170352412587:web:0290e9c05c2703c98f34ee",
  measurementId: "G-4NGN7ZBRNV"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
