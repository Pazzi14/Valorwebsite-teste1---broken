document.addEventListener('DOMContentLoaded', function() {
    // Menu toggle para dispositivos móveis
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Simulador de empréstimo
    const loanSimulator = document.getElementById('loan-simulator');
    const loanAmount = document.getElementById('loan-amount');
    const loanTerm = document.getElementById('loan-term');
    const loanAmountOutput = document.getElementById('loan-amount-output');
    const loanTermOutput = document.getElementById('loan-term-output');
    const simulationResult = document.getElementById('simulation-result');

    // Função para formatar valores em reais
    function formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    }

    // Atualiza os valores do simulador em tempo real
    function updateSimulator() {
        loanAmountOutput.textContent = formatCurrency(loanAmount.value);
        loanTermOutput.textContent = `${loanTerm.value} meses`;
        
        // Calcula e exibe o resultado da simulação em tempo real
        calculateLoan();
    }

    loanAmount.addEventListener('input', updateSimulator);
    loanTerm.addEventListener('input', updateSimulator);

    // Calcula o empréstimo
    function calculateLoan() {
        const amount = parseFloat(loanAmount.value);
        const term = parseInt(loanTerm.value);
        const interestRate = 0.015; // 1.5% ao mês (ajuste conforme necessário)

        const monthlyPayment = (amount * interestRate * Math.pow(1 + interestRate, term)) / (Math.pow(1 + interestRate, term) - 1);
        const totalPayment = monthlyPayment * term;

        simulationResult.innerHTML = `
            <h3>Resultado da Simulação</h3>
            <p>Valor do Empréstimo: ${formatCurrency(amount)}</p>
            <p>Prazo: ${term} meses</p>
            <p>Pagamento Mensal Estimado: ${formatCurrency(monthlyPayment)}</p>
            <p>Total a Pagar: ${formatCurrency(totalPayment)}</p>
        `;
    }

    loanSimulator.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateLoan();
    });

    // Inicializa o simulador
    updateSimulator();

    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // function setActiveMenuItem() {
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.nav-links a');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - sectionHeight / 3) {
                    current = section.getAttribute('id');
                }
            });

            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href').slice(1) === current) {
                    item.classList.add('active');
                }
            });
        });
    }

    setActiveMenuItem();

    // Animação de fade-in para elementos ao rolar a página
    function fadeInElements() {
        const fadeElements = document.querySelectorAll('.fade-in');
        
        const fadeInOptions = {
            threshold: 0.5
        };

        const fadeInObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                }
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target);
            });
        }, fadeInOptions);

        fadeElements.forEach(element => {
            fadeInObserver.observe(element);
        });
    }

    fadeInElements();
});
