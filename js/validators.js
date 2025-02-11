import Transaction from './transaction.js';
import Budget from './budget.js';

/**
 * Validates if the amount is a valid positive number
 * @param {number} amount - Amount to validate
 * @returns {boolean} - true if amount is valid
 */
export const validarMonto = (amount) => {
    return !isNaN(amount) && amount > 0;
};

/**
 * Validates if the transaction type is valid
 * @param {string} type - Transaction type to validate
 * @returns {boolean} - true if type is valid
 */
export const validarTipo = (type) => {
    return type === 'ingreso' || type === 'gasto';
};

/**
 * Validates if a transaction object has all required properties
 * @param {Transaction} transaction - Transaction object to validate
 * @returns {boolean} - true if transaction is valid
 */
export const isValidTransaction = (transaction) => {
    return transaction instanceof Transaction &&
           typeof transaction.id === 'number' &&
           typeof transaction.type === 'string' &&
           typeof transaction.amount === 'number' &&
           typeof transaction.description === 'string' &&
           transaction.createdAt instanceof Date &&
           validarTipo(transaction.type) &&
           validarMonto(transaction.amount);
};

/**
 * Validates if a budget object is a valid instance of Budget
 * @param {Budget} budget - Budget object to validate
 * @returns {boolean} - true if budget is valid
 */
export const isValidBudget = (budget) => {
    return budget instanceof Budget &&
           Array.isArray(budget.transactions) &&
           budget.transactions.every(isValidTransaction);
};