import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDWr1Kl1KqEPSPfQ0NIW9gyN8W1H6tSvEg",
  authDomain: "blog-project-613e9.firebaseapp.com",
  projectId: "blog-project-613e9",
  storageBucket: "blog-project-613e9.firebasestorage.app",
  messagingSenderId: "67890027559",
  appId: "1:67890027559:web:a6b30e6216b2c3bc2a4202"
};

const app = initializeApp(firebaseConfig);

console.log("Firebase connected successfully:", app.name);

export default app;