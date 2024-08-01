document.addEventListener('DOMContentLoaded', function() {
    // Simulador de Empréstimo
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

    // FAQ Accordion
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
            // Aqui você implementaria a lógica para enviar o formulário
            alert('Mensagem enviada com sucesso!');
            contactForm.reset();
        });
    }

    // Calculadora de Capacidade de Endividamento
    const debtCapacityForm = document.getElementById('debt-capacity-form');
    const debtCapacityResult = document.getElementById('debt-capacity-result');

    if (debtCapacityForm) {
        debtCapacityForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const income = parseFloat(document.getElementById('monthly-income').value);
            const expenses = parseFloat(document.getElementById('monthly-expenses').value);

            const availableIncome = income - expenses;
            const maxDebt = availableIncome * 0.3; // 30% da renda disponível

            debtCapacityResult.innerHTML = `
                <h3>Resultado da Análise</h3>
                <p>Renda Disponível: R$ ${availableIncome.toFixed(2)}</p>
                <p>Capacidade Máxima de Endividamento: R$ ${maxDebt.toFixed(2)} por mês</p>
            `;
        });
    }

    // Calculadora de Objetivos Financeiros
    const calculateGoalBtn = document.getElementById('calculate-goal');
    const goalResult = document.getElementById('goal-result');

    if (calculateGoalBtn) {
        calculateGoalBtn.addEventListener('click', function() {
            const goalAmount = parseFloat(document.getElementById('goal-amount').value);
            const goalTime = parseInt(document.getElementById('goal-time').value);
            const monthlySaving = parseFloat(document.getElementById('monthly-saving').value);

            const totalSaving = monthlySaving * goalTime;
            const difference = goalAmount - totalSaving;

            if (difference <= 0) {
                goalResult.innerHTML = `
                    <p>Parabéns! Com sua economia mensal de R$ ${monthlySaving.toFixed(2)}, você alcançará seu objetivo de R$ ${goalAmount.toFixed(2)} em ${goalTime} meses, e ainda sobrará R$ ${Math.abs(difference).toFixed(2)}.</p>
                `;
            } else {
                const additionalMonthly = difference / goalTime;
                goalResult.innerHTML = `
                    <p>Para atingir seu objetivo de R$ ${goalAmount.toFixed(2)} em ${goalTime} meses, você precisará economizar R$ ${(monthlySaving + additionalMonthly).toFixed(2)} por mês.</p>
                    <p>Isso significa um adicional de R$ ${additionalMonthly.toFixed(2)} por mês em relação ao que você planeja economizar atualmente.</p>
                `;
            }
        });
    }

    // Simulador de Refinanciamento
    const calculateRefinancingBtn = document.getElementById('calculate-refinancing');
    const refinancingResult = document.getElementById('refinancing-result');

    if (calculateRefinancingBtn) {
        calculateRefinancingBtn.addEventListener('click', function() {
            const currentDebt = parseFloat(document.getElementById('current-debt').value);
            const currentInterest = parseFloat(document.getElementById('current-interest').value);
            const currentTerm = parseInt(document.getElementById('current-term').value);

            const currentMonthlyPayment = (currentDebt * (currentInterest/100) * Math.pow((1 + currentInterest/100), currentTerm)) / (Math.pow((1 + currentInterest/100), currentTerm) - 1);
            
            const refinancedInterest = currentInterest * 0.8; // Assumindo uma redução de 20% na taxa de juros
            const refinancedTerm = currentTerm * 1.2; // Assumindo um aumento de 20% no prazo
            
            const refinancedMonthlyPayment = (currentDebt * (refinancedInterest/100) * Math.pow((1 + refinancedInterest/100), refinancedTerm)) / (Math.pow((1 + refinancedInterest/100), refinancedTerm) - 1);

            const savings = currentMonthlyPayment - refinancedMonthlyPayment;

            refinancingResult.innerHTML = `
                <h3>Resultado da Simulação</h3>
                <p>Pagamento mensal atual: R$ ${currentMonthlyPayment.toFixed(2)}</p>
                <p>Pagamento mensal refinanciado: R$ ${refinancedMonthlyPayment.toFixed(2)}</p>
                <p>Economia mensal: R$ ${savings.toFixed(2)}</p>
                <p>Nova taxa de juros: ${refinancedInterest.toFixed(2)}% a.m.</p>
                <p>Novo prazo: ${refinancedTerm} meses</p>
            `;
        });
    }

    // Calendário Financeiro
    const calendarEl = document.getElementById('calendar');
    if (calendarEl) {
        const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            events: [
                {
                    title: 'Prazo final IR',
                    start: '2024-04-30'
                },
                {
                    title: 'Saque FGTS',
                    start: '2024-06-01'
                },
                {
                    title: 'Workshop de Educação Financeira',
                    start: '2024-07-15'
                },
                // Adicione mais eventos conforme necessário
            ]
        });
        calendar.render();
    }

    // Jogo Financeiro
    const challenges = document.querySelectorAll('#game-challenges input');
    const userLevel = document.getElementById('user-level');
    const userPoints = document.getElementById('user-points');
    const progressBar = document.querySelector('.progress');

    let points = 0;
    let level = 1;

    function updateProgress() {
        userPoints.textContent = points;
        userLevel.textContent = level;
        const progress = (points % 100) / 100 * 100;
        progressBar.style.width = `${progress}%`;
    }

    challenges.forEach(challenge => {
        challenge.addEventListener('change', () => {
            if (challenge.checked) {
                points += 10;
                if (points >= 100) {
                    level++;
                    points -= 100;
                }
                updateProgress();
            } else {
                points -= 10;
                updateProgress();
            }
        });
    });

    // Análise de Crédito
    const creditAnalysisForm = document.getElementById('credit-analysis-form');
    const creditAnalysisResult = document.getElementById('credit-analysis-result');

    if (creditAnalysisForm) {
        creditAnalysisForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const income = parseFloat(document.getElementById('monthly-income').value);
            const creditScore = parseInt(document.getElementById('credit-score').value);
            const existingDebts = parseFloat(document.getElementById('existing-debts').value);

            const debtToIncomeRatio = existingDebts / income;
            let creditStatus = '';
            let maxLoanAmount = 0;

            if (creditScore >= 700 && debtToIncomeRatio < 0.4) {
                creditStatus = 'Excelente';
                maxLoanAmount = income * 5;
            } else if (creditScore >= 600 && debtToIncomeRatio < 0.5) {
                creditStatus = 'Bom';
                maxLoanAmount = income * 3;
            } else if (creditScore >= 500 && debtToIncomeRatio < 0.6) {
                creditStatus = 'Regular';
                maxLoanAmount = income * 1.5;
            } else {
                creditStatus = 'Necessita Melhorias';
                maxLoanAmount = 0;
            }

            creditAnalysisResult.innerHTML = `
                <h3>Resultado da Análise</h3>
                <p>Status de Crédito: ${creditStatus}</p>
                <p>Valor Máximo de Empréstimo Estimado: R$ ${maxLoanAmount.toFixed(2)}</p>
                <p>Esta é uma análise preliminar. Para uma avaliação completa, entre em contato com nossos consultores.</p>
            `;
        });
    }

    // Programa de Indicação
    const getReferralCodeBtn = document.getElementById('get-referral-code');
    if (getReferralCodeBtn) {
        getReferralCodeBtn.addEventListener('click', function() {
            // Aqui você implementaria a lógica para gerar ou recuperar o código de indicação
            const referralCode = 'ABC123'; // Exemplo
            alert(`Seu código de indicação é: ${referralCode}`);
        });
    }

    // Perfil de Investidor
    const investorQuiz = document.getElementById('investor-quiz');
    const submitInvestorQuizBtn = document.getElementById('submit-investor-quiz');
    const investorResult = document.getElementById('investor-result');

    const questions = [
        {
            question: "Qual é sua idade?",
            options: ["Menos de 30", "30-50", "Mais de 50"]
        },
        {
            question: "Qual é sua experiência com investimentos?",
            options: ["Nenhuma", "Alguma", "Muita"]
        },
        {
            question: "Como você reage a perdas no curto prazo?",
            options: ["Fico muito preocupado", "Fico um pouco preocupado", "Entendo que faz parte do processo"]
        },
        // Adicione mais perguntas conforme necessário
    ];

    function createQuiz() {
        questions.forEach((q, index) => {
            const questionElement = document.createElement('div');
            questionElement.classList.add('quiz-question');
            questionElement.innerHTML = `
                <h3>${q.question}</h3>
                ${q.options.map((option, i) => `
                    <label>
                        <input type="radio" name="q${index}" value="${i}">
                        ${option}
                    </label>
                `).join('')}
            `;
            investorQuiz.appendChild(questionElement);
        });
    }

    function calculateProfile() {
        let score = 0;
        questions.forEach((q, index) => {
            const selected = document.querySelector(`input[name="q${index}"]:checked`);
            if (selected) {
                score += parseInt(selected.value);
            }
        });

        if (score <= 3) {
            return "Conservador";
        } else if (score <= 6) {
            return "Moderado";
        } else {
            return "Arrojado";
        }
    }

    if (submitInvestorQuizBtn) {
        submitInvestorQuizBtn.addEventListener('click', () => {
            const profile = calculateProfile();
            investorResult.innerHTML = `
                <h3>Seu Perfil de Investidor: ${profile}</h3>
                <p>Com base em suas respostas, seu perfil de investidor é ${profile}. Isso significa que...</p>
                <!-- Adicione mais explicações sobre o perfil aqui -->
            `;
        });
    }

    createQuiz();

    // Chatbot
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
        // Implemente aqui a lógica do chatbot
        return "Desculpe, ainda estou aprendendo a responder a essa pergunta.";
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
        sendMessageBtn.
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

    // Adicionar funcionalidade de reconhecimento de voz ao chatbot
    const voiceInputBtn = document.getElementById('voice-input-btn');
    if (voiceInputBtn && 'webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'pt-BR';

        voiceInputBtn.addEventListener('click', () => {
            recognition.start();
            voiceInputBtn.classList.add('listening');
        });

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            chatbotInput.value = transcript;
            voiceInputBtn.classList.remove('listening');
        };

        recognition.onerror = (event) => {
            console.error('Erro no reconhecimento de voz:', event.error);
            voiceInputBtn.classList.remove('listening');
        };
    } else if (voiceInputBtn) {
        voiceInputBtn.style.display = 'none';
    }

    // Slider de Depoimentos
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

    // Animação de números
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    const numberElements = document.querySelectorAll('.animate-number');
    numberElements.forEach(el => {
        const target = parseInt(el.getAttribute('data-target'));
        animateValue(el, 0, target, 2000);
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Lazy Loading de imagens
    const images = document.querySelectorAll('img[data-src]');
    const config = {
        rootMargin: '0px 0px 50px 0px',
        threshold: 0
    };

    let observer = new IntersectionObserver((entries, self) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                preloadImage(entry.target);
                self.unobserve(entry.target);
            }
        });
    }, config);

    images.forEach(image => {
        observer.observe(image);
    });

    function preloadImage(img) {
        const src = img.getAttribute('data-src');
        if (!src) { return; }
        img.src = src;
    }

    // Validação de formulários
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });

    // Toggle de modo escuro
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });

        // Verificar preferência salva
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
    }

    // Notificações push (simulação)
    function requestNotificationPermission() {
        if ('Notification' in window) {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    console.log('Permissão de notificação concedida');
                    // Aqui você implementaria a lógica para enviar notificações
                }
            });
        }
    }

    const notificationBtn = document.getElementById('enable-notifications');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', requestNotificationPermission);
    }

    // Integração com API de cotações (simulação)
    function fetchExchangeRates() {
        // Simula uma chamada de API
        setTimeout(() => {
            const rates = {
                USD: 5.25,
                EUR: 6.20,
                GBP: 7.15
            };
            updateExchangeRates(rates);
        }, 1000);
    }

    function updateExchangeRates(rates) {
        const ratesContainer = document.getElementById('exchange-rates');
        if (ratesContainer) {
            ratesContainer.innerHTML = `
                <p>USD: R$ ${rates.USD.toFixed(2)}</p>
                <p>EUR: R$ ${rates.EUR.toFixed(2)}</p>
                <p>GBP: R$ ${rates.GBP.toFixed(2)}</p>
            `;
        }
    }

    fetchExchangeRates();

    // Gráfico de desempenho financeiro (usando Chart.js)
    const ctx = document.getElementById('financial-chart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                datasets: [{
                    label: 'Saldo',
                    data: [1000, 1500, 1300, 1700, 2000, 2500],
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // PWA - Service Worker Registration
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js').then(registration => {
                console.log('SW registered: ', registration);
            }).catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
        });
    }

    // Simulação de chat ao vivo
    const liveChatBtn = document.getElementById('live-chat-btn');
    const chatWindow = document.getElementById('chat-window');
    if (liveChatBtn && chatWindow) {
        liveChatBtn.addEventListener('click', () => {
            chatWindow.style.display = chatWindow.style.display === 'none' ? 'block' : 'none';
        });
    }

    // Feedback do usuário
    const feedbackForm = document.getElementById('feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Aqui você implementaria a lógica para enviar o feedback
            alert('Obrigado pelo seu feedback!');
            feedbackForm.reset();
        });
    }

    // Inicialização de tooltips (requer Bootstrap)
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });

});
