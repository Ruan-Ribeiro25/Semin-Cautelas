const express = require('express');
const mysql = require('mysql2');
const moment = require('moment');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const { v4: uuidv4 } = require('uuid');
const { format } = require('date-fns');

const app = express();
const port = 3002;

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
  host: '10.1.0.52',
  user: 'root',
  password: '#pmiacessodb@',
  database: 'registrocautela'
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Servir arquivos estáticos na rota '/public'
app.use('/public', express.static(__dirname + '/public'));


app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/home.html');
});

app.set('view engine', 'ejs');

app.post('/inserirDadosCautela', (req, res) => {
  const dadosCautelaon = {
    numeroCautela: req.body.numeroCautela,
    nome: req.body.nome,
    nomeentregador: req.body.nomeentregador,
    funcao: req.body.funcao,
    departamento: req.body.departamento,
    secretaria: req.body.secretaria,
    email: req.body.email,
    retiradadeaparelhoechip: req.body.retiradadeaparelhoechip === 'retiradadeaparelhoechip' ? 'x' : '',
    retiradadeaparelho: req.body.retiradadeaparelho === 'retiradadeaparelho' ? 'x' : '',
    retiradadechip: req.body.retiradadechip === 'retiradadechip' ? 'x' : '',
    devolucaodeaparelhoechip: req.body.devolucaodeaparelhoechip  === 'devolucaodeaparelhoechip' ? 'x' : '',
    devolucaodeaparelho: req.body.devolucaodeaparelho === 'devolucaodeaparelho' ? 'x' : '',
    devolucaodechip: req.body.devolucaodechip === 'devolucaodechip' ? 'x' : '',
    outros: req.body.outros,
    tipoCautela: req.body.discriminacao,
    patrimonio: req.body.patrimonio,
    numeroChip: req.body.numeroChip,
    matricula: req.body.matricula,
    dataa: req.body.dataa,
  };
  connection.query('INSERT INTO cautelacelular SET ?', dadosCautelaon, (error, results) => {
    if (error) {
      console.error('Erro ao inserir dados: ', error);
      res.status(500).send('Erro ao inserir dados');
    } else {
      console.log('Dados inseridos com sucesso');
      res.sendFile(__dirname + '/public/home.html');
    }
  });
});


app.post('/inserirDadosTablet', (req, res) => {
  const dadosCautelaTwo = {
    numeroCautela: req.body.numeroCautela,
    nome: req.body.nome,
    nomeentregador: req.body.nomeentregador,
    funcao: req.body.funcao,
    departamento: req.body.departamento,
    secretaria: req.body.secretaria,
    email: req.body.email,
    retiradadeaparelhoechip: req.body.retiradadeaparelhoechip === 'retiradadeaparelhoechip' ? 'x' : '',
    retiradadeaparelho: req.body.retiradadeaparelho === 'retiradadeaparelho' ? 'x' : '',
    retiradadechip: req.body.retiradadechip === 'retiradadechip' ? 'x' : '',
    devolucaodeaparelhoechip: req.body.devolucaodeaparelhoechip  === 'devolucaodeaparelhoechip' ? 'x' : '',
    devolucaodeaparelho: req.body.devolucaodeaparelho === 'devolucaodeaparelho' ? 'x' : '',
    devolucaodechip: req.body.devolucaodechip === 'devolucaodechip' ? 'x' : '',
    outros: req.body.outros,
    tipoCautela: req.body.discriminacao,
    patrimonio: req.body.patrimonio,
    numeroChip: req.body.numeroChip,
    matricula: req.body.matricula,
    dataa: req.body.dataa,
  };
  connection.query('INSERT INTO cautelatablet SET ?', dadosCautelaTwo, (error, results) => {
    if (error) {
      console.error('Erro ao inserir dados: ', error);
      res.status(500).send('Erro ao inserir dados');
    } else {
      console.log('Dados inseridos com sucesso');
      res.sendFile(__dirname + '/public/home.html');
    }
  });
});

app.post('/inserirDadosNotebook', (req, res) => {
  const dadosCautelathree = {
    numeroCautela: req.body.numeroCautela,
    nome: req.body.nome,
    nomeentregador: req.body.nomeentregador,
    funcao: req.body.funcao,
    departamento: req.body.departamento,
    secretaria: req.body.secretaria,
    email: req.body.email,
    retiradadenotebook: req.body.retiradadenotebook === 'retirada' ? 'x' : '',
    devolucaodenotebook: req.body.devolucaodenotebook === 'devolucao' ? 'x' : '',
    tipoCautela: req.body.discriminacao,
    patrimonio: req.body.patrimonio,
    matricula: req.body.matricula,
    dataa: req.body.dataa,
  };
  connection.query('INSERT INTO cautelanotebook SET ?', dadosCautelathree, (error, results) => {
    if (error) {
      console.error('Erro ao inserir dados: ', error);
      res.status(500).send('Erro ao inserir dados');
    } else {
      console.log('Dados inseridos com sucesso');
      res.sendFile(__dirname + '/public/home.html');
    }
  });
});
app.post('/inserirDadosOutros', (req, res) => {
  const dadosCautelaFor = {
    numeroCautela: req.body.numeroCautela,
    nome: req.body.nome,
    nomeentregador: req.body.nomeentregador,
    funcao: req.body.funcao,
    departamento: req.body.departamento,
    secretaria: req.body.secretaria,
    email: req.body.email,
    retiradadeequipamento: req.body.	retiradadeequipamento === 'retirada' ? 'x' : '',
    devolucaodeequipamento: req.body.devolucaodeequipamento === 'devolucao' ? 'x' : '',
    discriminacao: req.body.discriminacao,
    patrimonio: req.body.patrimonio,
    matricula: req.body.matricula,
    dataa: req.body.dataa,
  };
  connection.query('INSERT INTO cautelaoutros SET ?', dadosCautelaFor, (error, results) => {
    if (error) {
      console.error('Erro ao inserir dados: ', error);
      res.status(500).send('Erro ao inserir dados');
    } else {
      console.log('Dados inseridos com sucesso');
      res.sendFile(__dirname + '/public/home.html');
    }
  });
});

app.get('/proximoNumeroCautela', (req, res) => {
  // Consulta para obter o número máximo atual de cautela
  const query = 'SELECT MAX(id)  AS count FROM cautelacelular';
  connection.query(query, (err, result) => {
    if (err) {
      console.error('Erro ao obter o número máximo de cautela: ' + err.stack);
      res.status(500).send('Erro ao obter o número máximo de cautela');
      return;
    }

    const count = result[0].count || 0; // Verificar se o resultado é nulo

    const proximoNumeroCautela = count + 1;

    // Obter o ano atual
    const anoAtual = new Date().getFullYear();

    res.json({ proximoNumeroCautela, anoAtual });
  });
});

app.get('/proximoNumero', (req, res) => {
  // Consulta para obter o número máximo atual de cautela
  const query = 'SELECT MAX(id)  AS count FROM cautelanotebook';
  connection.query(query, (err, result) => {
    if (err) {
      console.error('Erro ao obter o número máximo de cautela: ' + err.stack);
      res.status(500).send('Erro ao obter o número máximo de cautela');
      return;
    }

    const count = result[0].count || 0; // Verificar se o resultado é nulo

    const proximoNumeroCautela = count + 1;

    // Obter o ano atual
    const anoAtual = new Date().getFullYear();

    res.json({ proximoNumeroCautela, anoAtual });
  });
});

app.get('/proximo', (req, res) => {
  // Consulta para obter o número máximo atual de cautela
  const query = 'SELECT MAX(id)  AS count FROM cautelatablet';
  connection.query(query, (err, result) => {
    if (err) {
      console.error('Erro ao obter o número máximo de cautela: ' + err.stack);
      res.status(500).send('Erro ao obter o número máximo de cautela');
      return;
    }

    const count = result[0].count || 0; // Verificar se o resultado é nulo

    const proximoNumeroCautela = count + 1;

    // Obter o ano atual
    const anoAtual = new Date().getFullYear();

    res.json({ proximoNumeroCautela, anoAtual });
  });
});

app.get('/proximoOutros', (req, res) => {
  // Consulta para obter o número máximo atual de cautela
  const query = 'SELECT MAX(id)  AS count FROM cautelaoutros';
  connection.query(query, (err, result) => {
    if (err) {
      console.error('Erro ao obter o número máximo de cautela: ' + err.stack);
      res.status(500).send('Erro ao obter o número máximo de cautela');
      return;
    }

    const count = result[0].count || 0; // Verificar se o resultado é nulo

    const proximoNumeroCautela = count + 1;

    // Obter o ano atual
    const anoAtual = new Date().getFullYear();

    res.json({ proximoNumeroCautela, anoAtual });
  });
});

app.get('/cautelasCelulares', (req, res) => {
  connection.query('SELECT * FROM cautelacelular', (error, results) => {
    if (error) {
      console.error('Erro ao consultar dados: ', error);
      res.status(500).send('Erro ao consultar dados');
    } else {
      const cautelas = results.map(cautela => ({
        ...cautela,
        dataa: format(cautela.dataa, 'dd/MM/yyyy'), // Formata a data
      }));
      res.json(cautelas); // Retorna os dados como JSON
    }
  });
});

app.get('/cautelasTablet', (req, res) => {
  connection.query('SELECT * FROM cautelatablet', (error, results) => {
    if (error) {
      console.error('Erro ao consultar dados: ', error);
      res.status(500).send('Erro ao consultar dados');
    } else {
      const cautelas = results.map(cautela => ({
        ...cautela,
        dataa: format(cautela.dataa, 'dd/MM/yyyy'), // Formata a data
      }));
      res.json(cautelas); // Retorna os dados como JSON
    }
  });
});

app.get('/cautelasNotebook', (req, res) => {
  connection.query('SELECT * FROM cautelanotebook', (error, results) => {
    if (error) {
      console.error('Erro ao consultar dados: ', error);
      res.status(500).send('Erro ao consultar dados');
    } else {
      const cautelas = results.map(cautela => ({
        ...cautela,
        dataa: format(cautela.dataa, 'dd/MM/yyyy'), // Formata a data
      }));
      res.json(cautelas); // Retorna os dados como JSON
    }
  });
});

app.get('/cautelasOutros', (req, res) => {
  connection.query('SELECT * FROM cautelaoutros', (error, results) => {
    if (error) {
      console.error('Erro ao consultar dados: ', error);
      res.status(500).send('Erro ao consultar dados');
    } else {
      const cautelas = results.map(cautela => ({
        ...cautela,
        dataa: format(cautela.dataa, 'dd/MM/yyyy'), // Formata a data
      }));
      res.json(cautelas); // Retorna os dados como JSON
    }
  });
});

app.delete('/cautelasCelulares/:id', (req, res) => {
  const id = req.params.id; // Obtém o ID da cautela a ser excluída

  connection.query('DELETE FROM cautelacelular WHERE id = ?', [id], (error, results) => {
    if (error) {
      console.error('Erro ao excluir cautela: ', error);
      res.status(500).send('Erro ao excluir cautela');
    } else {
      res.sendStatus(200); // Retorna o status 200 para indicar sucesso na exclusão
    }
  });
});

app.delete('/cautelasNotebook/:id', (req, res) => {
  const id = req.params.id; // Obtém o ID da cautela a ser excluída

  connection.query('DELETE FROM cautelanotebook WHERE id = ?', [id], (error, results) => {
    if (error) {
      console.error('Erro ao excluir cautela: ', error);
      res.status(500).send('Erro ao excluir cautela');
    } else {
      res.sendStatus(200); // Retorna o status 200 para indicar sucesso na exclusão
    }
  });
});
 
app.delete('/cautelasTablet/:id', (req, res) => {
  const id = req.params.id; // Obtém o ID da cautela a ser excluída

  connection.query('DELETE FROM cautelatablet WHERE id = ?', [id], (error, results) => {
    if (error) {
      console.error('Erro ao excluir cautela: ', error);
      res.status(500).send('Erro ao excluir cautela');
    } else {
      res.sendStatus(200); // Retorna o status 200 para indicar sucesso na exclusão
    }
  });
});

app.delete('/cautelasOutros/:id', (req, res) => {
  const id = req.params.id; // Obtém o ID da cautela a ser excluída

  connection.query('DELETE FROM cautelaoutros WHERE id = ?', [id], (error, results) => {
    if (error) {
      console.error('Erro ao excluir cautela: ', error);
      res.status(500).send('Erro ao excluir cautela');
    } else {
      res.sendStatus(200); // Retorna o status 200 para indicar sucesso na exclusão
    }
  });
});

app.get('/cautelasCelulares/:id', (req, res) => {
  const cautelaId = req.params.id;
  const query = 'SELECT * FROM cautelacelular WHERE id = ?';
  connection.query(query, [cautelaId], (error, results) => {
    if (error) {
      console.error('Erro ao buscar a cautela:', error);
      res.status(500).json({ error: 'Erro ao buscar a cautela' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Cautela não encontrada' });
    } else {
      res.json(results[0]);
    }
  });
});
// Rota para atualizar uma cautela
app.put('/cautelasCelulares/:id', (req, res) => {
  const cautelaId = req.params.id;
  const updatedCautela = req.body;

  const query = 'UPDATE cautelacelular SET nome = ?, funcao = ?, departamento = ?, secretaria = ?, email = ?, retiradadeaparelhoechip = ?, retiradadeaparelho = ?, retiradadechip = ?, devolucaodeaparelhoechip = ?, devolucaodeaparelho = ?, devolucaodechip = ?, outros = ?, tipoCautela = ?, patrimonio = ?, numeroChip = ?, matricula = ? WHERE id = ?';
  const values = [
    updatedCautela.nome, 
    updatedCautela.funcao, 
    updatedCautela.departamento, 
    updatedCautela.secretaria ,
    updatedCautela.email, 
    updatedCautela.retiradadeaparelhoechip === "x" ? "x" : "", 
    updatedCautela.retiradadeaparelho === "x" ? "x" : "", 
    updatedCautela.retiradadechip === "x" ? "x" : "", 
    updatedCautela.devolucaodeaparelhoechip === "x" ? "x" : "", 
    updatedCautela.devolucaodeaparelho === "x" ? "x" : "", 
    updatedCautela.devolucaodechip === "x" ? "x" : "",
    updatedCautela.outros,
    updatedCautela.tipoCautela,
    updatedCautela.patrimonio,
    updatedCautela.numeroChip,
    updatedCautela.matricula,
    cautelaId];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Erro ao atualizar a cautela:', error);
      res.status(500).json({ error: 'Erro ao atualizar a cautela' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Cautela não encontrada' });
    } else {
      res.json(updatedCautela);
    }
  });
});

//cautela tablet
app.get('/cautelasTablet/:id', (req, res) => {
  const cautelaId = req.params.id;
  const query = 'SELECT * FROM cautelatablet WHERE id = ?';
  connection.query(query, [cautelaId], (error, results) => {
    if (error) {
      console.error('Erro ao buscar a cautela:', error);
      res.status(500).json({ error: 'Erro ao buscar a cautela' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Cautela não encontrada' });
    } else {
      res.json(results[0]);
    }
  });
});

//cautela tablet
app.put('/cautelasTablet/:id', (req, res) => {
  const cautelaId = req.params.id;
  const updatedCautela = req.body;

  const query = 'UPDATE cautelatablet SET nome = ?, funcao = ?, departamento = ?, secretaria = ?, email = ?, retiradadeaparelhoechip = ?, retiradadeaparelho = ?, retiradadechip = ?, devolucaodeaparelhoechip = ?, devolucaodeaparelho = ?, devolucaodechip = ?, outros = ?, tipoCautela = ?, patrimonio = ?, numeroChip = ?, matricula = ? WHERE id = ?';
  const values = [
    updatedCautela.nome, 
    updatedCautela.funcao, 
    updatedCautela.departamento, 
    updatedCautela.secretaria ,
    updatedCautela.email, 
    updatedCautela.retiradadeaparelhoechip === "x" ? "x" : "", 
    updatedCautela.retiradadeaparelho === "x" ? "x" : "", 
    updatedCautela.retiradadechip === "x" ? "x" : "", 
    updatedCautela.devolucaodeaparelhoechip === "x" ? "x" : "", 
    updatedCautela.devolucaodeaparelho === "x" ? "x" : "", 
    updatedCautela.devolucaodechip === "x" ? "x" : "",
    updatedCautela.outros,
    updatedCautela.tipoCautela,
    updatedCautela.patrimonio,
    updatedCautela.numeroChip,
    updatedCautela.matricula,
    cautelaId];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Erro ao atualizar a cautela:', error);
      res.status(500).json({ error: 'Erro ao atualizar a cautela' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Cautela não encontrada' });
    } else {
      res.json(updatedCautela);
    }
  });
});







app.get('/cautelasNotebook/:id', (req, res) => {
  const cautelaId = req.params.id;
  const query = 'SELECT * FROM cautelanotebook WHERE id = ?';
  connection.query(query, [cautelaId], (error, results) => {
    if (error) {
      console.error('Erro ao buscar a cautela:', error);
      res.status(500).json({ error: 'Erro ao buscar a cautela' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Cautela não encontrada' });
    } else {
      res.json(results[0]);
    }
  });
});


app.put('/cautelasNotebook/:id', (req, res) => {
  const cautelaId = req.params.id;
  const updatedCautela = req.body;

  const query = 'UPDATE cautelanotebook SET nome = ?, funcao = ?, departamento = ?, secretaria = ?, email = ?, retiradadenotebook = ?, devolucaodenotebook = ?, tipoCautela = ?, patrimonio = ?, matricula = ? WHERE id = ?';
  const values = [
    updatedCautela.nome, 
    updatedCautela.funcao, 
    updatedCautela.departamento, 
    updatedCautela.secretaria ,
    updatedCautela.email, 
    updatedCautela.retiradadenotebook === 'x' ? 'x' : '',
    updatedCautela.devolucaodenotebook === 'x' ? 'x' : '',
    updatedCautela.tipoCautela,
    updatedCautela.patrimonio,
    updatedCautela.matricula,
    cautelaId];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Erro ao atualizar a cautela:', error);
      res.status(500).json({ error: 'Erro ao atualizar a cautela' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Cautela não encontrada' });
    } else {
      res.json(updatedCautela);
    }
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
