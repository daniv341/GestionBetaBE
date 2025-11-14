import express from "express";
import * as ventaController from "../controllers/ventaController.js";

const router = express.Router();

// GET /api/v1/ventas
router.get("/", ventaController.getAllVentas);

// GET /api/v1/ventas/:id
router.get("/:id", ventaController.getVentaById);

// POST /api/v1/ventas
router.post("/", ventaController.createVenta);

// PUT /api/v1/ventas/:id
router.put("/:id", ventaController.updateVenta);

// DELETE /api/v1/ventas/:id
router.delete("/:id", ventaController.deleteVenta);

export default router;