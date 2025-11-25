import express from "express";
import * as oauthControllers from "../controllers/oauthControllers.js";

const router = express.Router();

console.log("soy el routes de redirect");
// GET /api/v1/usuario/google- inicia el login con Google
router.get("/google", oauthControllers.getGoogleRedirect);

// GET /api/v1/usuario/googleCallback- lo que retorna Google luego de completado el login
router.get("/googleCallback", oauthControllers.getGoogleCallback);

export default router;