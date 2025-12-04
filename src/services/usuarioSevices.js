import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/db.js";
import "dotenv/config";

const getAllUsuarios = async () => {
    return prisma.Usuario.findMany({
        omit: {
            contraseña: true,
        }
    });
};

const getUsuarioById = async (uid) => {
    return prisma.Usuario.findUnique({
        where: { uid },
        omit: {
            contraseña: true,
        }
    });
};

// hash encripta la contraseña (o parametro) usando la sal (10)
// ...data indica el resto de la estructura del objeto sin tener que esecificarlo

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
        where: { email: data.email },
        select: {
            uid: true,
            email: true,
            contraseña: true,
        }
    });
    
    if (!usuario) {
        return { error: `Invalid Credentials` };
    }

    // el primer parametro es la contraseña ue viene del body y la segunda la contraseña de la bd
    const contraseñaCorrecta = await bcrypt.compare(data.contraseña, usuario.contraseña);
    if (!contraseñaCorrecta) {
        return { error: `Invalid Credentials` };
    }

    // genera el token utilizando como base JWT_SECRET que esta en .env
    const token = jwt.sign(
        { uid: usuario.uid, email: usuario.email },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
    );

    return { token }
};

const updateUsuario = async (uid, data) => {
    const { contraseña } = data;

    if (contraseña) {
        const contraseñaHasheada = await bcrypt.hash(contraseña, 10);

        return prisma.Usuario.update({
            where: { uid: uid },
            data: {
                ...data,
                contraseña: contraseñaHasheada,
            }
        });
    } else {
        return prisma.Usuario.update({
            where: { uid: uid },
            data,
        });
    }



};

const deleteUsuario = async (uid) => {
    return prisma.Usuario.delete({
        where: { uid: uid }
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