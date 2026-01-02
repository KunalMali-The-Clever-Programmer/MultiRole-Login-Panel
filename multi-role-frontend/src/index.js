// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./App.css";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
