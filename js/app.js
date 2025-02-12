import Transaction from './transaction.js';
import Budget from './budget.js';
import { validarMonto, validarTipo, isValidTransaction } from './validators.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('transaction-form');
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');
    const typeSelect = document.getElementById('type');
    const totalElement = document.getElementById('total');
    const transactionsList = document.getElementById('transactions-list');
    const searchInput = document.getElementById('search');

    const budget = new Budget();

    const updateUI = () => {
        const total = budget.calculateTotal();
        totalElement.textContent = formatAmount(total);

        transactionsList.innerHTML = '';
        budget.transactions.forEach(transaction => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${transaction.formatDescription()} - 
                ${formatAmount(transaction.amount)} 
                (${transaction.getFormattedDate()})
                <button onclick="removeTransaction(${transaction.id})">Eliminar</button>
            `;
            li.style.color = transaction.type === 'ingreso' ? '#4CAF50' : '#f44336';
            transactionsList.appendChild(li);
        });
    };

    const searchTransactions = (query) => {
        transactionsList.innerHTML = '';
        const filteredTransactions = budget.transactions.filter(transaction => 
            transaction.description.toLowerCase().includes(query.toLowerCase())
        );

        filteredTransactions.forEach(transaction => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${transaction.formatDescription()} - 
                ${formatAmount(transaction.amount)} 
                (${transaction.getFormattedDate()})
                <button onclick="removeTransaction(${transaction.id})">Eliminar</button>
            `;
            li.style.color = transaction.type === 'ingreso' ? '#4CAF50' : '#f44336';
            transactionsList.appendChild(li);
        });
    };

    const formatAmount = (amount) => {
        return amount.toLocaleString('es-PE', {
            style: 'currency',
            currency: 'PEN'
        });
    };

    const getMonthName = (date) => {
        return date.toLocaleString('es-PE', { month: 'long' });
    };

    window.removeTransaction = (id) => {
        if (budget.remove(id)) {
            updateUI();
        }
    };

    if (searchInput) {
        searchInput.addEventListener('input', (event) => {
            searchTransactions(event.target.value);
        });
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const type = typeSelect.value;
        const amount = parseFloat(amountInput.value);
        const description = descriptionInput.value;

        if (!validarMonto(amount) || !validarTipo(type)) {
            alert('Por favor verifique los datos ingresados');
            return;
        }

        const transaction = new Transaction(type, amount, description);
        
        if (isValidTransaction(transaction) && budget.add(transaction)) {
            updateUI();
            form.reset();
        } else {
            alert('Error al crear la transacción');
        }
    });

    // Initialize UI
    updateUI();
});