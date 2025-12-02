import Joi from "joi"

// min o max sirve para indicar minimo y maximo de la longitud del dato
// pattern sirve para indicar un patron segun una expresion logica, de lo contrario, envia un mensaje

export const CreateUsuarioDTO = Joi.object({
    email: Joi.string().email().strict().required(),
    nombre: Joi.string().strict().required(),
    contraseña: Joi.string().strict().min(8)
        .pattern(/[A-Z]/, "a uppercase")
        .pattern(/[a-z]/, "a lowercase")
        .pattern(/[0-9]/, "a number")
        .pattern(/[@$!%*?&._-]/, "a special simbol")
        .required(),
    enable: Joi.boolean().strict().default(true),
    direccion: Joi.string().strict().required(),
    logo_negocio: Joi.string().strict().optional(),
    nombre_negocio: Joi.string().strict().optional(),
});

export const LoginUsuarioDTO = Joi.object({
    email: Joi.string().email().strict().required(),
    contraseña: Joi.string().strict().required()
});

export const UpdateUsuarioDTO = Joi.object({
    contraseña: Joi.string().strict().min(8)
        .pattern(/[A-Z]/, "a uppercase")
        .pattern(/[a-z]/, "a lowercase")
        .pattern(/[0-9]/, "a number")
        .pattern(/[@$!%*?&._-]/, "a special simbol")
        .optional(),
    enable: Joi.boolean().strict().default(true).optional(),
    direccion: Joi.string().strict().optional(),
    logo_negocio: Joi.string().strict().optional(),
    nombre_negocio: Joi.string().strict().optional(),
});

export const UpdateUsuarioOauthDTO =Joi.object({
    enable: Joi.boolean().strict().default(true).optional(),
    direccion: Joi.string().strict().required(),
    logo_negocio: Joi.string().strict().required(),
    nombre_negocio: Joi.string().strict().required(),
});