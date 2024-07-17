function allowOnlyOneTestandoCheckbox() {
  const testandoCheckboxes = document.querySelectorAll('.testando');

  testandoCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('click', function() {
      testandoCheckboxes.forEach(otherCheckbox => {
        if (otherCheckbox !== checkbox) {
          otherCheckbox.checked = false;
        }
      });
    });
  });
}

allowOnlyOneTestandoCheckbox();