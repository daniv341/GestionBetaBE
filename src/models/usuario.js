module.exports = {
    nombre: {
        type: "string",
        nullable: false
    },

    contraseña: {
        type: "string",
        nullable: false
    },

    enable: {
        type: "boolean",
        nullable: false,
        default: true
    },

    direccion: {
        type: "string",
        nullable: false
    },
};