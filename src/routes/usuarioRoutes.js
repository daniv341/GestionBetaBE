import express from "express";
import * as usuarioControllers from "../controllers/usuarioControllers.js";

const router = express.Router();

// GET /api/v1/usuarios - obtener todos los usuarios y sus parametros
router.get("/", usuarioControllers.getAllUsuarios);

// GET /api/v1/usuarios/:id - obtener un usuario mediante el id
router.get("/:id", usuarioControllers.getUsuarioById);

// POST /api/v1/usuarios - crear un usuario
router.post("/register", usuarioControllers.registerUsuario);

// POST /api/v1/usuarios - crear un usuario
router.post("/login", usuarioControllers.loginUsuario);

// PUT /api/v1/usuarios/:id - actualizar un usuario mediante el id
router.put("/:id", usuarioControllers.updateUsuario);

// DELETE /api/v1/usuarios/:id - eliminar un usuario mediante el id
router.delete("/:id", usuarioControllers.deleteUsuario);

export default router;