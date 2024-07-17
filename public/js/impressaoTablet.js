function imprimir() {
    let dataAtual = new Date();
    // var imagemPath = 'IMG/f89efb9f8d4234abb87fd14b7bb44068.png';
    let anoAtual = dataAtual.getFullYear();
    let diaAtual = dataAtual.getDate();
    let meses = [
      'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
      'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];
    let mesAtual = meses[dataAtual.getMonth()];
    let numeroDigital = document.getElementById('numeroCautela').value;
    let nomeDigital = document.getElementById('nome').value;
    let funcaoDigital = document.getElementById('funcao').value;
    let departamentoDigital = document.getElementById('departamento').value;
    let secretariaDigital = document.getElementById('secretaria').value;
    let emailDigital = document.getElementById('email').value;
    let valorSelecionado = "";

      // // Verifica qual input foi selecionado
      if (document.getElementById('retiradadeaparelhoechip').checked) {
        valorSelecionado = "Retirada de Aparelho e Chip";
      } else if (document.getElementById('retiradadeaparelho').checked) {
        valorSelecionado = "Retirada de Aparelho";
      } else if (document.getElementById('retiradadechip').checked) {
        valorSelecionado = "Retirada de Chip";
      } else if (document.getElementById('devolucaodeaparelhoechip').checked) {
        valorSelecionado = "Devolução de Aparelho e Chip";
      } else if (document.getElementById('devolucaodeaparelho').checked) {
        valorSelecionado = "Devolução de Aparelho";
      } else if (document.getElementById('devolucaodechip').checked) {
        valorSelecionado = "Devolução de Chip";
      } else {
        valorSelecionado = document.getElementById('outros').value;
      }
    let cautelaDigital = document.getElementById('tipoCautela').value;
    let patrimonioDigital = document.getElementById('patrimonio').value;
    let telefoneDigital = document.getElementById('numero').value;
    let matriculaDigital = document.getElementById('matricula').value;

    let conteudoHTML = `
    <html>
    <head>
      <title>Registro Oficial de Cautelas</title>
      <style>
        p { font-weight: arial; }
      </style>
    </head>
    <body>
      <p><strong> REGISTRO DE CAUTELA N°</strong> ${numeroDigital}</p>
      <p><strong>Recebedor:</strong> ${nomeDigital}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>Matrícula:</strong> ${matriculaDigital}</p>
      <p><strong>Secretaria:</strong> ${secretariaDigital}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>Departamento: </strong>${departamentoDigital}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Função: </strong>${funcaoDigital} </p>
      <p><strong>Email:</strong> ${emailDigital}</p>
      <p><strong>Discriminação:</strong> ${cautelaDigital}</p>
      <p><strong>Patrimonio/IMEI:</strong> ${patrimonioDigital}</p>
      <p><strong>Número do Chip ou N° de Série:</strong> ${telefoneDigital}</p>
      <p><strong>Objetivo da Cautela:</strong> ${valorSelecionado}</p>
      <p><strong>DECLARO</strong> que recebi o(s) equipamento(s) aqui descrito(s) e estar plenamente ciente da responsabilidade por mim assumida quanto ao recebimento e a utilização do(s) mesmo(s), bem como a não cessão ou transferência destes a terceiros.
        <br>
      Por fim, <strong>DECLARO</strong> estar ciente de que o descumprimento das obrigações por mim assumidas, poderão implicar na aplicação das penalidades previstas na legislação de regência, tanto no âmbito administrativo, cível e criminal</p>
      <p>Itajubá(MG), ${diaAtual} de ${mesAtual} de ${anoAtual}.</p>
      <p>Assinatura:__________________________________</p>
      <p>-----------------------------------------------------------------------------------------------------------------------------</p>
      <p><strong>rEGISTRO DE CAUTELA N°</strong> ${numeroDigital}</p>
      <p><strong>Recebedor:</strong> ${nomeDigital}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>Matrícula:</strong> ${matriculaDigital}</p>
      <p><strong>Secretaria:</strong> ${secretariaDigital}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>Departamento: </strong>${departamentoDigital}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Função: </strong>${funcaoDigital} </p>
      <p><strong>Email:</strong> ${emailDigital}</p>
      <p><strong>Discriminação:</strong> ${cautelaDigital}</p>
      <p><strong>Patrimonio/IMEI:</strong> ${patrimonioDigital}</p>
      <p><strong>Número do Chip ou N° de Série:</strong> ${telefoneDigital}</p>
      <p><strong>Objetivo da Cautela:</strong> ${valorSelecionado}</p>
      <p><strong>DECLARO</strong> que recebi o(s) equipamento(s) aqui descrito(s) e estar plenamente ciente da responsabilidade por mim assumida quanto ao recebimento e a utilização do(s) mesmo(s), bem como a não cessão ou transferência destes a terceiros.
        <br>
      Por fim, <strong>DECLARO</strong> estar ciente de que o descumprimento das obrigações por mim assumidas, poderão implicar na aplicação das penalidades previstas na legislação de regência, tanto no âmbito administrativo, cível e criminal</p>
      <p>Itajubá(MG), ${diaAtual} de ${mesAtual} de ${anoAtual}.</p>
      <p>Assinatura:__________________________________</p>
    </body>
    </html>
    `;

    let janelaImpressao = window.open('', '_blank');
    janelaImpressao.document.open();
    janelaImpressao.document.write(conteudoHTML);
    janelaImpressao.document.close();
    janelaImpressao.print();
    janelaImpressao.addEventListener('afterprint', function() {
      janelaImpressao.close();
    });
  }