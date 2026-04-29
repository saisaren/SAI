import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCg0tokcO5k1XldoYoOtppwsRb2G6NU7kQ",
  authDomain: "sai-os.firebaseapp.com",
  projectId: "sai-os",
  storageBucket: "sai-os.firebasestorage.app",
  messagingSenderId: "452029556253",
  appId: "1:452029556253:web:e86e814a3253967912c8f4",
  measurementId: "G-3W9X33HVF8"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;