import Joi from "joi"

export const UpdateOauthDTO = Joi.object({
    direccion: Joi.string().strict().required(),
    enable: Joi.boolean().strict().default(true)
});