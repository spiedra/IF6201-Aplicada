<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categorias['categorias'] = DB::table('tb_categoria')->get();
        return view('CategoriaView')->with('datos', $categorias);
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
        ], [

            'nombre.required' => 'El nombre de la categoría es requerido.'
        ]);
        //

        $procsentence = "CALL sp_insertar_categoria( :nombre)";

        $params = array();
        $params['nombre'] = $request->nombre;

        $res = array();
        $res = DB::select($procsentence, $params);

        if (isset($res[0]->{1})) {
            return redirect('/Categorias/gestionar')->with('mensaje', 'Guardado con éxito.');
        } else {
            return redirect('/Categorias/gestionar')->with('mensaje', 
        );
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $procsentence = "CALL sp_mostrar_categoria_producto(:id_categoria)";

        $params = array();
        $params['id_categoria'] = request()->ID_CATEGORIA;

        $res = array();
        $res = DB::select($procsentence, $params);
        return response()->json($res);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
        request()->validate([
            'nombre_categoriaup' => 'required',
            'id_categoriaup' => 'required'
        ]);

        $procsentence = "CALL sp_modificar_categoria( :p_id_categoria, :p_nombre_categoria)";

        $params = array();
        $params['p_nombre_categoria'] = $request->nombre_categoriaup;
        $params['p_id_categoria'] = $request->id_categoriaup;
        
        $res = array();
        $res = DB::select($procsentence, $params);

        return redirect('/Categorias/gestionar')->with('mensaje', 'Modificado con éxito.');
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

    public function find(Request $request)
    {
       
        $categorias['categorias'] = DB::table('tb_categoria')
        ->where('NOMBRE_CATEGORIA', 'LIKE', "%$request->busqueda%")
        ->get();
        return view('CategoriaView')->with('datos', $categorias)
        ;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
