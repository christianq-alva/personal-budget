document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const incomeRadio = document.getElementById('income');
    const registerBtn = document.getElementById('registerBtn');
    const historyBtn = document.getElementById('historyBtn');
    const historyContainer = document.getElementById('history');
    
    let movements = [];
    let historyVisible = true;
    
    function registrarTransaccion(tipo, monto) {
        if (!monto || isNaN(monto)) {
            alert('Por favor ingrese un monto válido');
            return false;
        }
        
        if (tipo !== 'INGRESO' && tipo !== 'EGRESO') {
            alert('Tipo de transacción inválido');
            return false;
        }
        
        const movement = {
            type: tipo,
            amount: monto,
            id: movements.length + 1
        };
        
        movements.push(movement);
        return true;
    }
    
    registerBtn.addEventListener('click', () => {
        const amount = parseFloat(amountInput.value);
        const type = incomeRadio.checked ? 'INGRESO' : 'EGRESO';
        
        if (registrarTransaccion(type, amount)) {
            updateHistory();
            amountInput.value = '';
        }
    });
    
    historyBtn.addEventListener('click', () => {
        historyVisible = !historyVisible;
        historyContainer.style.display = historyVisible ? 'block' : 'none';
        historyBtn.textContent = historyVisible ? 'Ocultar Historial' : 'Mostrar Historial';
        if (historyVisible) {
            updateHistory();
        }
    });
    
    function updateHistory() {
        historyContainer.innerHTML = '';
        
        movements.forEach(movement => {
            const div = document.createElement('div');
            const amountText = movement.amount.toFixed(2);
            div.textContent = `Movimiento ${movement.id}: ${movement.type} - S/${amountText}`;
            div.style.color = movement.type === 'INGRESO' ? '#4CAF50' : '#f44336';
            historyContainer.appendChild(div);
        });
    }
    
    // Initialize history display
    updateHistory();
})