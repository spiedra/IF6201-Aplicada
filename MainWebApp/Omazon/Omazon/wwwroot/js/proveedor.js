const putRequestOnCheckModal = (buttonContext) => {
    row = buttonContext.parentNode.parentNode;

    $("#inRequestId").val(row.cells[0].textContent);
};


const putRequestOnDeleteModal = (buttonContext) => {
    row = buttonContext.parentNode.parentNode;

    $("#RequestId").val(row.cells[0].textContent);
 

};
