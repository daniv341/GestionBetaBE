import express from "express";
import * as oauthControllers from "../controllers/oauthControllers.js";

const router = express.Router();

// GET /api/v1/oauth/google - inicia el login con Google
router.get("/google", oauthControllers.getGoogleRedirect);

// GET /api/v1/oauth/googleCallback - lo que retorna Google luego de completado el login
router.get("/googleCallback", oauthControllers.getGoogleCallback);

// GET /api/v1/oauth/getAllUsuariosOauth - obtener todos los usuarios y sus parametros
router.get("/", oauthControllers.getAllUsuariosOauth);

// GET /api/v1/oauth/:uid - obtener un usuario mediante el uid
router.get("/:uid", oauthControllers.getUsuarioOauthByUid);

// PUT /api/v1/oauth/:uid - actualizar un usuario mediante el uid
router.put("/:uid", oauthControllers.updateUsuarioOauth);

// DELETE /api/v1/oauth/:uid - eliminar un usuario mediante el uid
router.delete("/:uid", oauthControllers.deleteUsuarioOauth);

export default router;