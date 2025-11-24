import Joi from "joi"

export const CreateUsuarioDTO = Joi.object({
    nombre: Joi.string().strict().required(),
    email: Joi.string().email().strict().required(),
    contraseña: Joi.string().strict().min(8)
        .pattern(/[A-Z]/, "a uppercase")
        .pattern(/[a-z]/, "a lowercase")
        .pattern(/[0-9]/, "a number")
        .pattern(/[@$!%*?&._-]/, "a special simbol")
        .required(),
    enable: Joi.boolean().strict().default(true),
    direccion: Joi.string().strict().required(),

    negocioId: Joi.number().allow(null)
});

export const LoginUsuarioDTO = Joi.object({
    email: Joi.string().email().strict().required(),
    contraseña: Joi.string().strict().required()
});

export const UpdateUsuarioDTO = Joi.object({
    nombre: Joi.string().strict().optional(),
    email: Joi.string().email().strict().optional(),
    contraseña: Joi.string().strict().min(8)
        .pattern(/[A-Z]/, "a uppercase")
        .pattern(/[a-z]/, "a lowercase")
        .pattern(/[0-9]/, "a number")
        .pattern(/[@$!%*?&._-]/, "a special simbol")
        .required(),
    enable: Joi.boolean().strict().default(true).optional(),
    direccion: Joi.string().strict().optional(),

    negocioId: Joi.number().allow(null)
});