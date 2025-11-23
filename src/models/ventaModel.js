import Joi from "joi"

export const CreateVentaDTO = Joi.object({
    total: Joi.number().strict().positive().required(),
    subtotal: Joi.number().strict().positive().required(),
    fecha: Joi.date().iso().strict().required(),
    carga_impositiva: Joi.number().strict().positive().required(),
    ident_factura: Joi.number().strict().positive().required(),
    estado: Joi.boolean().strict().default(true),
    descuento: Joi.number().strict().positive().required(),

    negocioId: Joi.number().allow(null)
});

export const UpdateVentaDTO = Joi.object({
    total: Joi.number().strict().positive().optional(),
    subtotal: Joi.number().strict().positive().optional(),
    fecha: Joi.date().iso().strict().optional(),
    carga_impositiva: Joi.number().strict().positive().optional(),
    ident_factura: Joi.number().strict().positive().optional(),
    estado: Joi.boolean().strict().default(true),
    descuento: Joi.number().strict().positive(),

    negocioId: Joi.number().allow(null)
}).min(1);
