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
    fetch("/cautelasOutros") // Faz a requisição para a rota do servidor
      .then((response) => response.json()) // Converte a resposta para JSON
      .then((cautelas) => {
        const tableBody = document.getElementById("cautelasTableBody");
        cautelas.forEach((cautela, index) => {
          const row = document.createElement("tr");
  
          row.innerHTML = `
   <td>${cautela.id}</td>
   <td>${cautela.nome}</td>
   <td>${cautela.funcao}</td>
   <td>${cautela.departamento}</td>
   <td>${cautela.secretaria}</td>
   <td>${cautela.email}</td>
   <td>${cautela.retiradadeequipamento}</td>
   <td>${cautela.devolucaodeequipamento}</td>
  
   <td>${cautela.discriminacao}</td>
   <td>${cautela.patrimonio}</td>
  
   <td>${cautela.matricula}</td>
   <td>${cautela.dataa}</td>
   <td>
      <button class = 'btn-imprimir'  onclick="imprimirCautela(${index})">Imprimir</button>
      <button class = 'btn-excluir' onclick="deleteCautela(${cautela.id})">Excluir</button>
   </td>
  `;
          tableBody.appendChild(row);
        });
      })
      .catch((error) => console.error("Erro ao buscar dados:", error));
  }
  
  function imprimirCautela(index) {
    fetch('/cautelasOutros') // Faz a requisição para a rota do servidor
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
              <h1>Dados da Cautela</h1>
              <p>Número da Cautela: ${cautela.numeroCautela}</p>
              <p>Nome: ${cautela.nome}</p>
              <p>Função: ${cautela.funcao}</p>
              <p>Departamento: ${cautela.departamento}</p>
              <p>Secretaria: ${cautela.secretaria}</p>
              <p>Email: ${cautela.email}</p>
              <p>Objetivo da Cautela: <p>
              <br>
              <p>Retirada de Aparelho [ ${cautela.retiradadeequipamento} ] &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Devolução de Aparelho [ ${cautela.devolucaodeequipamento} ]</p>
              <br>
              <p>Discriminação: ${cautela.discriminacao}</p>
              <p>Patrimônio: ${cautela.patrimonio}</p>
              <p>Data: ${cautela.dataa}</p>
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

  function deleteCautela(id) {
    if (confirm('Deseja excluir esta cautela?')) {
      fetch(`/cautelasOutros/${id}`, { method: 'DELETE' })
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
 
  // Chama a função fetchCautelas ao carregar a página
  window.onload = fetchCautelas;
  
