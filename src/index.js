import React from "react";
import { createRoot } from "react-dom/client";
import { initializeApp } from "firebase/app";

import "./index.css";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);
const firebaseConfig = {
  apiKey: "AIzaSyD3c37Cw-EZI3drX-GOmhExylMBhGNC3zc",
  authDomain: "discovery-73ed3.firebaseapp.com",
  projectId: "discovery-73ed3",
  storageBucket: "discovery-73ed3.appspot.com",
  messagingSenderId: "490454599726",
  appId: "1:490454599726:web:b678bde1723e39b84df7bf",
};
initializeApp(firebaseConfig)
root.render(<App />);
