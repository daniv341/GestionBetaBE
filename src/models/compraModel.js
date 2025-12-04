import Joi from "joi";

export const CreateCompraDTO = Joi.object({
    total_bruto: Joi.number().strict().positive().required(),
    carga_impositiva: Joi.number().strict().positive().optional(),
    num_comprobante: Joi.number().strict().positive().required(),
    estado: Joi.boolean().strict().default(true),

    proveedorId: Joi.number().strict().positive().required()
});