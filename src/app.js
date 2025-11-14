const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes/index.js"); // importa tu router principal

const productoRoutes = require("./routes/productoRoutes.js");
const ventaRoutes = require("./routes/ventaRoutes.js");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Rutas
//app.use("/api", routes); // importante: 'routes' debe ser un router válido

app.use("/api/v1/productos", productoRoutes);
app.use("/api/v1/ventas", ventaRoutes);

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});

module.exports = app;

