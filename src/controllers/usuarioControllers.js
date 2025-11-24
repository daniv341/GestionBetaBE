import * as usuarioServices from "../services/usuarioSevices.js";
import { CreateUsuarioDTO, LoginUsuarioDTO, UpdateUsuarioDTO } from "../models/usuarioModel.js";
import prisma from "../config/db.js";

const getAllUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioServices.getAllUsuarios();
        res.json(usuarios);
    } catch (error) {
        console.error("Error getting usuarios:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getUsuarioById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid usuario ID" });
        }

        const usuario = await usuarioServices.getUsuarioById(id);
        if (!usuario) {
            return res.status(404).json({ error: "Usuario not found" });
        }

        res.json(usuario);
    } catch (error) {
        console.error("Error getting Usuario:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const registerUsuario = async (req, res) => {
    try {
        const data = req.body;

        //validar DTO
        const { error } = CreateUsuarioDTO.validate(data)
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        //verificar nombre existente
        const nombreExistente = await prisma.Usuario.findUnique({
            where: { nombre: data.nombre },
        });
        if (nombreExistente) {
            return { error: `A usuario with nombre "${data.nombre}" already exists` };
        }

        //verificar email existente
        const emailExistente = await prisma.Usuario.findUnique({
            where: { email: data.email },
        });
        if (emailExistente) {
            return res.status(400).json({ error: `A usuario with email "${data.email}" already exists` });
        }

        const usuario = await usuarioServices.registerUsuario(data);
        return res.status(201).json(usuario);

    } catch (error) {
        console.error("Error register usuario:", error);
        return res.status(500).json({ error: error.message });
    }
}

const loginUsuario = async (req, res) => {
    try {
        const data = req.body;

        //validar DTO
        const { error } = LoginUsuarioDTO.validate(data)
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const usuario = await usuarioServices.loginUsuario(data);

        // enviar token al header
        res.setHeader("Authorization", `Bearer ${data.token}`);

        return res.status(201).json(usuario);

    } catch (error) {
        console.error("Error login usuario:", error);
        return res.status(500).json({ error: error.message });
    }

}

const updateUsuario = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        //verificar id existente
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid usuario ID" });
        }

        const data = req.body;

        //verificar DTO
        const { error } = UpdateUsuarioDTO.validate(data)
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        //verificar nombre existente
        const nombreExistente = await prisma.Usuario.findUnique({
            where: { nombre: data.nombre },
        });
        if (nombreExistente) {
            return res.status(400).json({ error: `A usuario with nombre "${data.nombre}" already exists` });
        }

        //verificar email existente
        const emailExistente = await prisma.Usuario.findUnique({
            where: { email: data.email },
        });
        if (emailExistente) {
            return res.status(400).json({ error: `A usuario with email "${data.email}" already exists` });
        }

        const usuario = await usuarioServices.updateUsuario(id, data);

        if (!usuario) {
            return res.status(404).json({ error: "Usuario not found" });
        }

        return res.json(usuario);

    } catch (error) {
        console.error("Error updating usuario:", error);
        return res.status(500).json({ error: error.message });
    }
}

const deleteUsuario = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid Usuario ID" });
        }

        await usuarioServices.deleteUsuario(id);
        return res.status(204).send();

    } catch (error) {
        console.error("Error deleting Usuario:", error);
        return res.status(500).json({ error: error.message });
    }
};

export {
    getAllUsuarios,
    getUsuarioById,
    registerUsuario,
    loginUsuario,
    updateUsuario,
    deleteUsuario
}