import Joi from "joi"

export const CreateUsuarioDTO = Joi.object({
    nombre: Joi.string().strict().required(),
    email: Joi.email().required(),
    contraseña: Joi.string().strict().required(),
    enable: Joi.boolean().strict().default(true),
    direccion: Joi.string().strict().required(),

    negocioId: Joi.number().allow(null)
});

export const AuthentcateUsuarioDTO = Joi.object({
    email: Joi.email().required(),
    contraseña: Joi.string().strict().required()
});

export const UpdateUsuarioDTO = Joi.object({
    nombre: Joi.string().strict().optional(),
    email: Joi.email(),
    contraseña: Joi.string().strict().required(),
    enable: Joi.boolean().strict().default(true).optional(),
    direccion: Joi.string().strict().optional(),

    negocioId: Joi.number().allow(null)
});