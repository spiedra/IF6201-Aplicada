function agregarACarrito(idProducto) {
    var cantidad = $('#cantidad-'+idProducto).val();
    var precio = $('#precio-'+idProducto).val();

    var parametros = {
        "idProducto": idProducto
        , "cantidad": cantidad
        , "precio": precio
    };

    $.ajax({
        data: parametros,
        url: '/Usuario/AgregarProductoACarrito',
        type: 'post',
        beforeSend: function () {
            //$('#respuesta').text('Agregando...');
        },
        success: function (response) {
            
            alert(response);
        },
        error: function () {
            createModalResponse(response);
            //$('#respuesta').val("Error de conexión con el servidor");
        }
    });

}

function eliminarDeCarrito(idProducto) {
    $('#row-' + idProducto).remove();
    var parametros = {
        "idProducto": idProducto
    };
    $.ajax({
        data: parametros,
        url: '/Usuario/EliminarProductoCarrito',
        type: 'post',
        beforeSend: function () {
            //$('#respuesta').text('Agregando...');
        },
        success: function (response) {

        },
        error: function () {
            createModalResponse(response);
            //$('#respuesta').val("Error de conexión con el servidor");
        }
    });

}
