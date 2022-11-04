const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const database = require("../config/database.js");
const Libro = require("./Libro");

const Usuario = database.define("usuario", {
  _id: {
    type: Sequelize.STRING(16),
    primaryKey: true,
    allowNull: false,
  },

  email: {
    type: Sequelize.STRING(90),
    allowNull: false,
    validate: {
      len: {
        args: [5, 90],
        msg: "El email ingresado debe tener entre 5 y 90 caracteres",
      },
      notContains: {
        args: " ",
        msg: "No puede haber espacios en blanco en el email ingresado",
      },
      notEmpty: {
        args: true,
        msg: "El email ingresado no pude ir vacio",
      },
    },
    unique: {
      args: true,
      msg: "El email ingrasado se encuentra registrado",
    },
  },

  password: {
    type: Sequelize.STRING(60),
    allowNull: false,
    validate: {
      len: {
        args: [8, 25],
        msg: "La contraseña ingresada debe tener entre 8 y 25 caracteres",
      },
      notContains: {
        args: " ",
        msg: "La constraseña ingresada no puede tener espacios en blanco",
      },
      is: {
        args: /\d/,
        msg: "La constraseña ingresada debe contener numeros",
      },
      notEmpty: {
        args: true,
        msg: "La contraseña ingresada no puede ir vacia",
      },
    },
  },
});

Usuario.afterValidate(async (user) => {
  const password = await bcrypt.hash(user.password, 10);
  user.password = password;
});

Usuario.hasMany(Libro);

module.exports = Usuario;
