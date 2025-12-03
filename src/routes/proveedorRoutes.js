import express from "express";
import { verificarToken } from "../middleware/verificarToken.js";
import { verificarBlacklist } from "../middleware/verificarBlacklist.js"
import * as proveedorControllers from "../controllers/proveedorControllers.js";

const router = express.Router();

// hace que antes de cada ruta se ejecuten los middlewares
router.use(verificarToken, verificarBlacklist);

// GET /api/v1/proveedors - obtener todos los proveedors y sus parametros
router.get("/", proveedorControllers.getAllProveedores);

// GET /api/v1/proveedors/:id - obtener un proveedor mediante el id
router.get("/:id", proveedorControllers.getProveedorById);

// POST /api/v1/proveedors - crear un proveedor
router.post("/", proveedorControllers.createProveedor);

// DELETE /api/v1/proveedors/:id - eliminar un proveedor mediante el id
router.delete("/:id", proveedorControllers.deleteProveedor);

export default router;