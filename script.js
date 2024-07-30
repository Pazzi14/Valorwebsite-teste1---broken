document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const authButtons = document.querySelector('.auth-buttons');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        authButtons.classList.toggle('active');
    });

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
        loanAmountOutput.value = `R$ ${loanAmount.value}`;
    }

    function updateLoanTerm() {
        loanTermOutput.value = `${loanTerm.value} meses`;
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

    // Contact form submission (you'll need to implement the backend for this)
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Obrigado por entrar em contato! Retornaremos em breve.');
        contactForm.reset();
    });

    // Initialize loan simulator values
    updateLoanAmount();
    updateLoanTerm();
});
