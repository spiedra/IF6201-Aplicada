using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using OmazonP10.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace OmazonP10.Controllers
{
    public class ProductoController : Controller
    {
        public IConfiguration Configuration { get; }

        public ProductoController(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult MostrarProveedores()
        {
            List<ProveedorModel> listaP = new List<ProveedorModel>();
           
            if (ModelState.IsValid)
            {
                
                SqlConnection cn = new SqlConnection(Configuration.GetConnectionString("Default"));
                
                var cmd = new SqlCommand("sp_ObtenerProveedores", cn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cn.Open();

                   using (SqlDataAdapter adapter = new SqlDataAdapter(cmd))
                   {
                       DataTable dt = new DataTable();
                       adapter.Fill(dt);

                       for (int i = 0; i < dt.Rows.Count; i++)
                       {
                           ProveedorModel p = new ProveedorModel();

                           DataRow dr = dt.Rows[i];
                           string[] allColumns = dr.ItemArray.Select(obj => obj.ToString()).ToArray();
                           ArrayList itm = new ArrayList(allColumns);

                           p.nombre = itm[0].ToString();
     
                           listaP.Add(p);

                       }

                   };

              cn.Close();
            }
            ViewBag.Proveedores = listaP;

            return View("Mostrar");
        }// mostrarProveedores

        public IActionResult Deshabilitar()
        {
            List<ProveedorModel> listaP = new List<ProveedorModel>();

            if (ModelState.IsValid)
            {

                SqlConnection cn = new SqlConnection(Configuration.GetConnectionString("Default"));

                var cmd = new SqlCommand("sp_ObtenerProductoCategoria", cn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cn.Open();

                using (SqlDataAdapter adapter = new SqlDataAdapter(cmd))
                {
                    DataTable dt = new DataTable();
                    adapter.Fill(dt);

                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        ProveedorModel p = new ProveedorModel();

                        DataRow dr = dt.Rows[i];
                        string[] allColumns = dr.ItemArray.Select(obj => obj.ToString()).ToArray();
                        ArrayList itm = new ArrayList(allColumns);

                        p.nombre = itm[0].ToString();
                        p.nombreProducto= itm[1].ToString();
                        p.nombreCategoria= itm[2].ToString();
                        listaP.Add(p);

                    }

                };

                cn.Close();
            }
            ViewBag.Proveedores = listaP;

            return View();
        }// deshabilitar

        public IActionResult Reportes()
        {
            return View();
        }

        [HttpPost]
        public IActionResult EliminarProveedor(ProveedorModel pModel)
        {
            List<ProveedorModel> listaP = new List<ProveedorModel>();
        
            if (ModelState.IsValid)
            {
                SqlConnection cn = new SqlConnection(Configuration.GetConnectionString("Default"));
                cn.Open();
                var cmd = new SqlCommand("sp_BloquearProveedor", cn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("Nombre", pModel.nombre);
                cmd.ExecuteNonQuery();
                cn.Close();
            }

            return new JsonResult(new { status = true, message = "Eliminado" });
        }// eliminar proveedor

        [HttpPost]
        public IActionResult DeshabilitarProducto(ProveedorModel pModel)
        {
            List<ProveedorModel> listaP = new List<ProveedorModel>();

            if (ModelState.IsValid)
            {
                SqlConnection cn = new SqlConnection(Configuration.GetConnectionString("Default"));
                cn.Open();
                var cmd = new SqlCommand("sp_DeshabilitarProducto", cn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("Nombre", pModel.nombre);
                cmd.ExecuteNonQuery();
                cn.Close();
            }

            return new JsonResult(new { status = true, message = "Eliminado" });
        }// deshabilitar producto

    }
}
