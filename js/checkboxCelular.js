function allowOnlyOneCheckbox() {
    const checkboxes = document.querySelectorAll('.gender-input input[type="radio"]');
  
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('click', function() {
        checkboxes.forEach(otherCheckbox => {
          if (otherCheckbox !== checkbox) {
            otherCheckbox.checked = false;
          }
        });
      });
    });
  }
  
  function clearInputOnCheckboxClick(inputId) {
    const input = document.getElementById(inputId);
    const checkboxes = document.querySelectorAll('.gender-input input[type="radio"]');
  
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('click', function() {
        if (input.value && this.checked) {
          input.value = '';
        }
      });
    });
  }
  
  function clearInputOnType(inputId) {
    const input = document.getElementById(inputId);
    const checkboxes = document.querySelectorAll('.gender-input input[type="radio"]');
  
    input.addEventListener('input', function() {
      checkboxes.forEach(checkbox => {
        checkbox.checked = false;
      });
    });
  }
  
  function clearInputOnFocus(inputId) {
    const input = document.getElementById(inputId);
  
    input.addEventListener('focus', function() {
      if (this.value) {
        this.value = '';
      }
    });
  }
  
  // Chamar as funções ao carregar a página
  window.onload = function() {
    allowOnlyOneCheckbox();
    clearInputOnCheckboxClick('outros');
    clearInputOnType('outros');
    clearInputOnFocus('outros');
  };
