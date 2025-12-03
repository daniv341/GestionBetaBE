const verificarMayorMenorParametro = async (parametroMayor, parametroMenor) => {
    if (parametroMayor < parametroMenor) {
        return false;
    }
    return true;
}

const verificarNull = async (datos, datoNulo) => {
    const datosLimpios = datos.map(dato => {
        if (datoNulo == null) {
            const { datoNulo, ...datoSinParametroNull } = dato;
            return datoSinParametroNull;
        }
        return dato;
    });
    //esto iba en el usuarioControllers para la contraseña null del usuario tipo oauth
    /*//mapeo para quitar un parametro nulo que no quiero que sea mostrado
        const usuariosLimpios = usuarios.map(usuario => {
            if (usuario.contraseña == null) {
                const { contraseña, ...usuarioSinContraseña } = usuario;
                return usuarioSinContraseña
            }
            return usuario
        }); */
}

export {
    verificarMayorMenorParametro,
    verificarNull
};