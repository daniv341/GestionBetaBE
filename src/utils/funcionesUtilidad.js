const verificarMayorMenorParametro = async (parametroMayor, parametroMenor) => {
    if (parametroMayor < parametroMenor) {
        return false;
    }
    return true;


}

export {
    verificarMayorMenorParametro
};