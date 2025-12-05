const verificarMayorMenorParametro = async (parametroMayor, parametroMenor) => {
    if (parametroMayor < parametroMenor) {
        return false;
    }
    return true;
}

const fechaActualArgentina = async () => {
    const fechaActual = new Date();

    const fechaArgentina = new Date(fechaActual.getTime() - (3 * 60 * 60 * 1000)).toISOString(); // UTC-3
    
    return fechaArgentina;
};

const fechaVencimientoFactura = async (fechaActual) => {
    const fechaVencimientoFactura = new Date(fechaActual);

    fechaVencimientoFactura.setDate(fechaActual.getTime() + 30).toISOString();

    return fechaVencimientoFactura;
};

export {
    verificarMayorMenorParametro,
    fechaActualArgentina,
    fechaVencimientoFactura
};

/*const verificarNull = async (datos, datoNulo) => {
    const datosLimpios = datos.map(dato => {
        if (datoNulo == null) {
            const { datoNulo, ...datoSinParametroNull } = dato;
            return datoSinParametroNull;
        }
        return dato;
    });
    //esto iba en el usuarioControllers para la contraseña null del usuario tipo oauth
    //mapeo para quitar un parametro nulo que no quiero que sea mostrado
        const usuariosLimpios = usuarios.map(usuario => {
            if (usuario.contraseña == null) {
                const { contraseña, ...usuarioSinContraseña } = usuario;
                return usuarioSinContraseña
            }
            return usuario
        }); 
}

//elimina la contraseña del json para no mostrarla por mas de que este encriptada
        const { error, value: usuarioLimpio } = GetUsuarioDTO.validate(usuario, {
            allowUnknown: true
        });
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }*/

