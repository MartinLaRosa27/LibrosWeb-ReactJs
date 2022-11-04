import React, { useEffect } from "react";
import { ListadoLibros } from "./ListadoLibros";
import { RegistrarLibro } from "./RegistrarLibro";
import { useLibro } from "../../hook/useLibro";
import { useUsuario } from "../../hook/useUsuario";

export const Principal = () => {
  // ------------------------------------------------------------------------------------ //
  const { libros, getLibros } = useLibro();
  const { usuario } = useUsuario();

  // ------------------------------------------------------------------------------------ //
  useEffect(() => {
    getLibros(usuario._id);
  }, []);

  // ------------------------------------------------------------------------------------ //
  return (
    <main
      className="bg-dark text-light bg-gradient text-uppercase"
      style={{ minHeight: "100vh" }}
    >
      <RegistrarLibro usuario={usuario} />

      {libros === null && (
        <div className="mt-5 text-center">
          <div className="spinner-border text-warning " role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      )}

      {libros !== null && libros.length === 0 && (
        <div className="container mt-5">
          <div className="alert alert-warning text-center" role="alert">
            No hay libros registrados
          </div>
        </div>
      )}

      {libros !== null && libros.length > 0 && (
        <ListadoLibros libros={libros} usuario={usuario} />
      )}
    </main>
  );
};
