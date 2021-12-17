import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { PROD } from "./constants";
import "./index.scss";

window.enterApp = function () {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
  return false;
};
document.addEventListener(
  "DOMContentLoaded",
  function () {
    document.body.style.opacity = "1";
  },
  false
);

if (!PROD) {
  window.enterApp();
}
