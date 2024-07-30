document.addEventListener('DOMContentLoaded', function() {
    // Loan simulator
    const loanSimulator = document.getElementById('loan-simulator');
    const loanAmount = document.getElementById('loan-amount');
    const loanTerm = document.getElementById('loan-term');
    const loanAmountOutput = document.getElementById('loan-amount-output');
    const loanTermOutput = document.getElementById('loan-term-output');
    const simulationResult = document.getElementById('simulation-result');

    loanAmount.addEventListener('input', updateLoanAmount);
    loanTerm.addEventListener('input', updateLoanTerm);

    function updateLoanAmount() {
        loanAmountOutput.textContent = `R$ ${loanAmount.value}`;
    }

    function updateLoanTerm() {
        loanTermOutput.textContent = `${loanTerm.value} meses`;
    }

    loanSimulator.addEventListener('submit', function(e) {
        e.preventDefault();
        const amount = parseFloat(loanAmount.value);
        const term = parseInt(loanTerm.value);
        const interestRate = 0.015; // 1.5% monthly interest rate

        const monthlyPayment = (amount * interestRate * Math.pow(1 + interestRate, term)) / (Math.pow(1 + interestRate, term) - 1);
        const totalPayment = monthlyPayment * term;

        simulationResult.innerHTML = `
            <h3>Resultado da Simulação</h3>
            <p>Valor do Empréstimo: R$ ${amount.toFixed(2)}</p>
            <p>Prazo: ${term} meses</p>
            <p>Pagamento Mensal Estimado: R$ ${monthlyPayment.toFixed(2)}</p>
            <p>Total a Pagar: R$ ${totalPayment.toFixed(2)}</p>
        `;
    });

    // Initialize loan simulator values
    updateLoanAmount();
    updateLoanTerm();

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Responsive navigation menu toggle
    const menuToggle = document.createElement('button');
    menuToggle.classList.add('menu-toggle');
    menuToggle.innerHTML = '☰';
    document.querySelector('nav').prepend(menuToggle);

    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});
