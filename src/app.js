const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes/index.js"); // importa tu router principal

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Rutas
app.use("/api", routes); // importante: 'routes' debe ser un router válido

module.exports = app;

