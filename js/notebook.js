window.addEventListener('DOMContentLoaded', () => {
    const numeroCautelaInput = document.getElementById('numeroCautela');
    const anoAtualElement = document.getElementById('anoAtual');
  
    fetch('/proximoNumero')
      .then(response => response.json())
      .then(data => {
        const proximoNumeroCautela = data.proximoNumeroCautela;
        const anoAtual = data.anoAtual;
  
        const numeroCautelaFormatado = `${proximoNumeroCautela}/${anoAtual}`;
        numeroCautelaInput.value = numeroCautelaFormatado;
      })
      .catch(error => console.error('Erro ao obter o próximo número de cautela:', error));
  });
  
