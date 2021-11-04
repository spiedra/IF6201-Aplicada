function agregarACarrito() {
    var idProducto = $('#idProducto').val();
    var cantidad = $('#cantidad').val();
    var precio = $('#precio').val();

    var parametros = {
        "idProducto": idProducto
        , "cantidad": cantidad
        , "precio": precio
    };
    $('#respuesta').empty();
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
            alert(response);
            //$('#respuesta').val("Error de conexión con el servidor");
        }
    });

}
