import express from "express";
import { verificarToken } from "../middleware/verificarToken.js";
import { verificarBlacklist } from "../middleware/verificarBlacklist.js"
import * as oauthControllers from "../controllers/oauthControllers.js";

const router = express.Router();

// GET /api/v1/oauth/google - inicia el login con Google
router.get("/google", oauthControllers.getGoogleRedirect);

// GET /api/v1/oauth/googleCallback - lo que retorna Google luego de completado el login
router.get("/googleCallback", oauthControllers.getGoogleCallback);

// POST /api/v1/oauth/logoutUserOauth - realiza el logout del usuario e invalida el token
router.post("/logoutUserOauth",verificarToken, verificarBlacklist, oauthControllers.logoutUserOauth);

// PUT /api/v1/oauth/:uid - actualizar un usuario mediante el uid
router.put("/:uid",verificarToken, verificarBlacklist, oauthControllers.updateUsuarioOauth);

export default router;