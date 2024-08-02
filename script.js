document.addEventListener('DOMContentLoaded', function() {
    const loanSimulator = document.getElementById('loan-simulator');
    const simulationResult = document.getElementById('simulation-result');

    if (loanSimulator) {
        loanSimulator.addEventListener('submit', function(e) {
            e.preventDefault();
            const amount = parseFloat(document.getElementById('loan-amount').value);
            const term = parseInt(document.getElementById('loan-term').value);
            
            if (isNaN(amount) || isNaN(term) || amount < 100 || term < 1 || term > 120) {
                simulationResult.innerHTML = '<p class="error">Por favor, insira valores válidos. O valor mínimo é R$ 100 e o prazo deve ser entre 1 e 120 meses.</p>';
                return;
            }

            // Simulação com taxa de juros variável baseada no prazo
            let annualRate;
            if (term <= 12) {
                annualRate = 0.15; // 15% ao ano para empréstimos de até 1 ano
            } else if (term <= 24) {
                annualRate = 0.18; // 18% ao ano para empréstimos de até 2 anos
            } else {
                annualRate = 0.22; // 22% ao ano para empréstimos acima de 2 anos
            }

            const monthlyRate = annualRate / 12;
            const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
            const totalPayment = monthlyPayment * term;
            const totalInterest = totalPayment - amount;

            simulationResult.innerHTML = `
                <h3>Resultado da Simulação</h3>
                <p>Valor do Empréstimo: R$ ${amount.toFixed(2)}</p>
                <p>Prazo: ${term} meses</p>
                <p>Taxa de Juros Anual: ${(annualRate * 100).toFixed(2)}%</p>
                <p>Pagamento Mensal: R$ ${monthlyPayment.toFixed(2)}</p>
                <p>Total de Juros: R$ ${totalInterest.toFixed(2)}</p>
                <p>Total a Pagar: R$ ${totalPayment.toFixed(2)}</p>
            `;
        });
    }
});
