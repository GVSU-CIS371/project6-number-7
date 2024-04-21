import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB_DBuD2BU0WdEPPUsyxCY8qoSU_U1reyE",
  authDomain: "online-store-f186f.firebaseapp.com",
  projectId: "online-store-f186f",
  storageBucket: "online-store-f186f.appspot.com",
  messagingSenderId: "906274892254",
  appId: "1:906274892254:web:37535730b6915d21b1554f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);