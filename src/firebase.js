import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCg0tokcO5k1XldoYoOtppwsRb2G6NU7kQ",
  authDomain: "sai-os.firebaseapp.com",
  projectId: "sai-os",
  storageBucket: "sai-os.firebasestorage.app",
  messagingSenderId: "452029556253",
  appId: "1:452029556253:web:e86e814a3253967912c8f4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);