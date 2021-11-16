const createModalResponse = (response) => {
    $('#modalResponse').remove();
    $('#pageMain').append($('<div class="modal fade" id="modalResponse" tabindex="-1" aria-labelledby="modalResponse" aria-hidden="true">')
        .append($('<div class="modal-dialog">')
            .append($('<div  class="modal-content">')
                .append($('<div class="modal-header">')
                    .append($('<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>')))
                .append($('<div class="modal-body">').append('<p class="h6">' + response + '</p>'))
                .append($('<div class="modal-footer">').append('<button type="button" class="btn btn-primary" data-bs-dismiss="modal">Aceptar</button>'))))
    )
    $('#modalResponse').modal("show");
};