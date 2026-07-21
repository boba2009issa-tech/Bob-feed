import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBR4aqBKliT-oyTSnewQ_bY00pqraKSb0M",
  authDomain: "fir-course-4fe2d.firebaseapp.com",
  projectId: "fir-course-4fe2d",
  storageBucket: "fir-course-4fe2d.firebasestorage.app",
  messagingSenderId: "923696034576",
  appId: "1:923696034576:web:c2cfd14007dc7c5ef26b95",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);