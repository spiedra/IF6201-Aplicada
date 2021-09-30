
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
</head>

@if(session()->has('mensaje'))

@if (session()->get('mensaje')=="Usuario no encontrado, ingrese los datos correctamente.")
<div class="alert alert-danger">
    {{ session()->get('mensaje') }}
</div>
@else

<div class="alert alert-success">
    {{ session()->get('mensaje') }}
</div>
@endif

@endif

<div class="container">
    <div class="row justify-content-center align-items-center" style="height:70vh">
        <div class="col-sm-12 col-md-7 col-lg-4">
            <div class="card">
                <div class="card-body">
                   
                    <form  action="/iniciar" method="POST" autocomplete="off">
                    @csrf
                    <h7>Ingrese sus datos para Iniciar Sesi&oacute;n</h7>
                        <div class="form-group">
                            <input type="text" class="form-control" id="admin_id" name="admin_id" placeholder="Identificacion">
                        </div>
                        <div class="form-group">
                            <h7>Contrase&ntilde;a</h7>
                            <br>
                            <input type="password" class="form-control" id="admin_name" name="admin_name">
                        </div>
                        <br>
                        <div>
                            <button type="submit" style="background-color:gray" class="btn" value="Registrar">Ingresar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>