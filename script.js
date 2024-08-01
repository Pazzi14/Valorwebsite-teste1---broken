document.addEventListener('DOMContentLoaded', function() {

    const loanForm = document.getElementById('loan-form');
    const loanResult = document.getElementById('loan-result');

    if (loanForm) {
        loanForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const amount = parseFloat(document.getElementById('loan-amount').value);
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
                <p>Valor do Empréstimo: R$ ${amount.toFixed(2)}</p>
                <p>Prazo: ${term} meses</p>
                <p>Pagamento Mensal: R$ ${monthlyPayment.toFixed(2)}</p>
                <p>Total a Pagar: R$ ${totalPayment.toFixed(2)}</p>
            `;
        });
    }


    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
        });
    });

    // Formulário de Contato
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            contactForm.reset();
        });
    }


    const openChatbotBtn = document.getElementById('open-chatbot');
    const closeChatbotBtn = document.getElementById('close-chatbot');
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input');
    const sendMessageBtn = document.getElementById('send-message');

    function addMessage(message, isUser = false) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(isUser ? 'user-message' : 'bot-message');
        messageElement.textContent = message;
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function getBotResponse(message) {
        if (message.toLowerCase().includes('empréstimo')) {
            return "Para solicitar um empréstimo, por favor, use nosso simulador de empréstimo ou entre em contato conosco através do formulário de contato.";
        } else if (message.toLowerCase().includes('taxas')) {
            return "Nossas taxas variam de acordo com o tipo de empréstimo e sua situação financeira. Por favor, use nosso simulador para obter uma estimativa personalizada.";
        } else {
            return "Desculpe, não entendi sua pergunta. Pode reformular ou entrar em contato com nossa equipe para um atendimento personalizado?";
        }
    }

    if (openChatbotBtn) {
        openChatbotBtn.addEventListener('click', () => {
            chatbotContainer.style.display = 'flex';
            openChatbotBtn.style.display = 'none';
        });
    }

    if (closeChatbotBtn) {
        closeChatbotBtn.addEventListener('click', () => {
            chatbotContainer.style.display = 'none';
            openChatbotBtn.style.display = 'block';
        });
    }

    if (sendMessageBtn) {
        sendMessageBtn.addEventListener('click', () => {
            const message = chatbotInput.value.trim();
            if (message) {
                addMessage(message, true);
                chatbotInput.value = '';
                setTimeout(() => {
                    const botResponse = getBotResponse(message);
                    addMessage(botResponse);
                }, 500);
            }
        });
    }

    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessageBtn.click();
            }
        });
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


    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        let isDown = false;
        let startX;
        let scrollLeft;

        testimonialSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - testimonialSlider.offsetLeft;
            scrollLeft = testimonialSlider.scrollLeft;
        });

        testimonialSlider.addEventListener('mouseleave', () => {
            isDown = false;
        });

        testimonialSlider.addEventListener('mouseup', () => {
            isDown = false;
        });

        testimonialSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - testimonialSlider.offsetLeft;
            const walk = (x - startX) * 3;
            testimonialSlider.scrollLeft = scrollLeft - walk;
        });
    }
});
