import React from "react";
import { useUsuario } from "../../hook/useUsuario";

export const Header = () => {
  // ------------------------------------------------------------------------------------ //
  const { cerrarSesion, usuario } = useUsuario();

  // ------------------------------------------------------------------------------------ //
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <p className="navbar-brand text-uppercase">LibrosWeb</p>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <p
              className="nav-link text-uppercase"
              onClick={() => cerrarSesion()}
            >
              Cerrar Sesion | {usuario.email}
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};
