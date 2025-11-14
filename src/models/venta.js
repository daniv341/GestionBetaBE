module.exports = {
    CreateVentaDTO: {
        total: {
            type: "number", required: true, nullable: false
        },

        subtotal: {
            type: "number", required: true, nullable: false
        },

        fecha: {
            type: "Date", required: true, nullable: false
        },

        carga_impositiva: {
            type: "number", required: true, nullable: false
        },

        ident_fatura: {
            type: "number", required: true, nullable: false
        },

        estado: {
            type: "boolean", required: true, nullable: false, default: true
        },

        descuento: {
            type: "number", required: true, nullable: false
        },
    },

    UpdateVentaDTO: {
        carga_impositiva: {
            type: "number"
        },

        estado: {
            type: "boolean"
        },

        descuento: {
            type: "number"
        },
    },

    ResponseVentaDTO: {
        id: {
            type: "number"
        },

        total: {
            type: "number"
        },

        subtotal: {
            type: "number"
        },

        fecha: {
            type: "Date"
        },

        carga_impositiva: {
            type: "number"
        },

        ident_fatura: {
            type: "number"
        },

        estado: {
            type: "boolean"
        },

        descuento: {
            type: "number"
        },
    }
}