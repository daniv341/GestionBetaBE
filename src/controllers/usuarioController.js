import * as usuarioServices from "../services/usuarioServices";
import { CreateUsuarioDTO, AuthentcateUsuarioDTO } from "../models/usuario.js";

const addUser = async (req, res) => {
    try {
        const data = req.body;
        const email = data.email;
        const contraseña = data.contraseña;

        //validar DTO
        const { error } = CreateUsuarioDTO.validate(data);
        if (error){
            return res.status(400).json({ error: error.details[0].message })
        }

        //verificar email existente
        const emailExistente = await prisma.Usuario.findUnique({
            where: { email: data.email },
        });
        if (emailExistente) {
            return res.status(400).json({ error: `A usuario with email "${data.email}" already exists` });
        }

        //verificar nombre existente
        const nombreExistente = await prisma.Usuario.findUnique({
            where: { email: data.nombre },
        });
        if (nombreExistente) {
            return res.status(400).json({ error: `A usuario with nombre "${data.nombre}" already exists` });
        }

        const usuario = await usuarioServices.addUser(email, contraseña);
        return res.status(201).json(usuario);
    } catch (error) {
        console.error("Error sing in user: ", error);
        return res.status(500).json({ error: error.message });
    };
};
const authenticate = async (req, res) => {
    try {
        const data = req.body;

        //validar DTO
        const { error } = AuthentcateUsuarioDTO.validate(data);
        if (error){
            return res.status(400).json({ error: error.details[0].message })
        }

        const usuario = await usuarioServices.authenticate(email, contraseña);
        return res.status(201).json(usuario);
    } catch (error) {
        console.error("Error authenticate user: ", error);
        return res.status(500).json({ error: error.message });
    }
};

export {
    addUser,
    authenticate
}
