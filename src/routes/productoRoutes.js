const express = require("express");
const productoController = require("../controllers/productoController");

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

module.exports = router;