import express from "express";
import * as usuarioController from "../controllers/productoController.js"

const router = express.Router();

// POST /api/v1/usuarios
router.post("/signIn", usuarioController.addUser);

// POST /api/v1/usuarios
router.post("/signUp", usuarioController.authenticate);

export default router;