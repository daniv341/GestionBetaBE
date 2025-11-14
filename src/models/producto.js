export const CreateProductoDTO = {
    nombre: {
        type: "string", required: true, nullable: false
    },

    descripcion: {
        type: "string", required: true, nullable: false
    },

    precio_venta: {
        type: "number", required: true, nullable: false
    },

    precio_compra: {
        type: "number", required: true, nullable: false
    },

    categoria: {
        type: "string", required: true, nullable: false
    },

    SKU: {
        type: "string", required: true, nullable: false
    },

    stock_actual: {
        type: "number", required: true, nullable: false
    },

    stock_minimo: {
        type: "number", required: true, nullable: false
    },

    enable: {
        type: "boolean", required: true, nullable: false, default: true
    }
};

export const UpdateProductoDTO = {
    descripcion: {
        type: "string"
    },

    precio_venta: {
        type: "number"
    },

    precio_compra: {
        type: "number"
    },

    stock_actual: {
        type: "number"
    },

    stock_minimo: {
        type: "number"
    },

    enable: {
        type: "boolean", default: true
    }
};

export const ResponseProductoDTO = {
    descripcion: {
        type: "string"
    },

    precio_venta: {
        type: "number"
    },

    precio_compra: {
        type: "number"
    },

    stock_actual: {
        type: "number"
    },

    stock_minimo: {
        type: "number"
    },

    enable: {
        type: "boolean"
    }
};