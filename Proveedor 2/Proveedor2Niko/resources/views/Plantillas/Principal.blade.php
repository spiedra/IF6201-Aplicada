<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
  <link rel="stylesheet" href="/css/animacionCarga.css">
</head>

<body>

  @yield('cabecera')

  <ul class="nav nav-tabs" id="myTab" role="tablist">
    <li class="nav-item">
      <a class="nav-link active" id="home-tab" data-toggle="tab" href="/principal" role="tab" aria-controls="home" aria-selected="true">Niko</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" id="profile-tab" data-toggle="tab" href="/Productos/gestionar" role="tab" aria-controls="profile" aria-selected="false">Productos</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" id="contact-tab" data-toggle="tab" href="/Categorias/gestionar" role="tab" aria-controls="contact" aria-selected="false">Categorías</a>
    </li>
  </ul>

  @yield('cuerpo')
  <div class="loader3" id="loader3"></div>
  @yield('pie')
  <footer class="text-center text-lg-start" style="background-color: rgb(191, 75, 64)">
    <!-- Grid container -->
    <div class="container p-4">
      <!--Grid row-->
      <div class="row">
        <!--Grid column-->
        <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
          <h5 class="text-uppercase">Proyecto de informática aplicada aplicada</h5>

          <p>
            Esta página es parte de un proyecto del curso informática aplicada
            de la carrera informática empresarial en la Universidad de Costa Rica 
          </p>
        </div>
        <!--Grid column-->

        <!--Grid column-->
        <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
          <h5 class="text-uppercase">Distribuidora Niko</h5>

          <p>
            Ofrecemos los mejores productos a los mejores frescos
            a muchas de las tiendas de Costa Rica.
            Niko ofrece los mejores estándares de calidad.
          </p>
        </div>
        <!--Grid column-->
      </div>
      <!--Grid row-->
    </div>
    <!-- Grid container -->

    <!-- Copyright -->
    <div class="text-center p-3" style="background-color: rgb(71, 111, 189)">
     Página desarrollada por
      <a class="text-dark">Raquel Ramírez y Randall Mora, UCR</a>
    </div>
    <!-- Copyright -->
  </footer>

  <script type="text/javascript">
    $(window).load(function() {
       $(".loader3").fadeOut("slow");
    });
  </script>
  <script src="{{asset('js/jquery-3.6.0.min.js')}}"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossorigin="anonymous"></script>

</body>


</html>