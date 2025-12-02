import express from "express";
import { verificarToken } from "../middleware/verificarToken.js";
import { verificarBlacklist } from "../middleware/verificarBlacklist.js"
import * as productoControllers from "../controllers/productoControllers.js";

const router = express.Router();

// GET /api/v1/productos - obtener todos los productos y sus parametros
router.get("/",verificarToken, verificarBlacklist, productoControllers.getAllProductos);

// GET /api/v1/productos/:id - obtener un producto mediante el id
router.get("/:id", productoControllers.getProductoById);

// POST /api/v1/productos - crear un producto
router.post("/",verificarToken, verificarBlacklist, productoControllers.createProducto);

// PUT /api/v1/productos/:id - actualizar un producto mediante el id
router.put("/:id", productoControllers.updateProducto);

// DELETE /api/v1/productos/:id - eliminar un producto mediante el id
router.delete("/:id", productoControllers.deleteProducto);

export default router;