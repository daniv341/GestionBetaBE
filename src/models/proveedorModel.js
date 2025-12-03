import Joi from "joi";

export const CreateProveedorDTO = Joi.object({
    empresa: Joi.string().strict().required(),
    descripcion: Joi.string().strict().required()
});