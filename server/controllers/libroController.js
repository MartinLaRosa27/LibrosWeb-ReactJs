const { QueryTypes } = require("sequelize");
const Libro = require("../models/Libro");

// ------------------------------------------------------------------------------------ //
exports.postLibro = async (req, res) => {
  const { nombre, usuarioId } = req.body;

  // Verifica que no exista el libro previamente:
  const libros = await Libro.sequelize.query(
    `SELECT * FROM libros WHERE nombre = "${nombre}" AND usuarioId = "${usuarioId}"`,
    {
      type: QueryTypes.SELECT,
    }
  );

  // Registra el libro:
  if (libros.length === 0) {
    try {
      await Libro.create({
        nombre,
        usuarioId,
      });
      res.status(200).json({ mensaje: "Libro registrado con exito" });
    } catch (e) {
      res.status(400).json({ mensaje: e.errors[0].message });
    }
  } else {
    res.status(400).json({ mensaje: "Libro registrado previamente" });
  }
};

// ------------------------------------------------------------------------------------ //
exports.getLibros = async (req, res) => {
  const { usuarioId } = req.params;

  const libro = await Libro.sequelize.query(
    `SELECT * FROM libros WHERE usuarioId = "${usuarioId}"`,
    {
      type: QueryTypes.SELECT,
    }
  );

  res.send(libro);
};

// ------------------------------------------------------------------------------------ //
exports.deleteLibro = async (req, res) => {
  await Libro.destroy({
    where: {
      _id: req.params.id,
    },
  });
  const n = await Libro.count({
    where: {
      _id: req.params.id,
    },
  });
  if (n != 0) {
    res.status(500).json({ mensaje: "No se pudo eliminar el libro" });
  } else {
    res.status(200).json({ mensaje: "Libro eliminado" });
  }
};
