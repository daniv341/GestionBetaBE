import express from "express";
import * as ventaController from "../controllers/venta.controller.js";

const router = express.Router();

// GET /api/v1/ventas- obtener todas las ventas y sus parametros
router.get("/", ventaController.getAllVentas);

// GET /api/v1/ventas/:id- obtener una venta mediante el id
router.get("/:id", ventaController.getVentaById);

// POST /api/v1/ventas- crear una venta
router.post("/", ventaController.createVenta);

// PUT /api/v1/ventas/:id- actualizar una venta mediante el id
router.put("/:id", ventaController.updateVenta);

// DELETE /api/v1/ventas/:id- eliminar una venta mediante el id
router.delete("/:id", ventaController.deleteVenta);

export default router;