import Joi from "joi"

export const CreateProductoDTO = Joi.object({
    nombre: Joi.string().strict().required(),
    descripcion: Joi.string().strict().required(),
    precio_venta: Joi.number().strict().positive().required(),
    precio_compra: Joi.number().strict().positive().required(),
    categoria: Joi.string().strict().required(),
    SKU: Joi.string().strict().required(),
    stock_actual: Joi.number().strict().positive().required(),
    stock_minimo: Joi.number().strict().positive().required(),
    enable: Joi.boolean().strict().required().default(true),

    inventarioId: Joi.number().allow(null)
});

export const UpdateProductoDTO = Joi.object({
    nombre: Joi.string().strict().optional(),
    descripcion: Joi.string().strict(),
    precio_venta: Joi.number().strict().positive().optional(),
    precio_compra: Joi.number().strict().positive().optional(),
    categoria: Joi.string().strict().optional(),
    SKU: Joi.string().strict(),
    stock_actual: Joi.number().strict().positive(),
    stock_minimo: Joi.number().strict().positive().optional(),
    enable: Joi.boolean().strict().default(true).optional(),
    
    inventarioId: Joi.number().allow(null).optional()
}).min(1);