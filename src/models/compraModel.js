import Joi from "joi";

export const CreateCompraDTO = Joi.object({
    total: Joi.number().strict().positive().required(),
    carga_impositiva: Joi.number().strict().positive().optional(),
    ident_factura: Joi.number().strict().positive().required(),
    estado: Joi.boolean().strict().default(true),

    proveedorId: Joi.number().strict().positive().required()
});