module.exports = {
    monto: {
        type: "number", nullable: false
    },

    carga_impositiva: {
        type: "number", nullable: false
    },

    ident_fatura: {
        type: "number", nullable: false
    },

    estado: {
        type: "boolean", nullable: false, default: true
    },
}