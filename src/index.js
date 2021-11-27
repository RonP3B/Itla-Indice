import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles.css";
import { AppProvider } from "./context";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AppProvider>
        <App />
      </AppProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
