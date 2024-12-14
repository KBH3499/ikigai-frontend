import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./styles/music-style.css";
import "./stakingPages/stake.css";
import * as buffer from "buffer";
import Context from "./context/wallet-context/index.jsx";

window.Buffer = buffer.Buffer;
ReactDOM.createRoot(document.getElementById("root")).render(
  <Context>
    <App />
    </Context>
);
