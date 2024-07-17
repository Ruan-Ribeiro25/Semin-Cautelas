function searchCautela() {
  const searchValue = document.getElementById('searchInput').value.toLowerCase();
  const tableBody = document.getElementById('cautelasTableBody');
  const rows = tableBody.getElementsByTagName('tr');

  for (let i = 0; i < rows.length; i++) {
    const cautelaId = rows[i].getElementsByTagName('td')[0].textContent.toLowerCase();
    if (cautelaId.includes(searchValue)) {
      rows[i].style.display = '';
    } else {
      rows[i].style.display = 'none';
    }
  }
}
  
  // Capturar o evento de digitação no campo de pesquisa
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', () => {
    const termo = searchInput.value;
    pesquisarCautelas(termo);
  });
  
  function formatDate(date) {
    const formattedDate = new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    return formattedDate;
  }

  function fetchCautelas() {
    fetch('/cautelasTablet') // Faz a requisição para a rota do servidor
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
          <td class="retirada-aparelho-chip-column">${cautela.retiradadeaparelhoechip}</td>
          <td class="retirada-aparelho-column">${cautela.retiradadeaparelho}</td>
          <td class="retirada-chip-column">${cautela.retiradadechip}</td>
          <td class="devolucao-aparelho-chip-column">${cautela.devolucaodeaparelhoechip}</td>
          <td class="devolucao-aparelho-column">${cautela.devolucaodeaparelho}</td>
          <td class="devolucao-chip-column">${cautela.devolucaodechip}</td>
          <td class="outros-column">${cautela.outros}</td>
          <td class="tipo-cautela-column">${cautela.tipoCautela}</td>
          <td class="patrimonio-column">${cautela.patrimonio}</td>
          <td class="numero-chip-column">${cautela.numeroChip}</td>
          <td class="matricula-column">${cautela.matricula}</td>
          <td class="data-column">${cautela.dataa}</td>
          <td>
            <button onclick="openEditModal(${cautela.id})">Editar</button>
            <button onclick="deleteCautela(${cautela.id})">Excluir</button>
            <button class = 'btn-imprimir'  onclick="imprimirCautela(${index})">Imprimir</button>
          </td>
  
        `;
        tableBody.appendChild(row);
      });
    })
    .catch(error => console.error('Erro ao buscar dados:', error));
}

function openEditModal(id) {
  // Fazer uma requisição para buscar os detalhes da cautela específica
  fetch(`/cautelasTablet/${id}`)
    .then(response => response.json())
    .then(cautela => {
      const modal = document.getElementById('editModal');
      const nomeInput = document.getElementById('editNome');
      const funcaoInput = document.getElementById('editFuncao');
      const departamentoInput = document.getElementById('editdepartamento');
      const secretariaInput = document.getElementById('editsecretaria');
      const emailInput = document.getElementById('editemail');
      const retiradadeaparelhoechipInput = document.getElementById('retiradadeaparelhoechip');
      const retiradadeaparelhoInput = document.getElementById('retiradadeaparelho');
      const retiradadechipInput = document.getElementById('retiradadechip');
      const devolucaodeaparelhoechipInput = document.getElementById('devolucaodeaparelhoechip');
      const devolucaodeaparelhoInput = document.getElementById('devolucaodeaparelho');
      const devolucaodechipInput = document.getElementById('devolucaodechip');
      const outrosInput = document.getElementById('editoutros');
      const tipoCautelaInput = document.getElementById('edittipoCautela');
      const patrimonioInput = document.getElementById('editpatrimonio');
      const numeroInput = document.getElementById('editnumerochip');
      const matriculaInput = document.getElementById('editmatricula');

 
      nomeInput.value = cautela.nome;
      funcaoInput.value = cautela.funcao;
      departamentoInput.value = cautela.departamento;
      secretariaInput.value =  cautela.secretaria;
      emailInput.value = cautela.email;
      retiradadeaparelhoechipInput.value = cautela.retiradadeaparelhoechip;
      retiradadeaparelhoInput.value =  cautela.retiradadeaparelho;
      retiradadechipInput.value = cautela.retiradadechip ;
      devolucaodeaparelhoechipInput.value = cautela.devolucaodeaparelhoechip;
      devolucaodeaparelhoInput.value = cautela.devolucaodeaparelho;
      devolucaodechipInput.value = cautela.devolucaodechip ;
      outrosInput.value = cautela.outros;
      tipoCautelaInput.value = cautela.tipoCautela;
      patrimonioInput.value = cautela.patrimonio;
      numeroInput.value = cautela.numeroChip;
      matriculaInput.value = cautela.matricula;

  
      modal.onsubmit = e => {
        e.preventDefault();

        // Obter os valores atualizados dos campos do modal
        const updatedCautela = {
          nome: nomeInput.value,
          funcao: funcaoInput.value,
          departamento: departamentoInput.value,                                    
          secretaria: secretariaInput.value,                                         
          email: emailInput.value,                                                 
          retiradadeaparelhoechip: retiradadeaparelhoechipInput.checked ? "x" : "",       
          retiradadeaparelho: retiradadeaparelhoInput.checked  ? "x" : "",                                    
          retiradadechip: retiradadechipInput.checked  ? "x" : "",                             
          devolucaodeaparelhoechip: devolucaodeaparelhoechipInput.checked  ? "x" : "",              
          devolucaodeaparelho: devolucaodeaparelhoInput.checked  ? "x" : "",                   
          devolucaodechip: devolucaodechipInput.checked  ? "x" : "",                              
          outros: outrosInput.value,                                             
          tipoCautela: tipoCautelaInput.value,                                     
          patrimonio: patrimonioInput.value,                                         
          matricula: matriculaInput.value,             
          numeroChip: numeroInput.value,                                               
        };

        // Enviar uma requisição PUT para atualizar a cautela
        fetch(`/cautelasTablet/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedCautela),
        })
          .then(response => response.json())
          .then(updatedCautela => {
            // Atualizar os valores na tabela com os dados atualizados
            const row = document.getElementById(`cautelaRow-${id}`);
            row.getElementsByClassName('.nome-column').textContent = updatedCautela.nome;
            row.querySelector('.funcao-column').textContent = updatedCautela.funcao;
            row.querySelector('.departamento-column').textContent = updatedCautela.departamento;
            row.querySelector('.secretaria-column').textContent = updatedCautela.secretaria;
            row.querySelector('.email-column').textContent = updatedCautela.email;
            row.querySelector('.retirada-aparelho-chip-column').textContent = updatedCautela.retiradadeaparelhoechip;
            row.querySelector('.retirada-aparelho-column').textContent = updatedCautela.retiradadeaparelho;
            row.querySelector('.retirada-chip-column').textContent = updatedCautela.retiradadechip;
            row.querySelector('.devolucao-aparelho-chip-colum').textContent = updatedCautela.devolucaodeaparelhoechip;
            row.querySelector('.devolucao-aparelho-column').textContent = updatedCautela.devolucaodeaparelho;
            row.querySelector('.devolucao-chip-column').textContent = updatedCautela.devolucaodechip;
            row.querySelector('.outros-colum').textContent = updatedCautela.outros;
            row.querySelector('.tipo-cautela-column').textContent = updatedCautela.tipoCautela;
            row.querySelector('.patrimonio-column').textContent = updatedCautela.patrimonio;
            row.querySelector('.numero-chip-column').textContent = updatedCautela.numeroChip;
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
  const modal = document.getElementById('editModal');
  modal.style.display = 'none';
}

// Função para abrir o modal
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = 'block';
}

    function imprimirCautela(index) {
      fetch('/cautelasTablet') // Faz a requisição para a rota do servidor
        .then(response => response.json()) // Converte a resposta para JSON
        .then(cautelas => {
          const cautela = cautelas[index];
          
          
          const conteudoHTML = `
        <html>
          <head>
            <p><strong> REGISTRO DE CAUTELA N°</strong> ${cautela.numeroCautela}</p>
            <p><strong>Recebedor:</strong> ${cautela.nome}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>Matrícula:</strong> ${cautela.matricula}</p>
            <p><strong>Secretaria:</strong> ${cautela.secretaria}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>Departamento: </strong>${cautela.departamento}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Função: </strong>${cautela.funcao} </p>
            <p><strong>Email:</strong> ${cautela.email}</p>
            <p><strong>Discriminação:</strong> ${cautela.tipoCautela}</p>
            <p><strong>Patrimonio ou IMEI:</strong> ${cautela.patrimonio}</p>
            <p><strong>Número do Chip ou N° de Série:</strong> ${cautela.numeroChip}</p>
            <p>Retirada de Aparelho e Chip [ ${cautela.retiradadeaparelhoechip} ] &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Devolução de Aparelho e Chip [ ${cautela.retiradadeaparelho}] &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Retirada de Chip [ ${cautela.retiradadechip} ]</p>
            <p>Retirada de Aparelho [ ${cautela.retiradadeaparelho} ] &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Devolução de Aparelho [ ${cautela.devolucaodeaparelho} ] Devolução de Chip &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [ ${cautela.devolucaodechip}]</p>
            <p><strong>DECLARO</strong> que recebi o(s) equipamento(s) aqui descrito(s) e estar plenamente ciente da responsabilidade por mim assumida quanto ao recebimento e a utilização do(s) mesmo(s), bem como a não cessão ou transferência destes a terceiros.
            Por fim, <strong>DECLARO</strong> estar ciente de que o descumprimento das obrigações por mim assumidas, poderão implicar na aplicação das penalidades previstas na legislação de regência, tanto no âmbito administrativo, cível e criminal</p>
            <p>Data: ${cautela.dataa}</p>
            <p>Assinatura:__________________________________</p>
            <p>-----------------------------------------------------------------------------------------------------------------------------</p>
            <p><strong> REGISTRO DE CAUTELA N°</strong> ${cautela.numeroCautela}</p>
            <p><strong>Recebedor:</strong> ${cautela.nome}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
            <p><strong>Secretaria:</strong> ${cautela.secretaria}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>Departamento: </strong>${cautela.departamento}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Função: </strong>${cautela.funcao} </p>
            <p><strong>Email:</strong> ${cautela.email}</p>
            <p><strong>Discriminação:</strong> ${cautela.tipoCautela}</p>
            <p><strong>Patrimonio ou IMEI:</strong> ${cautela.patrimonio}</p>
            <p><strong>Número do Chip ou N° de Série:</strong> ${cautela.numeroChip}</p>
            <p>Retirada de Aparelho e Chip [ ${cautela.retiradadeaparelhoechip} ] &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Devolução de Aparelho e Chip [ ${cautela.retiradadeaparelho}] &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Retirada de Chip [ ${cautela.retiradadechip} ]</p>
            <p>Retirada de Aparelho [ ${cautela.retiradadeaparelho} ] &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Devolução de Aparelho [ ${cautela.devolucaodeaparelho} ] Devolução de Chip &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [ ${cautela.devolucaodechip}]</p>
            <p><strong>DECLARO</strong> que recebi o(s) equipamento(s) aqui descrito(s) e estar plenamente ciente da responsabilidade por mim assumida quanto ao recebimento e a utilização do(s) mesmo(s), bem como a não cessão ou transferência destes a terceiros.
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

    function deleteCautela(id) {
      if (confirm('Deseja excluir esta cautela?')) {
        fetch(`/cautelasTablet/${id}`, { method: 'DELETE' })
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