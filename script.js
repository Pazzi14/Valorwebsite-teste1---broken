document.addEventListener('DOMContentLoaded', function() {
    // Simulador de Empréstimo
    const loanForm = document.getElementById('loan-form');
    const loanResult = document.getElementById('loan-result');
    const loanAmountSlider = document.getElementById('loan-amount');
    const loanAmountOutput = document.getElementById('loan-amount-output');

    if (loanForm && loanAmountSlider && loanAmountOutput) {
        loanAmountSlider.addEventListener('input', function() {
            loanAmountOutput.value = `R$ ${parseInt(this.value).toLocaleString('pt-BR')}`;
        });

        loanForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const amount = parseFloat(loanAmountSlider.value);
            const term = parseInt(document.getElementById('loan-term').value);
            const type = document.getElementById('loan-type').value;
            
            let interestRate;
            switch(type) {
                case 'personal': interestRate = 0.02; break;
                case 'consignado': interestRate = 0.015; break;
                case 'fgts': interestRate = 0.0199; break;
                default: interestRate = 0.02;
            }

            const monthlyPayment = (amount * interestRate * Math.pow((1 + interestRate), term)) / (Math.pow((1 + interestRate), term) - 1);
            const totalPayment = monthlyPayment * term;

            loanResult.innerHTML = `
                <h3>Resultado da Simulação</h3>
                <p>Valor do Empréstimo: R$ ${amount.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                <p>Prazo: ${term} meses</p>
                <p>Pagamento Mensal: R$ ${monthlyPayment.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                <p>Total a Pagar: R$ ${totalPayment.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
            `;
        });
    }

    // Formulário de Contato
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            contactForm.reset();
        });
    }

    // Menu Mobile
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('nav ul');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }

    // Chatbot
    const openChatbotBtn = document.getElementById('open-chatbot');
    const closeChatbotBtn = document.getElementById('close-chatbot');
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input');
    const sendMessageBtn = document.getElementById('send-message');

    function addMessage(message, isUser = false) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', isUser ? 'user-message' : 'bot-message');
        messageElement.textContent = message;
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function getBotResponse(message) {
        const lowerMessage = message.toLowerCase();
        if (lowerMessage.includes('empréstimo')) {
            return "Para solicitar um empréstimo, por favor, use nosso simulador de empréstimo ou entre em contato conosco através do formulário de contato.";
        } else if (lowerMessage.includes('taxas') || lowerMessage.includes('juros')) {
            return "Nossas taxas variam de acordo com o tipo de empréstimo e sua situação financeira. Por favor, use nosso simulador para obter uma estimativa personalizada.";
        } else if (lowerMessage.includes('contato') || lowerMessage.includes('falar com atendente')) {
            return "Para falar com um de nossos atendentes, por favor, ligue para (11) 3717-6415 ou preencha o formulário de contato em nosso site.";
        } else {
            return "Desculpe, não entendi sua pergunta. Pode reformular ou entrar em contato com nossa equipe para um atendimento personalizado?";
        }
    }

    if (openChatbotBtn && closeChatbotBtn && chatbotContainer && sendMessageBtn && chatbotInput) {
        openChatbotBtn.addEventListener('click', () => {
            chatbotContainer.style.display = 'flex';
            openChatbotBtn.style.display = 'none';
        });

        closeChatbotBtn.addEventListener('click', () => {
            chatbotContainer.style.display = 'none';
            openChatbotBtn.style.display = 'block';
        });

        sendMessageBtn.addEventListener('click', sendMessage);
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        function sendMessage() {
            const message = chatbotInput.value.trim();
            if (message) {
                addMessage(message, true);
                chatbotInput.value = '';
                setTimeout(() => {
                    const botResponse = getBotResponse(message);
                    addMessage(botResponse);
                }, 500);
            }
        }
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animação de Scroll
    function reveal() {
        var reveals = document.querySelectorAll(".reveal");
        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            } else {
                reveals[i].classList.remove("active");
            }
        }
    }

    window.addEventListener("scroll", reveal);

    // Para ativar a animação na carga inicial
    reveal();
});
