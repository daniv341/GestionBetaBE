import express from "express";
import { verificarToken } from "../middleware/verificarToken.js";
import { verificarBlacklist } from "../middleware/verificarBlacklist.js"
import * as usuarioControllers from "../controllers/usuarioControllers.js";

const router = express.Router();

// GET /api/v1/usuarios/ - obtener todos los usuarios y sus parametros
router.get("/",verificarToken, verificarBlacklist, usuarioControllers.getAllUsuarios);

// GET /api/v1/usuarios/:uid - obtener un usuario mediante el uid
router.get("/:uid",verificarToken, verificarBlacklist, usuarioControllers.getUsuarioById);

// POST /api/v1/usuarios/register - crear un usuario
router.post("/register", usuarioControllers.registerUsuario);

// POST /api/v1/usuarios/login - crear un usuario
router.post("/login", usuarioControllers.loginUsuario);

// POST /api/v1/usuarios/logoutUser - realiza el logout del usuario e invalida el token
router.post("/logoutUser",verificarToken, verificarBlacklist, usuarioControllers.logoutUser);

// PUT /api/v1/usuarios/:uid - actualizar un usuario mediante el uid
router.put("/:uid",verificarToken, verificarBlacklist, usuarioControllers.updateUsuario);

// DELETE /api/v1/usuarios/:uid - eliminar un usuario mediante el uid
router.delete("/:uid",verificarToken, verificarBlacklist, usuarioControllers.deleteUsuario);

export default router;