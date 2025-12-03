import express from "express";
import { verificarToken } from "../middlewares/verificarToken.js";
import { verificarBlacklist } from "../middlewares/verificarBlacklist.js"
import * as compraControllers from "../controllers/compraControllers.js";

const router = express.Router();

// hace que antes de cada ruta se ejecuten los middlewares
router.use(verificarToken, verificarBlacklist);

// GET /api/v1/compras - obtener todos los compras y sus parametros
router.get("/", compraControllers.getAllCompras);

// GET /api/v1/compras/:id - obtener un compra mediante el id
router.get("/:uid", compraControllers.getCompraById);

// POST /api/v1/compras - crear un compra
router.post("/", compraControllers.createCompra);

export default router;