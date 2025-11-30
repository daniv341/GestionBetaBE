import Joi from "joi"

export const UpdateUsuarioOauthDTO = Joi.object({
    direccion: Joi.string().strict().required(),
    enable: Joi.boolean().strict().default(true)
});