using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Omazon.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Omazon.Controllers
{
    public class ProviderController : Controller
    {

        public IConfiguration Configuration { get; }
        public IActionResult Index()
        {
            ViewBag.Proveedores = getReports();
            return View();
        }

        public IActionResult MostrarProveedores()
        {
            List<ProveedorModel> listaP = new List<ProveedorModel>();

            if (ModelState.IsValid)
            {

                SqlConnection cn = new SqlConnection(Configuration["ConnectionStrings:DB_Connection"]);

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

        public ProviderController(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public List<ProveedorModel> getReports()
        {
            List<ProveedorModel> listaP = new List<ProveedorModel>();

            SqlConnection cn = new SqlConnection(Configuration["ConnectionStrings:DB_Connection"]);

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
            return listaP;
        }

        public IActionResult Deshabilitar()
        {
            List<ProveedorModel> listaP = new List<ProveedorModel>();

            if (ModelState.IsValid)
            {

                SqlConnection cn = new SqlConnection(Configuration["ConnectionStrings:DB_Connection"]);

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
                        p.nombreProducto = itm[1].ToString();
                        p.nombreCategoria = itm[2].ToString();
                        //p.estado = int.Parse(char.ConvertFromUtf32(itm[3].ToString());
                        listaP.Add(p);

                    }

                };

                cn.Close();
            }
            ViewBag.Proveedores = listaP;

            return View();
        }// deshabilitar

        [HttpPost]
        public IActionResult EliminarProveedor(ProveedorModel pModel)
        {
            List<ProveedorModel> listaP = new List<ProveedorModel>();

            if (ModelState.IsValid)
            {
                SqlConnection cn = new SqlConnection(Configuration["ConnectionStrings:DB_Connection"]);
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
                SqlConnection cn = new SqlConnection(Configuration["ConnectionStrings:DB_Connection"]);
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
