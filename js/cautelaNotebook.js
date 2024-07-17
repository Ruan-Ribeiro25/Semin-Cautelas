function searchCautela() {
  const searchValue = document.getElementById('searchInput').value.toLowerCase();
  const tableBody = document.getElementById('cautelasTableBody');
  const rows = tableBody.getElementsByTagName('tr');

  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].getElementsByTagName('td');
    let found = false;

    for (let j = 0; j < cells.length; j++) {
      const cellValue = cells[j].textContent.toLowerCase();
      if (cellValue.includes(searchValue)) {
        found = true;
        break;
      }
    }

    if (found) {
      rows[i].style.display = '';
    } else {
      rows[i].style.display = 'none';
    }
  }
}


function formatDate(date) {
  const formattedDate = new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return formattedDate;
}

function fetchCautelas() {
  fetch('/cautelasNotebook') // Faz a requisição para a rota do servidor
    .then(response => response.json()) // Converte a resposta para JSON
    .then(cautelas => {
      const tableBody = document.getElementById('cautelasTableBody');
      cautelas.forEach((cautela, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="id-column">${cautela.id}</td>
        <td class="nome-column">${cautela.nome}</td>
        <td class="funcao-column">${cautela.funcao}</td>
        <td class="departamento-column">${cautela.departamento}</td>
        <td class="secretaria-column">${cautela.secretaria}</td>
        <td class="email-column">${cautela.email}</td>
        <td class="retirada-notebbok-column">${cautela.retiradadenotebook}</td>
        <td class="devolucao-notebook-column">${cautela.devolucaodenotebook}</td>
        <td class="tipo-cautela-column">${cautela.tipoCautela}</td>
        <td class="patrimonio-column">${cautela.patrimonio}</td>
        <td class="matricula-column">${cautela.matricula}</td>
        <td class="data-column">${cautela.dataa}</td>
        <td>
        <button onclick="openEditModal(${cautela.id})">Editar</button>
        <button onclick="deleteCautela(${cautela.id})">Excluir</button>
        <button class = 'btn-imprimir'  onclick="imprimirCautela(${index})">Imprimir</button>
          
        </td>

      `;
      console.log(cautela.id);
      tableBody.appendChild(row);
    });
  })
  .catch(error => console.error('Erro ao buscar dados:', error));
}

function openEditModal(id) {
// Fazer uma requisição para buscar os detalhes da cautela específica
fetch(`/cautelasNotebook/${id}`)
  .then(response => response.json())
  .then(cautela => {
    const modal = document.getElementById('editModal');
    const nomeInput = document.getElementById('editNome');
    const funcaoInput = document.getElementById('editFuncao');
    const departamentoInput = document.getElementById('editdepartamento');
    const secretariaInput = document.getElementById('editsecretaria');
    const emailInput = document.getElementById('editemail');
    const retiradaInput = document.getElementById('editretiradadenotebook');
    const devolucaoInput = document.getElementById('editdevolucaodenotebook');
    const tipoCautelaInput = document.getElementById('edittipoCautela');
    const patrimonioInput = document.getElementById('editpatrimonio');
    const matriculaInput = document.getElementById('editmatricula');

    // idInput.value = cautela.id;
    nomeInput.value = cautela.nome;
    funcaoInput.value = cautela.funcao;
    departamentoInput.value = cautela.departamento;
    secretariaInput.value =  cautela.secretaria;
    emailInput.value = cautela.email;
    retiradaInput.value = cautela.retiradadenotebook;
    devolucaoInput.value = cautela.devolucaodenotebook;
    tipoCautelaInput.value = cautela.tipoCautela;
    patrimonioInput.value = cautela.patrimonio;
    matriculaInput.value = cautela.matricula;


    modal.onsubmit = e => {
      e.preventDefault();

      // Obter os valores atualizados dos campos do modal
      const updatedCautela = {
        // id: idInput.value,
        nome: nomeInput.value,
        funcao: funcaoInput.value,
        departamento: departamentoInput.value,                                    
        secretaria: secretariaInput.value,                                         
        email: emailInput.value,                                                 
        retiradadenotebook: retiradaInput.checked ? "x" : "",       
        devolucaodenotebook: devolucaoInput.checked  ? "x" : "",                                                                                                              
        tipoCautela: tipoCautelaInput.value,                                     
        patrimonio: patrimonioInput.value,                                         
        matricula: matriculaInput.value,                                                           
      };

      // Enviar uma requisição PUT para atualizar a cautela
      fetch(`/cautelasNotebook/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCautela),
      })
        .then(response => response.json())
        .then(updatedCautela => {
          // Atualizar os valores na tabela com os dados atualizados
          const row = document.querySelector(`.id-column${id}`);

          row.querySelector('.nome-column').textContent = updatedCautela.nome;
          row.querySelector('.funcao-column').textContent = updatedCautela.funcao;
          row.querySelector('.departamento-column').textContent = updatedCautela.departamento;
          row.querySelector('.secretaria-column').textContent = updatedCautela.secretaria;
          row.querySelector('.email-column').textContent = updatedCautela.email;
          row.querySelector('.retirada-notebbok-column').textContent = updatedCautela.retiradadenotebook;
          row.querySelector('.devolucao-notebook-column').textContent = updatedCautela.devolucaodenotebook;
          row.querySelector('.tipo-cautela-column').textContent = updatedCautela.tipoCautela;
          row.querySelector('.patrimonio-column').textContent = updatedCautela.patrimonio;
          row.querySelector('.matricula-column').textContent = updatedCautela.matricula;
          
          // Fechar o modal
          closeModal('editModal');
        })
        .catch(error => console.error('Erro ao atualizar a cautela:', error));
    };

    // Abrir o modal
    openModal('editModal');
  })
  .catch(error => console.error('Erro ao buscar detalhes da cautela:', error));
}

// Função para fechar o modal
function closeModal(modalId) {
const modal = document.getElementById(modalId);
modal.style.display = 'none';
}

// Função para abrir o modal
function openModal(modalId) {
const modal = document.getElementById(modalId);
modal.style.display = 'block';
}

function deleteCautela(id) {
  if (confirm('Deseja excluir esta cautela?')) {
    fetch(`/cautelasNotebook/${id}`, { method: 'DELETE' })
      .then(response => {
        if (response.status === 204) {
          // Remover a linha da tabela correspondente à cautela excluída
          // const row = document.getElementById('cautelaRow-${id}');
          row.remove();
        } else {
          console.error('Erro ao excluir a cautela:', response.statusText);
        }
      })
      .catch(error => console.error('Erro ao excluir a cautela:', error));
  }
}

function imprimirCautela(index) {
  fetch('/cautelasNotebook') // Faz a requisição para a rota do servidor
    .then(response => response.json()) // Converte a resposta para JSON
    .then(cautelas => {
      const cautela = cautelas[index];
      
      
      const conteudoHTML = `
       <html>
        <head>
          <title>Registro Oficial de Cautelas</title>
          <style>
            p { font-weight: arial; }
          </style>
        </head>
        <body>
          <p><strong> REGISTRO DE CAUTELA N°</strong> ${cautela.numeroCautela}</p>
          <p><strong>Recebedor:</strong> ${cautela.nome}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>Matrícula:</strong> ${cautela.matricula}</p>
          <p><strong>Secretaria:</strong> ${cautela.secretaria}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>Departamento: </strong>${cautela.departamento}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Função: </strong>${cautela.funcao} </p>
          <p><strong>Email:</strong> ${cautela.email}</p>
          <p><strong>Discriminação:</strong> ${cautela.tipoCautela}</p>
          <p><strong>Patrimonio: </strong> ${cautela.patrimonio}</p>
          <p>Objetivo da Cautela: <p>
          <br>
          <p>Retirada de Aparelho [ ${cautela.retiradadenotebook} ] &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Devolução de Aparelho [ ${cautela.devolucaodenotebook} ]</p>
          <p><strong>DECLARO</strong> que recebi o(s) equipamento(s) aqui descrito(s) e estar plenamente ciente da responsabilidade por mim assumida quanto ao recebimento e a utilização do(s) mesmo(s), bem como a não cessão ou transferência destes a terceiros.
            <br>
          Por fim, <strong>DECLARO</strong> estar ciente de que o descumprimento das obrigações por mim assumidas, poderão implicar na aplicação das penalidades previstas na legislação de regência, tanto no âmbito administrativo, cível e criminal</p>
          <p>Itajubá(MG), ${cautela.dataa}.</p>
          <p>Assinatura:__________________________________</p>
          <p>-----------------------------------------------------------------------------------------------------------------------------</p>
          <p><strong>REGISTRO DE CAUTELA N°</strong> ${cautela.numeroCautela}</p>
          <p><strong>Recebedor:</strong> ${cautela.nome}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>Matrícula:</strong> ${cautela.matricula}</p>
          <p><strong>Secretaria:</strong> ${cautela.secretaria}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>Departamento: </strong>${cautela.departamento}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Função: </strong>${cautela.funcao} </p>
          <p><strong>Email:</strong> ${cautela.email}</p>
          <p><strong>Discriminação:</strong> ${cautela.tipoCautela}</p>
          <p><strong>Patrimonio/IMEI:</strong> ${cautela.patrimonio}</p>
          <p>Objetivo da Cautela: <p>
          <br>
          <p>Retirada de Aparelho [ ${cautela.retiradadenotebook} ] &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Devolução de Aparelho [ ${cautela.devolucaodenotebook} ]</p>
          <p><strong>DECLARO</strong> que recebi o(s) equipamento(s) aqui descrito(s) e estar plenamente ciente da responsabilidade por mim assumida quanto ao recebimento e a utilização do(s) mesmo(s), bem como a não cessão ou transferência destes a terceiros.
            <br>
          Por fim, <strong>DECLARO</strong> estar ciente de que o descumprimento das obrigações por mim assumidas, poderão implicar na aplicação das penalidades previstas na legislação de regência, tanto no âmbito administrativo, cível e criminal</p>
          <p>Itajubá(MG), ${cautela.dataa}.</p>
          <p>Assinatura:__________________________________</p>
        </body>
        </html>
      `;
      const janelaImpressao = window.open('', '_blank');
      janelaImpressao.document.open();
      janelaImpressao.document.write(conteudoHTML);
      janelaImpressao.document.close();
      janelaImpressao.print();
      janelaImpressao.addEventListener('afterprint', function() {
        janelaImpressao.close();
      });
    })
    .catch(error => console.error('Erro ao buscar dados:', error));
}

// Chama a função fetchCautelas ao carregar a página
fetchCautelas();
