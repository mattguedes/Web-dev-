const express = require('express');
const axios = require('axios');
const sequelize = require('./config/database');
const Endereco = require('./models/Endereco');

const app = express();
const port = 3000;

const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/consulta-cep/:cep', async (req, res) => {
  const cep = req.params.cep;

  if (!cepRegex.test(cep)) {
    return res.status(400).send('CEP inválido');
  }

  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao fazer requisição:', error);
    res.status(500).send('Erro ao consultar o CEP');
  }
});

app.post('/salvar-endereco/:cep', async (req, res) => {
  const cep = req.params.cep;

  if (!cepRegex.test(cep)) {
    return res.status(400).send('CEP inválido');
  }

  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    const { logradouro, bairro, localidade, uf } = response.data;

    if (!logradouro || !bairro || !localidade || !uf) {
      return res.status(400).send('Dados insuficientes para salvar o endereço');
    }

    await Endereco.create({ cep, logradouro, bairro, localidade, uf });
    res.send('Endereço salvo com sucesso');
  } catch (error) {
    console.error('Erro ao fazer requisição ou salvar no banco:', error);
    res.status(500).send('Erro ao consultar e salvar o CEP');
  }
});

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
});
