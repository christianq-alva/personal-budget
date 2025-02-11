/**
 * Transaction constructor
 * @param {string} type - Type of transaction (ingreso/gasto)
 * @param {number} amount - Amount of the transaction
 * @param {string} description - Description of the transaction
 */
function Transaction(type, amount, description) {
    this.id = Date.now();
    this.type = type;
    this.description = description;
    this.amount = amount;
    this.createdAt = new Date();
}

/**
 * Returns a formatted date string
 * @returns {string} Formatted date
 */
Transaction.prototype.getFormattedDate = function() {
    return this.createdAt.toLocaleDateString('es-PE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

/**
 * Returns the amount with the appropriate sign based on transaction type
 * @returns {number} Signed amount
 */
Transaction.prototype.getSignedAmount = function() {
    return this.type === 'ingreso' ? this.amount : -this.amount;
};

export default Transaction;