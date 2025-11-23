import express from "express";
import * as productoController from "../controllers/producto.controller.js";

const router = express.Router();

// GET /api/v1/productos - obtener todos los productos y sus parametros
router.get("/", productoController.getAllProductos);

// GET /api/v1/productos/:id - obtener un producto mediante el id
router.get("/:id", productoController.getProductoById);

// POST /api/v1/productos - crear un producto
router.post("/", productoController.createProducto);

// PUT /api/v1/productos/:id - actualizar un producto mediante el id
router.put("/:id", productoController.updateProducto);

// DELETE /api/v1/productos/:id - eliminar un producto mediante el id
router.delete("/:id", productoController.deleteProducto);

export default router;