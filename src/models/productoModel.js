import Joi from "joi"

// dto significa Data Transfer Object, sirve para definir que estrutura tendran los datos
// strict sirve para obligar a que el parametro sea del tipo que especifica
// required sirve para obligar que el parametro tenga que ser enviado
// optional sirve para dar la opcion de que el parametro pueda o no ser enviado
// positive para que el numero sea positivo
// default sirve para oder indicar un valor por defecto en caso de que no se envie
// allow(null) permite que el parametro sea null, recuerda que la bd tambien lo debe permitir
// min(1) sirve para que en caso de que el usuario envie un JSON vacio no salte un error
// export indica que el metodo sera exportado para poder ser usado en otro lado
// fordibben prohibe que el parametro sea enviado por el usuario en el requesr
// strip elimina el parametro del dto, por o general se lo usa en los dto para mostrar

export const CreateProductoDTO = Joi.object({
    nombre: Joi.string().strict().required(),
    descripcion: Joi.string().strict().required(),
    precio_venta: Joi.number().strict().positive().required(),
    precio_compra: Joi.number().strict().positive().required(),
    categoria: Joi.string().strict().required(),
    SKU: Joi.string().strict().optional().allow(null),
    stock_actual: Joi.number().strict().positive().required(),
    stock_minimo: Joi.number().strict().positive().required(),
    enable: Joi.boolean().strict().default(true),

    //usuarioId: Joi.string().default(null).forbidden()
});

export const UpdateProductoDTO = Joi.object({
    nombre: Joi.string().strict().optional(),
    descripcion: Joi.string().strict().optional(),
    precio_venta: Joi.number().strict().positive().optional(),
    precio_compra: Joi.number().strict().positive().optional(),
    categoria: Joi.string().strict().optional(),
    stock_actual: Joi.number().strict().positive(),
    stock_minimo: Joi.number().strict().positive().optional(),
    enable: Joi.boolean().strict().default(true),
    
    //usuarioId: Joi.string().default(null).forbidden()
}).min(1);