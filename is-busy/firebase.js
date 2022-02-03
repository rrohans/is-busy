
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "is-busy.firebaseapp.com",
  projectId: "is-busy",
  storageBucket: "is-busy.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);