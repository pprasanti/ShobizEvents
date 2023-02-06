// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCh44zMoCZf0mQa9HvwFrM-ZdiKTZVy4sQ",
  authDomain: "shobizevents-36967.firebaseapp.com",
  projectId: "shobizevents-36967",
  storageBucket: "shobizevents-36967.appspot.com",
  messagingSenderId: "913783316558",
  appId: "1:913783316558:web:a15308d5a66e040233e31f",
  measurementId: "G-BV8K1WR16T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);