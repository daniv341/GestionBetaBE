import express from "express";
import { verificarToken } from "../middleware/verificarToken.js";
import * as ventaControllers from "../controllers/ventaControllers.js";

// get es una peticion para obtener datos de algo en especifico
// post es una peticion para crear datos de algo en especifico
// put es una peticion para actualizar datos de algo en especifico(que ya fue creado)
// delete es una peticion para eliminar datos de algo en especifico

const router = express.Router();

// GET /api/v1/ventas - obtener todas las ventas y sus parametros
router.get("/", ventaControllers.getAllVentas);

// GET /api/v1/ventas/:id - obtener una venta mediante el id
router.get("/:id", ventaControllers.getVentaById);

// POST /api/v1/ventas - crear una venta
router.post("/", ventaControllers.createVenta);

// PUT /api/v1/ventas/:id - actualizar una venta mediante el id
router.put("/:id", ventaControllers.updateVenta);

// DELETE /api/v1/ventas/:id - eliminar una venta mediante el id
router.delete("/:id", ventaControllers.deleteVenta);

export default router;