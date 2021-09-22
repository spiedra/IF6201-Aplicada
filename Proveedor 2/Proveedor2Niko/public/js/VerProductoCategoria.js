function ponerInfoProductEnModal(boton) {
    var data = {
        'ID_CATEGORIA': boton.id
    };
    resultadoCat = document.getElementById("resultadoCategoria");
    resultadoCat.innerHTML="Resultado para "+"'"+boton.name+"'";
    contador = 0;
    $("#tableProductosCat").find("tr:gt(0)").remove();
    tablaCategorias = $("#tableProductosCat");
    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        url: '/Categorias/Articulos/mostrar',
        data: data,
        type: "GET",
        beforeSend: function () {
            $('.loader2').show();
        },
        complete: function () {
            $('.loader2').hide();
        },
        success: function (msg) {
            $.each(msg, function (i, value) {
                tablaCategorias.append(

                    "<tr>" +
                    " <td>" + value['ID_PRODUCTO'] + "</th>" +
                    "   <td>" + value['NOMBRE_PRODUCTO'] + "</td>" +
                    "<td>" + value['PRECIO'] + "</td>" +
                    "<td> <img src='/img/" + value['RUTA_IMAGEN'] + "' alt='' height='60px' width='60px'> </td>" +
                    "<td>" + value['RUTA_IMAGEN'] + "</td>" +
                    "<td>" + value['STOCK'] + "</td>" +
                    "</tr>"
                );
                contador++;
            });
            if (contador == 0) {
                div = document.querySelector(".mensaje");
                var html_text = "<div class='alert alert-danger' role='alert'>" + 'No se han encontrado productos' + "</div>";
                div.innerHTML = html_text;
            } else {
                div = document.querySelector(".mensaje");
                var html_text = "<div class='alert alert-success' role='alert'>" + 'Se han encontrado ' + contador + ' productos.' + "</div>";
                div.innerHTML = html_text;
            }
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}

function modificarModal(accion){
    var fila = accion.parentNode.parentNode;
    id_cat = fila.cells[0].innerText;
    nombre_cat = fila.cells[1].innerText;

    $("#nombre_catA").val(nombre_cat);
    $("#id_categoriaup").val(id_cat);

}
