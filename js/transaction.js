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
    this.categories = [];
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

/**
 * Updates categories for all transactions
 * @param {string[]} newCategories - New categories to apply
 * @returns {Transaction[]} Updated transactions array
 */
Transaction.prototype.updateCategories = function(newCategories) {
    return this.categories.map(category => newCategories.includes(category) ? category : newCategories[0]);
};

/**
 * Checks if transaction amount exceeds specified limit
 * @param {number} limit - Amount limit to check
 * @returns {boolean} True if amount exceeds limit
 */
Transaction.prototype.hasTransactionsOverAmount = function(limit) {
    return this.amount > limit;
};

/**
 * Validates if transaction amount is positive
 * @returns {boolean} True if amount is valid
 */
Transaction.prototype.areAllTransactionsValid = function() {
    return this.amount > 0;
};

/**
 * Formats the description by removing leading/trailing spaces
 * @returns {string} Cleaned description
 */
Transaction.prototype.formatDescription = function() {
    return this.description.trim();
};

/**
 * Normalizes transaction type to lowercase
 * @returns {string} Normalized transaction type
 */
Transaction.prototype.getTransactionType = function() {
    return this.type.toLowerCase();
};

/**
 * Converts comma-separated tags string into array
 * @param {string} tagsString - Comma-separated tags
 * @returns {string[]} Array of tags
 */
Transaction.prototype.splitTags = function(tagsString) {
    return tagsString.split(',').map(tag => tag.trim());
};

export default Transaction;