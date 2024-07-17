

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
  const formattedDate = new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  return formattedDate;
}

function fetchCautelas() {
  fetch('/cautelasCelulares') // Faz a requisição para a rota do servidor
    .then(response => response.json()) // Converte a resposta para JSON
    .then(cautelas => {
      const tableBody = document.getElementById('cautelasTableBody');
      cautelas.forEach((cautela, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${cautela.numeroCautela}</td>
          <td>${cautela.nome}</td>
          <td>${cautela.funcao}</td>
          <td>${cautela.departamento}</td>
          <td>${cautela.secretaria}</td>
          <td>${cautela.email}</td>
          <td>${cautela.retiradadeaparelhoechip}</td>
          <td>${cautela.retiradadeaparelho}</td>
          <td>${cautela.retiradadechip}</td>
          <td>${cautela.devolucaodeaparelhoechip}</td>
          <td>${cautela.devolucaodeaparelho}</td>
          <td>${cautela.devolucaodechip}</td>
          <td>${cautela.outros}</td>
          <td>${cautela.tipoCautela}</td>
          <td>${cautela.patrimonio}</td>
          <td>${cautela.numeroChip}</td>
          <td>${cautela.matricula}</td>
          <td>${cautela.dataa}</td>
          <td>
          <button onclick="openEditModal(${cautela.id})">Editar</button>
            <button class = 'btn-imprimir' onclick="imprimirCautela(${index})">Imprimir</button>
            <button class = 'btn-excluir'onclick="deleteCautela(${cautela.id})">Excluir</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch(error => console.error('Erro ao buscar dados:', error));
}

function deleteCautela(id) {
  if (confirm('Deseja excluir esta cautela?')) {
    fetch(`/cautelasCelulares/${id}`, { method: 'DELETE' })
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
  fetch('/cautelasCelulares') // Faz a requisição para a rota do servidor
    .then(response => response.json()) // Converte a resposta para JSON
    .then(cautelas => {
      const cautela = cautelas[index];

      const conteudoHTML = `
        <html>
          <head>
            <p><strong> REGISTRO DE CAUTELA N°</strong> ${cautela.numeroCautela}</p>
            <p><strong>Recebedor:</strong> ${cautela.nome}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>Matrícula:</strong> ${matriculaDigital}</p>
            <p><strong>Secretaria:</strong> ${cautela.secretaria}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>Departamento: </strong>${cautela.departamento}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Função: </strong>${cautela.funcao} </p>
            <p><strong>Email:</strong> ${cautela.email}</p>
            <p><strong>Discriminação:</strong> ${cautela.tipoCautela}</p>
            <p><strong>Patrimonio ou IMEI:</strong> ${cautela.patrimonio}</p>
            <p><strong>Número do Chip ou N° de Série:</strong> ${cautela.numeroChip}</p>
            <p>Retirada de Aparelho e Chip [ ${cautela.retiradadeaparelhoechip} ] &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Devolução de Aparelho e Chip [ ${cautela.retiradadeaparelho}] </p>
            <p>Retirada de Aparelho [ ${cautela.retiradadeaparelho} ] &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Devolução de Aparelho [ ${cautela.devolucaodeaparelho} ]</p>
            <p>Retirada de Chip [ ${cautela.retiradadechip} ] &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Devolução de Chip [ ${cautela.devolucaodechip}]</p>
            <p><strong>DECLARO</strong> que recebi o(s) equipamento(s) aqui descrito(s) e estar plenamente ciente da responsabilidade por mim assumida quanto ao recebimento e a utilização do(s) mesmo(s), bem como a não cessão ou transferência destes a terceiros.
              <br>
            Por fim, <strong>DECLARO</strong> estar ciente de que o descumprimento das obrigações por mim assumidas, poderão implicar na aplicação das penalidades previstas na legislação de regência, tanto no âmbito administrativo, cível e criminal</p>
            <p>Data: ${cautela.dataa}</p>
            <p>Assinatura:__________________________________</p>
            <p>-----------------------------------------------------------------------------------------------------------------------------</p>
            <p><strong> REGISTRO DE CAUTELA N°</strong> ${cautela.numeroCautela}</p>
            <p><strong>Recebedor:</strong> ${cautela.nome}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>Matrícula:</strong> ${matriculaDigital}</p>
            <p><strong>Secretaria:</strong> ${cautela.secretaria}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>Departamento: </strong>${cautela.departamento}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Função: </strong>${cautela.funcao} </p>
            <p><strong>Email:</strong> ${cautela.email}</p>
            <p><strong>Discriminação:</strong> ${cautela.tipoCautela}</p>
            <p><strong>Patrimonio ou IMEI:</strong> ${cautela.patrimonio}</p>
            <p><strong>Número do Chip ou N° de Série:</strong> ${cautela.numeroChip}</p>
            <p>Retirada de Aparelho e Chip [ ${cautela.retiradadeaparelhoechip} ] &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Devolução de Aparelho e Chip [ ${cautela.retiradadeaparelho}] </p>
            <p>Retirada de Aparelho [ ${cautela.retiradadeaparelho} ] &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Devolução de Aparelho [ ${cautela.devolucaodeaparelho} ]</p>
            <p>Retirada de Chip [ ${cautela.retiradadechip} ] &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Devolução de Chip [ ${cautela.devolucaodechip}]</p>
            <p><strong>DECLARO</strong> que recebi o(s) equipamento(s) aqui descrito(s) e estar plenamente ciente da responsabilidade por mim assumida quanto ao recebimento e a utilização do(s) mesmo(s), bem como a não cessão ou transferência destes a terceiros.
              <br>
            Por fim, <strong>DECLARO</strong> estar ciente de que o descumprimento das obrigações por mim assumidas, poderão implicar na aplicação das penalidades previstas na legislação de regência, tanto no âmbito administrativo, cível e criminal</p>
            <p>Data: ${cautela.dataa}</p>
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
window.onload = fetchCautelas;
