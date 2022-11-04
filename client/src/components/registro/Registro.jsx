import React from "react";
import { AiFillBook } from "react-icons/ai";
import { Login } from "./Login";
import { Sign } from "./Sign";

export const Registro = () => {
  return (
    <div
      id="registro"
      className="bg-dark text-light bg-gradient text-uppercase"
      style={{ minHeight: "100vh" }}
    >
      <h1 className="pt-3 text-center fst-italic">
        LibrosWeb <AiFillBook />
      </h1>
      <div className="container">
        <div className="pt-5">
          <h3 className="text-center">Registrarse</h3>
          <Sign />
        </div>
        <div className="pt-5">
          <h3 className="text-center">Iniciar Sesión</h3>
          <Login />
        </div>
      </div>
    </div>
  );
};
