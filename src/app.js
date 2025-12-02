import express from "express";
import morgan from "morgan";
import cors from "cors";
//import routes from "./routes/index.js"; // importa tu router principal
import bodyParser from "body-parser";

import productoRoutes from "./routes/productoRoutes.js";
import ventaRoutes from "./routes/ventaRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js"
import oauthRoutes from "./routes/oauthRoutes.js"

const app = express();

// middlewares
app.use(bodyParser.json())
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// rutas
//app.use("/api", routes); // importante: 'routes' debe ser un router válido

//rutas para productos
app.use("/api/v1/productos", productoRoutes);

//rutas para ventas
app.use("/api/v1/ventas", ventaRoutes);

//rutas para usuarios
app.use("/api/v1/usuarios", usuarioRoutes);

//rutas para usuarios oauth
app.use("/api/v1/oauth", oauthRoutes);

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});

export default app;

