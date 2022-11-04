import { useContext } from "react";
import libroContext from "../context/LibroProvider";

export const useLibro = () => {
  return useContext(libroContext);
};
