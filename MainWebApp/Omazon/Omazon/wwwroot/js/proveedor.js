const putRequestOnCheckModal = (buttonContext) => {
    row = buttonContext.parentNode.parentNode;

    $("#inRequestId").val(row.cells[0].textContent);
    $("#inKey").val(row.cells[1].textContent);
    $("#inDetails").val(row.cells[2].textContent);
    $("#inState").val(row.cells[3].textContent);
};


const putRequestOnDeleteModal = (buttonContext) => {
    row = buttonContext.parentNode.parentNode;

    $("#RequestId").val(row.cells[0].textContent);
 

};
