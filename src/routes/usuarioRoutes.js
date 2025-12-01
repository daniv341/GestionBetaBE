import express from "express";
import * as usuarioControllers from "../controllers/usuarioControllers.js";
import { verificarBlacklist } from "../middleware/verificarBlacklist.js"
import { verificarToken } from "../middleware/verificarToken.js"

const router = express.Router();

// GET /api/v1/usuarios/systemUsuarios - obtener todos los usuarios del sistema y sus parametros
router.get("/systemUsuarios", verificarToken, verificarBlacklist, usuarioControllers.getAllSystemUsuarios);

// GET /api/v1/usuarios/ - obtener todos los usuarios y sus parametros
router.get("/", usuarioControllers.getAllUsuarios);

// GET /api/v1/usuarios/:uid - obtener un usuario mediante el uid
router.get("/:uid", usuarioControllers.getUsuarioById);

// POST /api/v1/usuarios/register - crear un usuario
router.post("/register", usuarioControllers.registerUsuario);

// POST /api/v1/usuarios/login - crear un usuario
router.post("/login", usuarioControllers.loginUsuario);

// POST /api/v1/usuarios/logoutUser - realiza el logout del usuario e invalida el token
router.post("/logoutUser", usuarioControllers.logoutUser);

// PUT /api/v1/usuarios/:uid - actualizar un usuario mediante el uid
router.put("/:uid", usuarioControllers.updateUsuario);

// DELETE /api/v1/usuarios/:uid - eliminar un usuario mediante el uid
router.delete("/:uid", usuarioControllers.deleteUsuario);

export default router;