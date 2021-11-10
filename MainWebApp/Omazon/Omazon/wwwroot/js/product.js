const putProductOnEditModal = (buttonContext) => {
    row = buttonContext.parentNode.parentNode;

    $("#inputIdProduct").val(row.cells[0].textContent);
    $("#inputName").val(row.cells[1].textContent);
    $("#inputStock").val(row.cells[2].textContent);
    $("#inputPrice").val(row.cells[3].textContent);
};


const putProductOnDeleteModal = (buttonContext) => {
    row = buttonContext.parentNode.parentNode;

    $("#inputIdProduct1").val(row.cells[0].textContent);
    $("#inputName1").val(row.cells[1].textContent);
  
};

