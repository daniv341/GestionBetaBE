import express from "express";
import * as productoController from "../controllers/productoController.js";

const router = express.Router();

// GET /api/v1/productos
router.get("/", productoController.getAllProductos);

// GET /api/v1/productos/:id
router.get("/:id", productoController.getProductoById);

// POST /api/v1/productos
router.post("/", productoController.createProducto);

// PUT /api/v1/productos/:id
router.put("/:id", productoController.updateProducto);

// DELETE /api/v1/productos/:id
router.delete("/:id", productoController.deleteProducto);

export default router;