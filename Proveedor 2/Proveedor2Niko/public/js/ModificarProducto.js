function ponerInfoProductEnModal(accion) {
    var fila = accion.parentNode.parentNode;
    id_articulo = fila.cells[0].innerText;
    nombre = fila.cells[1].innerText;
    precio = fila.cells[2].innerText;
    imagen = fila.cells[4].innerText;
    stock = fila.cells[5].innerText;
    categoria = fila.cells[6].innerText;
    $("#nombreEA").val(nombre);
    $("#nombreE").val(nombre);
    $("#precioE").val(precio);
    $("#imagenEA").val(imagen);
    $("#stockE").val(stock);
    $("#categoriaE").val(categoria);
}

function confirmacionModal(tabla) {
    var fila = tabla.parentNode.parentNode;
    id_articulo = fila.cells[0].innerText;
    $("#id_articulo ").val(id_articulo);

   

}

function EliminarArticulo(id_articulo) {
   

    var data={'ID_PRODUCTO':id_articulo};

    $.ajax({
       headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
        url:'/articulos/eliminarArticulo',
        data: data,
        type:"POST",
        
        success: function (msg) {
            window.location.href = '/Productos/gestionar';
    }
    });

}
