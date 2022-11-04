import React from "react";
import { useLibro } from "../../hook/useLibro";

export const ListadoLibros = (props) => {
  // ------------------------------------------------------------------------------------ //
  const { deleteLibro } = useLibro();

  // ------------------------------------------------------------------------------------ //
  return (
    <div className="container text-uppercase">
      <h3 className="pt-5 text-center">Listado de libros</h3>

      <ul className="list-group pt-3">
        {props.libros.map((libro) => {
          return (
            <li
              className="list-group-item d-flex justify-content-between"
              key={libro._id}
            >
              {libro.nombre}
              <span
                className="badge btn btn-danger rounded-pill"
                onClick={() => deleteLibro(libro._id, props.usuario._id)}
              >
                ELIMINAR
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
