import Joi from "joi"

export const CreateVentaDTO = Joi.object({
    carga_impositiva: Joi.number().strict().default(0),
    estado: Joi.boolean().strict().default(true),
    descuento: Joi.number().strict().default(0),

    //usuarioId: Joi.string().default(null).forbidden()
});

export const UpdateVentaDTO = Joi.object({
    total_bruto: Joi.number().strict().positive().optional(),
    carga_impositiva: Joi.number().strict().positive().default(0),
    estado: Joi.boolean().strict().default(true),
    descuento: Joi.number().strict().positive().default(0),

    //usuarioId: Joi.string().default(null).forbidden()
}).min(1);

export const CreateFacturaDTO = Joi.object({
    ident_factura: Joi.number().strict().positive().required()
});

export const CreateDetalleVentaDTO = Joi.object({
    cantidad: Joi.number().strict().positive().required(),
    productoId: Joi.number().strict().required()
});

export const CreateVenta_CompletaDTO = Joi.object({
    venta: CreateVentaDTO.required(),
    factura: CreateFacturaDTO.required(),
    detalles_venta: Joi.array().items(CreateDetalleVentaDTO).min(1).required()
});
