<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function iniciar(Request $request)
    {

        // //asi se validan los campos
        request()->validate([
            'admin_id' => 'required',
            'admin_name' => 'required',
        ], [

            'admin_id.required' => 'La identificación es requerida',
            'admin_name.required' => 'La contraseña es requerida'

        ]);

        //llamo procedimiento almacenado
        $procsentence = "CALL sp_verificar_usuario( :p_id, :p_password)";

        $params = array();
        $params['p_id'] = $request->admin_id;
        $params['p_password'] = $request->admin_name;


        $res = array();
        $res = DB::select($procsentence, $params);
       //ar_dump($res[0]);
       // dd($res[0]);
         if(isset($res[0]->{1})){
          return view('PrincipalView');
        }
        else{
            return redirect('Login')->with('mensaje','Usuario no encontrado, ingrese los datos correctamente.');
        }

       // return view('PrincipalView');
    }


}
