import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyA8DLH-AftLzQLUkP0p6eA89uG9P7KyIW8",
  authDomain: "guestify-save.firebaseapp.com",
  projectId: "guestify-save",
  storageBucket: "guestify-save.appspot.com",
  messagingSenderId: "960506386488",
  appId: "1:960506386488:web:bc4a65e3ae929b78252ecd",
  measurementId: "G-CM6RE1NKYE"

};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
