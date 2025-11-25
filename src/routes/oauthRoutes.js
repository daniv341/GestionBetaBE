import express from "express";
import { verificarToken } from "../middleware/verificarToken.js";
import * as oauthControllers from "../controllers/oauthControllers.js";

const router = express.Router();

// GET /api/v1/usuario/google- inicia el login con Google
router.get("/google", oauthControllers.getGoogleRedirect);

// GET /api/v1/usuario/googleCallback- lo que retorna Google luego de completado el login
router.get("/googleCallback", oauthControllers.getGoogleCallback);

export default router;