const jwt = require("jsonwebtoken");
const shortId = require("shortid");
const bcrypt = require("bcrypt");
const Usuario = require("../models/Usuario");

// ------------------------------------------------------------------------------------ //
exports.postUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    await Usuario.create({
      _id: shortId.generate(),
      email,
      password,
    });
    res.status(200).json({ mensaje: "Usuario registrado con exito" });
  } catch (e) {
    res.status(400).json({ mensaje: e.errors[0].message });
  }
};

// ------------------------------------------------------------------------------------ //
exports.verificarUsuario = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(password);
  const usuario = await Usuario.findOne({
    where: {
      email,
    },
  });
  if (!usuario) {
    await res.status(404).json({ mensaje: "Email incorrecto" });
    next();
  } else {
    if (!bcrypt.compareSync(password, usuario.password)) {
      await res.status(404).json({ mensaje: "Contraseña incorrecta" });
      next();
    } else {
      const token = jwt.sign(
        {
          _id: usuario._id,
          email: usuario.email,
        },
        "jwtSecret",
        {
          expiresIn: "300", //5m
        }
      );
      res.status(200).json({ token });
    }
  }
};
