<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
@extends('Plantillas.Principal')

@section('cuerpo')

<div class="row">
    <div class="col col-md-3">
        <div class="input-group mt-3 p-3">
            <form action="/articulos/buscarArticulo" method="POST">
                @csrf
                <input id="busqueda" name="busqueda" type="search" class="form-control rounded" placeholder="Nombre" aria-label="Search" aria-describedby="search-addon" />
                <button type="submit" class="btn btn-outline-primary mt-">buscar</button>
                <a class="btn btn-success" href="/Productos/gestionar"> <i class="fas fa-sync"></i> </a>
            </form>
        </div>
    </div>
    <div class="col col-md-3">
        <button style="position: absolute;top: 72px; left:240px" data-bs-toggle="modal" data-bs-target="#modalRegistrar" type=" button" class="btn btn-primary">Agregar nuevo</button>
    </div>
</div>

<hr style="width: 27%; margin: 13px;">

<div class="modal" id="modalRegistrar" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Registrar un producto</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form action="/articulos/guardarArticulo" enctype="multipart/form-data" method="POST" class="mt-2 ml-2 p-3">

                    @csrf
                    <div class="form-group">
                        <label for="lblNombre">Nombre</label>
                        <input type="text" class="form-control" value="{{old('nombre')}}" name="nombre" id="nombre" placeholder="nombre del producto">

                        {!! $errors->first('nombre','<small style="color: red;">:message</small>') !!}

                    </div>
                    <div class="form-group mt-2">
                        <label for="itPrecio">Precio</label>
                        <input type="number" min="1" name="precio" value="{{old('precio')}}" class="form-control" id="precio" placeholder="precio">
                        {!! $errors->first('precio','<small style="color: red;">:message</small>') !!}
                    </div>
                    <div class="form-group mt-2">
                        <label for="itFile">Imagen</label>
                        <input type="file" id="imagen" value="{{old('imagen')}}" name="imagen">
                        {!! $errors->first('imagen','<small style="color: red;">:message</small>') !!}
                    </div>
                    <div class="form-group mt-2">
                        <label for="itStocl">Stock</label>
                        <input type="number" min="1" name="stock" value="{{old('stock')}}" class="form-control" id="stock" placeholder="disponibles">
                        {!! $errors->first('stock','<small style="color: red;">:message</small>') !!}
                    </div>
                    <div class="form-group mt-2">
                        <label for="sCategoria">Categoría</label>
                        <select id="categoria" name="categoria" value="{{old('categoria')}}" class="form-select" aria-label="Default select example">
                            <option>Seleccionar categoría</option>
                            @foreach($datos['categorias'] as $categoria)
                            <option>{{$categoria->NOMBRE_CATEGORIA}}</option>
                            @endforeach
                        </select>
                        {!! $errors->first('categoria','<small style="color: red;">:message</small>') !!}
                    </div>
                    <button type="submit" class="btn btn-primary mt-2">Agregar</button>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>

@if(session()->has('mensaje'))

@if (session()->get('mensaje')=="Ya existe un producto con ese nombre.")
<div class="alert alert-danger">
    {{ session()->get('mensaje') }}
</div>
@else

<div class="alert alert-success">
    {{ session()->get('mensaje') }}
</div>
@endif

@endif


@if (count ($datos['productos']))

<table id="table" class="table p-3 table-responsive">
    <th>
        ID
    </th>
    <th>
        Nombre
    </th>
    <th>
        Precio
    </th>
    <th>
        Imagen
    </th>
    <th>
        Ruta img
    </th>
    <th>
        Stock
    </th>
    <th>
        Categoria
    </th>

    <th>
        Acción
    </th>
    @foreach ($datos['productos'] as $producto)
    <tr>
        <td>
            {{$producto->ID_PRODUCTO}}
        </td>

        <td>
            {{$producto->NOMBRE_PRODUCTO}}
        </td>

        <td>
            {{$producto->PRECIO}}
        </td>

        <td>
            <img src="/img/{{$producto->RUTA_IMAGEN}}" alt="" height="60px" width="60px">
        </td>

        <td>
            {{$producto->RUTA_IMAGEN}}
        </td>

        <td>
            {{$producto->STOCK}}
        </td>

        <td>
            {{$producto->NOMBRE_CATEGORIA}}
        </td>

        <td>
            <button class="btn btn-primary" onclick="ponerInfoProductEnModal(this); return false;" data-bs-toggle="modal" data-bs-target="#modalEditar">
                <i class="fas fa-edit"></i>
            </button>

            <button class="btn btn-danger" onclick="confirmacionModal(this); return false;" data-bs-toggle="modal" data-bs-target="#modalConfirmar">
                <meta name="csrf-token" content="{{ csrf_token() }}">
                <i class="fas fa-trash-alt"></i>
            </button>
        </td>
    </tr>

    @endforeach
</table>

@else

<div class="alert alert-danger">
    No hay categorías
</div>

@endif

<div class="modal" id="modalEditar" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Editar un producto</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form action="/articulos/editarArticulo" enctype="multipart/form-data" method="POST" class="mt-2 ml-2 p-3">
                    @csrf
                    <div class="form-group">
                        <label for="lblNombre">Nombre actual</label>
                        <input readonly type="text" name="nombreEA" id="nombreEA">
                    </div>
                    <div class="form-group mt-2">
                        <label for="lblNombre">Nombre</label>
                        <input type="text" class="form-control" value="{{old('nombreE')}}" name="nombreE" id="nombreE" placeholder="nombre del producto">
                        {!! $errors->first('nombreE','<small style="color: red;">:message</small>') !!}
                    </div>
                    <div class="form-group mt-2">
                        <label for="itPrecio">Precio</label>
                        <input type="number" min="1" name="precioE" value="{{old('precioE')}}" class="form-control" id="precioE" placeholder="precio">
                        {!! $errors->first('precioE','<small style="color: red;">:message</small>') !!}
                    </div>
                    <div class="form-group mt-2">
                        <label for="itFile">Imagen actual</label>
                        <input readonly type="text" id="imagenEA" name="imagenEA">
                    </div>
                    <div class="form-group mt-2">
                        <label for="itFile">Imagen</label>
                        <input type="file" id="imagenE" value="{{old('imagenE')}}" name="imagenE">
                        {!! $errors->first('imagenE','<small style="color: red;">:message</small>') !!}
                    </div>
                    <div class="form-group mt-2">
                        <label for="itStocl">Stock</label>
                        <input type="number" min="1" name="stockE" value="{{old('stockE')}}" class="form-control" id="stockE" placeholder="disponibles">
                        {!! $errors->first('stockE','<small style="color: red;">:message</small>') !!}
                    </div>
                    <div class="form-group mt-2">
                        <label for="sCategoria">Categoría</label>
                        <select id="categoriaE" name="categoriaE" value="{{old('categoriaE')}}" class="form-select" aria-label="Default select example">
                            <option selected>Seleccionar categoría</option>
                            @foreach($datos['categorias'] as $categoria)
                            <option>{{$categoria->NOMBRE_CATEGORIA}}</option>
                            @endforeach
                        </select>
                        {!! $errors->first('categoriaE','<small style="color: red;">:message</small>') !!}
                    </div>
                    <button type="submit" class="btn btn-primary mt-2">Guardar cambios</button>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>


<div class="modal" id="modalConfirmar" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">


            <div class="modal-body">
                <h5 class="text-center"> Esta seguro que desea eliminar el articulo?</h5>
                <input id="id_articulo" name="id_articulo" type="hidden" value="secret">
            </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-primary mt-2" onclick="EliminarArticulo( $('#id_articulo').val()); return false;">Confirmar</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>


<script src="{{asset('js/ModificarProducto.js')}}"></script>
@endsection