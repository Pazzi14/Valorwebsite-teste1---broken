// Simulador de empréstimo rápido
const quickSimulatorForm = document.getElementById('quick-simulator-form');
if (quickSimulatorForm) {
    quickSimulatorForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const amount = parseFloat(document.getElementById('quick-loan-amount').value);
        const term = parseInt(document.getElementById('quick-loan-term').value);
        const rate = 0.0199; // 1.99% ao mês

        const monthlyPayment = (amount * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
        const totalPayment = monthlyPayment * term;
        const totalInterest = totalPayment - amount;

        document.getElementById('quick-simulation-result').innerHTML = `
            <h3>Resultado da Simulação Rápida</h3>
            <p>Pagamento Mensal: R$ ${monthlyPayment.toFixed(2)}</p>
            <p>Total a Pagar: R$ ${totalPayment.toFixed(2)}</p>
            <p>Total de Juros: R$ ${totalInterest.toFixed(2)}</p>
        `;
    });

    // Atualizar outputs dos sliders
    ['quick-loan-amount', 'quick-loan-term'].forEach(id => {
        const input = document.getElementById(id);
        const output = document.getElementById(`${id}-output`);
        input.addEventListener('input', function() {
            output.value = id === 'quick-loan-amount' ? `R$ ${this.value}` : `${this.value} meses`;
        });
    });
}

// Chatbot
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const chatMessages = document.getElementById('chat-messages');

if (chatForm) {
    chatForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const userMessage = userInput.value;
        
        chatMessages.innerHTML += `<p class="user-message">${userMessage}</p>`;
        
        const botResponse = await getBotResponse(userMessage);
        chatMessages.innerHTML += `<p class="bot-message">${botResponse}</p>`;
        
        userInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    });
}

async function getBotResponse(message) {
    // Simples sistema de resposta baseado em palavras-chave
    const responses = {
        "empréstimo": "Oferecemos diversos tipos de empréstimos. Qual é o seu interesse específico?",
        "taxa": "Nossas taxas variam de acordo com o tipo de empréstimo e seu perfil. Posso te ajudar a fazer uma simulação?",
        "documentos": "Para solicitar um empréstimo, geralmente precisamos de seu RG, CPF, comprovante de renda e comprovante de residência.",
        "default": "Desculpe, não entendi sua pergunta. Pode reformular ou escolher um tópico específico como empréstimos, taxas ou documentos necessários?"
    };

    for (let key in responses) {
        if (message.toLowerCase().includes(key)) {
            return responses[key];
        }
    }
    return responses["default"];
}

// Service Worker para PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registrado com sucesso:', registration.scope);
            })
            .catch(error => {
                console.log('Falha ao registrar o Service Worker:', error);
            });
    });
}

// Lazy loading para imagens
document.addEventListener("DOMContentLoaded", function() {
    let lazyImages = [].slice.call(document.querySelectorAll("img.lazy-image"));
    
    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy-image");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // Fallback para navegadores que não suportam IntersectionObserver
        lazyImages.forEach(function(lazyImage) {
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.classList.remove("lazy-image");
        });
// Função para carregar conteúdo dinamicamente
function loadContent(url, targetId) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(targetId).innerHTML = data;
        })
        .catch(error => console.error('Erro ao carregar conteúdo:', error));
}

// Exemplo de uso:
// loadContent('/api/noticias', 'noticias-container');

// Sistema de recompensas simplificado
let userPoints = 0;

function addPoints(amount) {
    userPoints += amount;
    updatePointsDisplay();
}

function updatePointsDisplay() {
    const pointsDisplay = document.getElementById('user-points');
    if (pointsDisplay) {
        pointsDisplay.textContent = userPoints;
    }
}

// Exemplo de uso:
// addPoints(100); // Adiciona 100 pontos ao usuário

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    updatePointsDisplay();
    // Outras inicializações podem ser adicionadas aqui
});
