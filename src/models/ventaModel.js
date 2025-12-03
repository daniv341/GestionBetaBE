import Joi from "joi"

export const CreateVentaDTO = Joi.object({
    total: Joi.number().strict().positive().required(),
    subtotal: Joi.number().strict().positive().required(),
    carga_impositiva: Joi.number().strict().positive().allow(null),
    ident_factura: Joi.number().strict().positive().required(),
    estado: Joi.boolean().strict().default(true),
    descuento: Joi.number().strict().positive().allow(null),

    //usuarioId: Joi.string().default(null).forbidden()
});

export const UpdateVentaDTO = Joi.object({
    total: Joi.number().strict().positive().optional(),
    subtotal: Joi.number().strict().positive().optional(),
    carga_impositiva: Joi.number().strict().positive().allow(null),
    ident_factura: Joi.number().strict().positive().optional(),
    estado: Joi.boolean().strict().default(true),
    descuento: Joi.number().strict().positive().allow(null),

    //usuarioId: Joi.string().default(null).forbidden()
}).min(1);

export const CreateFacturaDTO = Joi.object({
    fecha_vencimiento: Joi.date().iso().required()
});

export const CreateVenta_FacturaDTO = Joi.object({
    venta: CreateVentaDTO.required(),
    factura: CreateFacturaDTO.required()
});
