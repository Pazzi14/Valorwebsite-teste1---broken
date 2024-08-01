:root {
    --primary-color: #00a859;
    --secondary-color: #6c757d;
    --success-color: #28a745;
    --danger-color: #dc3545;
    --warning-color: #ffc107;
    --info-color: #17a2b8;
    --light-color: #f8f9fa;
    --dark-color: #343a40;
    --font-family: 'Roboto', sans-serif;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: var(--font-family);
    line-height: 1.6;
    color: var(--dark-color);
}

.container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
}

header {
    background-color: white;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
}

.logo img {
    height: 50px;
}

nav ul {
    display: flex;
    list-style-type: none;
}

nav ul li {
    margin-left: 20px;
}

nav ul li a {
    color: var(--dark-color);
    text-decoration: none;
    font-weight: bold;
}

.hero-section {
    background-image: url('https://valorfinanciamentos.com.br/wp-content/uploads/2023/09/banner-home-valor-financiamentos.jpg');
    background-size: cover;
    background-position: center;
    height: 100vh;
    display: flex;
    align-items: center;
    text-align: center;
    color: white;
}

.hero-section h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.cta-button {
    display: inline-block;
    padding: 10px 20px;
    background-color: var(--primary-color);
    color: white;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

.cta-button:hover {
    background-color: #008c4a;
}

.services-section,
.about-section,
.testimonials-section,
.faq-section,
.contact-section {
    padding: 4rem 0;
}

.service-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
}

.service-item {
    background-color: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    text-align: center;
}

.service-item i {
    font-size: 3rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
}

.testimonial-slider {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    gap: 2rem;
    padding: 1rem 0;
}

.testimonial-item {
    flex: 0 0 300px;
    scroll-snap-align: start;
    background-color: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.faq-item {
    margin-bottom: 1rem;
}

.faq-question {
    background-color: var(--light-color);
    padding: 1rem;
    cursor: pointer;
    border-radius: 5px;
}

.faq-answer {
    padding: 1rem;
    display: none;
}

#contact-form {
    max-width: 500px;
    margin: 0 auto;
}

.input-group {
    margin-bottom: 1rem;
}

.input-group label {
    display: block;
    margin-bottom: 0.5rem;
}

.input-group input,
.input-group textarea,
.input-group select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
}

footer {
    background-color: var(--dark-color);
    color: white;
    padding: 2rem 0;
}

.footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
}

.footer-section h3 {
    margin-bottom: 1rem;
    color: var(--primary-color);
}

.footer-section a {
    color: white;
    text-decoration: none;
    display: block;
    margin-bottom: 0.5rem;
}

.copyright {
    text-align: center;
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255,255,255,0.1);
}

.chatbot-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 300px;
    height: 400px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    display: none;
    flex-direction: column;
    overflow: hidden;
}

#chatbot-header {
    background-color: var(--primary-color);
    color: white;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#chatbot-messages {
    flex-grow: 1;
    overflow-y: auto;
    padding: 10px;
}

#chatbot-input-container {
    display: flex;
    padding: 10px;
}

#chatbot-input {
    flex-grow: 1;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

#send-message {
    margin-left: 10px;
    padding: 5px 10px;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.open-chatbot-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px 20px;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.loan-simulator-section {
    background-color: #f9f9f9;
    padding: 4rem 0;
}

#loan-form {
    max-width: 500px;
    margin: 0 auto;
    background-color: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

#loan-result {
    margin-top: 2rem;
    padding: 1rem;
    background-color: var(--light-color);
    border-radius: 5px;
}

@media (max-width: 768px) {
    nav {
        flex-direction: column;
    }

    nav ul {
        margin-top: 1rem;
    }

    .hero-section h1 {
        font-size: 2rem;
    }

    .service-grid,
    .footer-content {
        grid-template-columns: 1fr;
    }

    .chatbot-container {
        width: 100%;
        height: 50vh;
        bottom: 0;
        right: 0;
    }
}
