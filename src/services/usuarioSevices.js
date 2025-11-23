import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/db.js";
import "dotenv/config";

const getAllUsuarios = async () => {
    return prisma.Usuario.findMany();
};

const getUsuarioById = async (id) => {
    return prisma.Usuario.findUnique({
        where: { id }
    });
};

const registerUsuario = async (data) => {
    const { contraseña } = data;

    const contraseñaHasheada = await bcrypt.hash(contraseña, 10);

    return prisma.Usuario.create({
        data: {
            ...data,
            contraseña: contraseñaHasheada,
        }
    });
};

const loginUsuario = async (data) => {
    const usuario = await prisma.Usuario.findUnique({
        where: { nombre: data.nombre },
    });
    if (!usuario) {
        return { error: `Invalid Credentials` };
    }

    //el primer parametro es la contraseña ue viene del body y la segunda la contraseña de la bd
    const contraseñaCorrecta = await bcrypt.compare(data.contraseña, usuario.contraseña);
    if (!contraseñaCorrecta) {
        return { error: `Invalid Credentials` };
    }

    const token = jwt.sign(
        { nombre: data.nombre },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      );

    return {token, data}
};

const updateUsuario = async (id, data) => {
    const { contraseña } = data;

    const nombreExistente = await prisma.Usuario.findUnique({
        where: { nombre: data.nombre },
    });
    if (nombreExistente) {
        return res.status(400).json({ error: `A usuario with nombre "${data.nombre}" already exists` });
    }

    const contraseñaHasheada = await bcrypt.hash(contraseña, 10);

    return prisma.Usuario.create({
        where: { id: id },
        data: {
            contraseña: contraseñaHasheada,
        }
    });
};

const deleteUsuario = async (id) => {
    return prisma.Usuario.delete({
        where: { id: id }
    });
};

export {
    getAllUsuarios,
    getUsuarioById,
    registerUsuario,
    loginUsuario,
    updateUsuario,
    deleteUsuario
};