import React, { createContext, useState } from "react";
import axios from "axios";
const libroContext = createContext();

export const LibroProvider = (props) => {
  // ------------------------------------------------------------------- //
  const [libros, setLibros] = useState(null);

  // ------------------------------------------------------------------- //
  const getLibros = async (usuarioId) => {
    await axios
      .get(
        `http://${process.env.REACT_APP_BACKEND_URL}/get-libros/${usuarioId}`
      )
      .then((res) => {
        setLibros(res.data);
      })
      .catch((e) => {
        setLibros(null);
        console.log(e);
      });
  };

  // ------------------------------------------------------------------- //
  const postLibro = async (libro, usuarioId) => {
    await axios
      .post(`http://${process.env.REACT_APP_BACKEND_URL}/post-libro/`, {
        usuarioId,
        nombre: libro.nombre,
      })
      .then((res) => {
        getLibros(usuarioId);
        alert(res.data.mensaje);
      })
      .catch((e) => {
        alert(e.response.data.mensaje);
      });
  };

  // ------------------------------------------------------------------- //
  const deleteLibro = async (id, usuarioId) => {
    await axios
      .delete(`http://${process.env.REACT_APP_BACKEND_URL}/delete-libro/${id}`)
      .then((res) => {
        getLibros(usuarioId);
        alert(res.data.mensaje);
      })
      .catch((e) => {
        alert(e.response.data.mensaje);
      });
  };

  // ------------------------------------------------------------------- //
  return (
    <libroContext.Provider
      value={{
        getLibros,
        postLibro,
        deleteLibro,
        libros,
      }}
    >
      {props.children}
    </libroContext.Provider>
  );
};

export default libroContext;
