import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HashRouter } from "react-router-dom";
import Context from "./utils/Context.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <Context>
    <HashRouter>
      <App />
       <ToastContainer />
    </HashRouter>
  </Context>,
);
