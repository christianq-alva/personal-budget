/**
 * Valida que el monto sea un número válido y positivo
 * @param {number} monto - Monto a validar
 * @returns {boolean} - true si el monto es válido
 */
export const validarMonto = (monto) => {
    return !isNaN(monto) && monto > 0;
};

/**
 * Valida que el tipo de transacción sea válido
 * @param {string} tipo - Tipo de transacción a validar
 * @returns {boolean} - true si el tipo es válido
 */
export const validarTipo = (tipo) => {
    return tipo === 'INGRESO' || tipo === 'EGRESO';
};