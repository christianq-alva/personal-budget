import { calcularBalance, formatearMonto } from './utils.js';

/**
 * Budget constructor
 */
function Budget() {
    this.transactions = [];
}

/**
 * Adds a transaction to the budget
 * @param {Transaction} transaction - Transaction to add
 * @returns {boolean} - true if transaction was added successfully
 */
Budget.prototype.add = function(transaction) {
    if (!transaction || !transaction.id) return false;
    this.transactions.push(transaction);
    return true;
};

/**
 * Removes a transaction from the budget
 * @param {number} id - ID of the transaction to remove
 * @returns {boolean} - true if transaction was removed successfully
 */
Budget.prototype.remove = function(id) {
    const initialLength = this.transactions.length;
    this.transactions = this.transactions.filter(t => t.id !== id);
    return this.transactions.length !== initialLength;
};

/**
 * Calculates the total balance of all transactions
 * @returns {number} - Total balance
 */
Budget.prototype.calculateTotal = function() {
    return this.transactions.reduce((total, trans) => {
        return total + trans.getSignedAmount();
    }, 0);
};

/**
 * Formats an amount with currency symbol
 * @param {number} amount - Amount to format
 * @returns {string} - Formatted amount
 */
Budget.prototype.formatAmount = function(amount) {
    return formatearMonto(amount);
};

export default Budget;