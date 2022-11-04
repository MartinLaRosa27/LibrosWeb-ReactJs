const express = require("express");
const router = express.Router();
const usuarioController = require("./controllers/usuarioController");
const libroController = require("./controllers/libroController");

module.exports = () => {
  // Usuario:
  router.post("/post-usuario", usuarioController.postUsuario);
  router.post("/verificar-usuario", usuarioController.verificarUsuario);

  // Libro:
  router.get("/get-libros/:usuarioId", libroController.getLibros);
  router.post("/post-libro", libroController.postLibro);
  router.delete("/delete-libro/:id", libroController.deleteLibro);

  return router;
};
