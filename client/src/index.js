import React from "react";
import ReactDOM from "react-dom/client";
import { UsuarioProvider } from "./context/UsuarioProvider";
import { Registro } from "./components/registro/Registro";
import { Footer } from "./components/assets/Footer";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UsuarioProvider>
      {localStorage.getItem("token") ? <App /> : <Registro />}
      <Footer />
    </UsuarioProvider>
  </React.StrictMode>
);
