import express from "express";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes/index.js"; // importa tu router principal

import productoRoutes from "./routes/producto.routes.js";
import ventaRoutes from "./routes/venta.routes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Rutas
//app.use("/api", routes); // importante: 'routes' debe ser un router válido

//rutas para productos
app.use("/api/v1/productos", productoRoutes);

//rutas para ventas
app.use("/api/v1/ventas", ventaRoutes);

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});

export default app;


