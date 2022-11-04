const Sequelize = require("sequelize");
const database = require("../config/database.js");

const Libro = database.define("libro", {
  _id: {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },

  nombre: {
    type: Sequelize.STRING(90),
    allowNull: false,
    validate: {
      len: {
        args: [1, 90],
        msg: "El nombre del libro debe tener entre 1 y 90 caracteres",
      },
      notEmpty: {
        args: true,
        msg: "El nombre del libro no puede estar vacio",
      },
    },
  },

  leido: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = Libro;
