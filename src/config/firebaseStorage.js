import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCJ1JT7XDkVcrUWPk3qsTUrhCkuBeOYeRc",
  authDomain: "lookbook-abb17.firebaseapp.com",
  projectId: "lookbook-abb17",
  storageBucket: "lookbook-abb17.appspot.com",
  messagingSenderId: "15490003809",
  appId: "1:15490003809:web:cd97c17f5a5e0bb0f88b20",
  measurementId: "G-8BNJC216N2",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
