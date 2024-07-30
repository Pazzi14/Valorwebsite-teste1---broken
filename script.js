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

    // Fetch social media posts
    fetchSocialMediaPosts();
});

function fetchSocialMediaPosts() {
    // This is a mock function. In a real scenario, you would fetch data from social media APIs
    const mockPosts = [
        { platform: 'facebook', content: 'Confira nossas novas taxas de empréstimo!', date: '2023-07-01' },
        { platform: 'instagram', content: 'Dicas para organizar suas finanças', date: '2023-07-02' },
        { platform: 'linkedin', content: 'Valor Financiamentos expande operações para o Nordeste', date: '2023-07-03' }
    ];

    const socialPostsContainer = document.getElementById('social-posts');
    
    mockPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('social-post');
        postElement.innerHTML = `
            <h3>${post.platform}</h3>
            <p>${post.content}</p>
            <small>${post.date}</small>
        `;
        socialPostsContainer.appendChild(postElement);
    });
}
