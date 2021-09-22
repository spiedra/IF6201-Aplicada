<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\tb_producto;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $procsentence = "CALL sp_mostrar_productos()";
        $datos['categorias'] = DB::table('tb_categoria')->get();
        $datos['productos'] = DB::select($procsentence);
        return view('ProductoView')->with('datos', $datos);
    }

    public function ShowAgregar()
    {
        $categorias['categorias'] = DB::table('tb_categoria')->get();
        return view('crear')->with('categorias', $categorias);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //asi se validan los campos
        request()->validate([
            'nombre' => 'required',
            'precio' => 'required',
            'imagen' => 'required',
            'stock' => 'required',
            'categoria' => 'required'
        ], [

            'nombre.required' => 'El nombre del producto es requerido'
        ]);

        //guarda la imagen en una carpeta


        if ($request->hasFile("imagen")) {

            $imagen = $request->file("imagen");
            $nombreimagen = $imagen->getClientOriginalName();
            $ruta = public_path("img/");

            //$imagen->move($ruta,$nombreimagen);
            copy($imagen->getRealPath(), $ruta . $nombreimagen);
        }

        //busca id en la base de datos

        $id_categoria = DB::table('tb_categoria')
            ->select('ID_CATEGORIA')
            ->where('NOMBRE_CATEGORIA', '=', request('categoria'))
            ->get();

        //construye procedimiento almacenado

        $procsentence = "CALL sp_insertar_producto( :nombre, :precio, :imagen, :stock, :categoria)";

        $params = array();
        $params['nombre'] = $request->nombre;
        $params['precio'] = $request->precio;
        $params['imagen'] = $nombreimagen;
        $params['stock'] = $request->stock;
        $params['categoria'] = $id_categoria->toArray()[0]->{"ID_CATEGORIA"};

        $res = array();
        $res = DB::select($procsentence, $params);

        if (isset($res[0]->{1})) {
            return redirect('/Productos/gestionar')->with('mensaje', 'Guardado con éxito.');
        } else {
            return redirect('/Productos/gestionar')->with('mensaje', 'Ya existe un producto con ese nombre.');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
        //asi se validan los campos
        request()->validate([
            'nombreE' => 'required',
            'precioE' => 'required',
            'stockE' => 'required',
            'categoriaE' => 'required'
        ]);

        //guarda la imagen en una carpeta

        if ($request->hasFile("imagenE")) {
            $imagen = $request->file("imagenE");
            $nombreimagen = $imagen->getClientOriginalName();
            $ruta = public_path("img/");

            //$imagen->move($ruta,$nombreimagen);
            copy($imagen->getRealPath(), $ruta . $nombreimagen);
        } else {
            $nombreimagen = $request->imagenEA;
        }
        //busca id en la base de datos

        $id_categoria = DB::table('tb_categoria')
            ->select('ID_CATEGORIA')
            ->where('NOMBRE_CATEGORIA', '=', request('categoriaE'))
            ->get();

        //construye procedimiento almacenado

        $procsentence = "CALL sp_modificar_producto( :nombre_n, :precio_p, :imagen, :stock_p, :categoria,:nombre_v)";

        $params = array();
        $params['nombre_n'] = $request->nombreE;
        $params['precio_p'] = $request->precioE;
        $params['imagen'] = $nombreimagen;
        $params['stock_p'] = $request->stockE;
        $params['categoria'] = $id_categoria->toArray()[0]->{"ID_CATEGORIA"};
        $params['nombre_v'] = $request->nombreEA;

        $res = array();
        $res = DB::select($procsentence, $params);

        return redirect('/Productos/gestionar')->with('mensaje', 'Modificado con éxito.');
        // if (isset($res[0]->{1})) {
        //     return redirect('/Productos/gestionar')->with('mensaje', 'Editado con éxito.');
        // } else {
        //     return redirect('/Productos/gestionar')->with('mensaje', 'No se ha podido editar.');
        // }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy()
    {

        $procsentence = "CALL sp_borrar_producto(:p_id_producto)";

        $params = array();
        $params['p_id_producto'] = request()->ID_PRODUCTO;
        $res = array();
        $res = DB::select($procsentence, $params); 
        return response()->json('exito');
    }

    //filtro por busqueda
    public function nameFilter(Request $request){
        //asi se validan los campos
        request()->validate([
            'busqueda' => 'required'
        ]);
        $procsentence = "CALL sp_buscar_producto(:p_nombre_producto)";
        $datos['categorias'] = DB::table('tb_categoria')->get();

        $params = array();
        $params['p_nombre_producto'] = request()->busqueda;
        $datos['productos'] = DB::select($procsentence,$params);

        return view('ProductoView')->with('datos', $datos);
    }
}
