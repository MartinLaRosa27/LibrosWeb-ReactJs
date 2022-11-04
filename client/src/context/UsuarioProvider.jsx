import React, { createContext } from "react";
import { isJwtExpired } from "jwt-check-expiration";
import jwt_decode from "jwt-decode";
import axios from "axios";
const usuarioContext = createContext();

export const UsuarioProvider = (props) => {
  // ------------------------------------------------------------------- //
  let usuario = null;
  localStorage.getItem("token")
    ? (usuario = jwt_decode(localStorage.getItem("token")))
    : (usuario = null);

  // ------------------------------------------------------------------- //
  const postUsuario = async (usuario) => {
    await axios
      .post(`http://${process.env.REACT_APP_BACKEND_URL}/post-usuario`, {
        email: usuario.email,
        password: usuario.password,
      })
      .then((res) => {
        alert(res.data.mensaje);
      })
      .catch((e) => {
        alert(e.response.data.mensaje);
      });
  };

  // ------------------------------------------------------------------- //
  const verificarUsuario = async (usuario) => {
    await axios
      .post(`http://${process.env.REACT_APP_BACKEND_URL}/verificar-usuario`, {
        email: usuario.email.toLowerCase(),
        password: usuario.password,
      })
      .then((res) => {
        alert("Login correcto");
        const { token } = res.data;
        localStorage.setItem("token", token);
        window.location.reload();
      })
      .catch((e) => {
        alert(e.response.data.mensaje);
      });
  };

  // ------------------------------------------------------------------- //
  const cerrarSesion = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  // ------------------------------------------------------------------- //
  const verificarJWT = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (isJwtExpired(token)) {
      alert("Sesion Expirada");
      cerrarSesion();
      return true;
    }
    return false;
  };

  // ------------------------------------------------------------------- //
  return (
    <usuarioContext.Provider
      value={{
        postUsuario,
        verificarUsuario,
        cerrarSesion,
        verificarJWT,
        usuario,
      }}
    >
      {props.children}
    </usuarioContext.Provider>
  );
};

export default usuarioContext;
