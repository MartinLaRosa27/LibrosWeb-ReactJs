const express = require("express");
const cors = require("cors");
const router = require("./router");
require("dotenv").config({ path: "development.env" });

const db = require("./config/database");
require("./models/Usuario");
db.sync()
  .then(() => {
    console.log("Se conecto correctamente a la base de datos");
  })
  .catch((e) => console.log(e));

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router());

const server_port = process.env.YOUR_PORT || 80;
const server_host = process.env.YOUR_HOST || "0.0.0.0";
app.listen(server_port, server_host, function () {
  console.log(
    `La aplicación esta corriendo en -> http://localhost:${server_port}`
  );
});
