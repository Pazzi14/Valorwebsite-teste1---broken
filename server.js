const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Servir arquivos estáticos da pasta raiz
app.use(express.static(path.join(__dirname)));

// Rota para a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para as páginas na pasta 'pages'
app.get('/pages/:page', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', `${req.params.page}.html`));
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
