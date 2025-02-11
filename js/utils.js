/**
 * Calcula el balance total basado en un array de transacciones
 * @param {Array} transacciones - Array de objetos de transacción
 * @returns {number} - Balance total
 */
export const calcularBalance = (transacciones) => {
    return transacciones.reduce((total, trans) => {
        const monto = trans.type === 'INGRESO' ? trans.amount : -trans.amount;
        return total + monto;
    }, 0);
};

/**
 * Formatea un monto con el símbolo de la moneda
 * @param {number} monto - Monto a formatear
 * @param {string} moneda - Símbolo de la moneda (default: 'S/')
 * @returns {string} - Monto formateado
 */
export const formatearMonto = (monto, moneda = 'S/') => {
    return `${moneda}${Math.abs(monto).toFixed(2)}`;
};