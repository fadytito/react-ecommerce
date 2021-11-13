import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_PRODUCTS_API_KEY,
  authDomain: "react-ecommerce-2b692.firebaseapp.com",
  projectId: "react-ecommerce-2b692",
  storageBucket: "react-ecommerce-2b692.appspot.com",
  messagingSenderId: "20038534304",
  appId: "1:20038534304:web:87348d5c443e41bded75c5",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
