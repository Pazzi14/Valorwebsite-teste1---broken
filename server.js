const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Rota para processar simulações de empréstimo
app.post('/api/simulate-loan', (req, res) => {
  const { loanType, amount, term } = req.body;
  // Lógica para calcular o empréstimo
  // ...
  res.json({ /* resultados da simulação */ });
});

// Rota para processar formulários de contato
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  // Lógica para salvar a mensagem ou enviar e-mail
  // ...
  res.json({ success: true, message: 'Mensagem recebida com sucesso' });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
