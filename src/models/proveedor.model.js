const { descripcion } = require("./negocio")

module.exports = {
    empresa: {
        type: "string", nullable: false
    },

    descripcion: {
        type: "string", nullable: false
    },
}