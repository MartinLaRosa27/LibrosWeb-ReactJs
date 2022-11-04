import { useContext } from "react";
import usuarioContext from "../context/UsuarioProvider";

export const useUsuario = () => {
  return useContext(usuarioContext);
};
