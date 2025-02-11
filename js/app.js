import { calcularBalance, formatearMonto } from './utils.js';
import { validarMonto, validarTipo } from './validators.js';

document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const incomeRadio = document.getElementById('income');
    const registerBtn = document.getElementById('registerBtn');
    const historyBtn = document.getElementById('historyBtn');
    const historyContainer = document.getElementById('history');
    const totalBalanceElement = document.getElementById('total-balance');
    
    const state = {
        movements: [],
        historyVisible: true
    };
    
    const registrarTransaccion = (tipo, monto) => {
        if (!validarMonto(monto) || !validarTipo(tipo)) {
            alert('Por favor verifique los datos ingresados');
            return false;
        }
        
        const movement = {
            type: tipo,
            amount: monto,
            id: state.movements.length + 1
        };
        
        state.movements = [...state.movements, movement];
        updateBalance();
        return true;
    };
    
    const updateBalance = () => {
        const totalBalance = calcularBalance(state.movements);
        totalBalanceElement.textContent = formatearMonto(totalBalance);
    };
    
    const updateHistory = () => {
        historyContainer.innerHTML = '';
        
        state.movements.map(movement => {
            const div = document.createElement('div');
            div.textContent = `Movimiento ${movement.id}: ${movement.type} - ${formatearMonto(movement.amount)}`;
            div.style.color = movement.type === 'INGRESO' ? '#4CAF50' : '#f44336';
            return div;
        }).forEach(div => historyContainer.appendChild(div));
    };
    
    registerBtn.addEventListener('click', () => {
        const amount = parseFloat(amountInput.value);
        const type = incomeRadio.checked ? 'INGRESO' : 'EGRESO';
        
        if (registrarTransaccion(type, amount)) {
            updateHistory();
            amountInput.value = '';
        }
    });
    
    historyBtn.addEventListener('click', () => {
        state.historyVisible = !state.historyVisible;
        historyContainer.style.display = state.historyVisible ? 'block' : 'none';
        historyBtn.textContent = state.historyVisible ? 'Ocultar Historial' : 'Mostrar Historial';
        if (state.historyVisible) {
            updateHistory();
        }
    });
    
    // Initialize history display
    updateHistory();
});