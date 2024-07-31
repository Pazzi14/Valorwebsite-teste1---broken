document.addEventListener('DOMContentLoaded', function() {
    // Menu toggle para dispositivos móveis
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Simulador de empréstimo
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

    // Botão de voltar ao topo
    const scrollToTopButton = document.querySelector('.scroll-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            scrollToTopButton.classList.add('show');
        } else {
            scrollToTopButton.classList.remove('show');
        }
    });

    scrollToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Pop-up de consentimento de cookies
    const cookieConsent = document.getElementById('cookie-consent');
    const acceptCookiesButton = document.getElementById('accept-cookies');

    if (!localStorage.getItem('cookiesAccepted')) {
        cookieConsent.style.display = 'block';
    }

    acceptCookiesButton.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieConsent.style.display = 'none';
    });

    // Animação de fade-in para elementos quando entram na viewport
    const fadeElements = document.querySelectorAll('.fade-in');

    const fadeInOptions = {
        threshold: 0.5,
        rootMargin: "0px 0px -100px 0px"
    };

    const fadeInObserver = new IntersectionObserver(function(entries, fadeInObserver) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, fadeInOptions);

    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });

    // Validação de formulário de contato (se existir)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Adicione aqui a lógica de validação e envio do formulário
            alert('Formulário enviado com sucesso!');
        });
    }

    // Carregamento lazy de imagens
    const lazyImages = document.querySelectorAll('img[data-src]');
    const lazyImageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const lazyImage = entry.target;
                lazyImage.src = lazyImage.dataset.src;
                lazyImage.classList.remove("lazy");
                lazyImageObserver.unobserve(lazyImage);
            }
        });
    });

    lazyImages.forEach(function(lazyImage) {
        lazyImageObserver.observe(lazyImage);
    });
});
