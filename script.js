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

    // Adiciona classe 'active' ao item de menu atual
    function setActiveMenuItem() {
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

    // Chatbot
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotForm = document.getElementById('chatbot-form');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotToggle = document.getElementById('chatbot-toggle');

    chatbotToggle.addEventListener('click', function() {
        chatbotContainer.classList.toggle('open');
    });

    chatbotForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const message = chatbotInput.value.trim();
        if (message) {
            addMessage('user', message);
            chatbotInput.value = '';
            // Simula uma resposta do bot após 1 segundo
            setTimeout(() => {
                const botResponse = getBotResponse(message);
                addMessage('bot', botResponse);
            }, 1000);
        }
    });

    function addMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`);
        messageElement.textContent = message;
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function getBotResponse(message) {
        message = message.toLowerCase();
        if (message.includes('olá') || message.includes('oi')) {
            return 'Olá! Como posso ajudar você hoje?';
        } else if (message.includes('empréstimo')) {
            return 'Temos várias opções de empréstimo disponíveis. Você gostaria de fazer uma simulação?';
        } else if (message.includes('taxas')) {
            return 'Nossas taxas são competitivas e variam de acordo com o tipo de empréstimo. Posso te dar mais detalhes sobre um produto específico?';
        } else if (message.includes('contato')) {
            return 'Você pode entrar em contato conosco pelo telefone (11) 3717-6415 ou pelo WhatsApp. Posso te passar o link?';
        } else {
            return 'Desculpe, não entendi sua pergunta. Pode reformular ou escolher entre os tópicos: empréstimo, taxas, contato?';
        }
    }
});
