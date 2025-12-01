import { UpdateUsuarioOauthDTO } from "../models/oauthModel.js";
import * as oauthServices from "../services/oauthServices.js";
import logoutServices from "../services/logoutServices.js"

const getGoogleRedirect = async (req, res) => {
    try {

        const url = await oauthServices.getGoogleAuthURL();
        return res.redirect(url);
    } catch (error) {
        console.error("Error sing in usuario with Google:", error);
        return res.status(500).json({ error: error.message });
    }

};

const getGoogleCallback = async (req, res) => {
    try {
        const code = req.query.code;

        if (!code) {
            return res.status(400).json({ error: "Missing authorization code" });
        }

        const { token, user } = await oauthServices.handleGoogleCallback(code);

        return res.status(201).json({ user, token });

    } catch (error) {
        console.error("Error login usuario with Google:", error);
        return res.status(500).json({ error: error.message });
    }
};

const logoutUserOauth = async(req, res)  => {
    const logout = await logoutServices.logoutUser(token);
    return res.json(logout);
};

const getAllUsuariosOauth = async (req, res) => {
    try {
        const usuarios = await oauthServices.getAllUsuariosOauth();
        res.json(usuarios);
    } catch (error) {
        console.error("Error getting usuarios:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getUsuarioOauthByUid = async (req, res) => {
    try {
        const uid = String(req.params.uid);

        if (!typeof uid == "string") {
            return res.status(400).json({ error: "Invalid UID" })
        }

        const usuario = await oauthServices.getUsuarioOauthByUid(uid);
        if (!usuario) {
            return res.status(404).json({ error: "Usuario not found" });
        }

        res.json(usuario);

    } catch (error) {
        console.error("Error getting Usuario:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const updateUsuarioOauth = async (req, res) => {
    try {
        const uid = String(req.params.uid);

        if (!typeof uid == "string") {
            return res.status(400).json({ error: "Invalid UID" })
        }

        const data = req.body;

        //validar DTO
        const { error } = UpdateUsuarioOauthDTO.validate(data)
        if(error) {
            return res.status(400).json({ error:error.details[0].message });
        }

        const usuario = await oauthServices.updateUsuarioOauth(uid, data);
        if (!usuario) {
            return res.status(404).json({ error: "Usuario not found" });
        }

        res.json(usuario);
    } catch (error) {
        console.error("Error updating Usuario:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const deleteUsuarioOauth = async (req, res) => {
    try {
        const uid = String(req.params.uid);

        if (!typeof uid == "string") {
            return res.status(400).json({ error: "Invalid UID" })
        }
        console.log(uid);

        await oauthServices.deleteUsuarioOauth(uid);

        return res.status(204).send();
    } catch (error) {
        console.error("Error deleting Usuario:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export {
    getGoogleRedirect,
    getGoogleCallback,
    logoutUserOauth,
    getAllUsuariosOauth,
    getUsuarioOauthByUid,
    updateUsuarioOauth,
    deleteUsuarioOauth
};