import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAEzCNxIgewzTTgXT8hpXYA4x3_Swh4ScY",
  authDomain: "final-year-project-ed293.firebaseapp.com",
  projectId: "final-year-project-ed293",
  storageBucket: "final-year-project-ed293.appspot.com",
  messagingSenderId: "276657063134",
  appId: "1:276657063134:web:2dbcee058a11023115ee4f",
  measurementId: "G-B7V91X07CX",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };