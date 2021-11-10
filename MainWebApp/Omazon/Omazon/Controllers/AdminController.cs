using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Omazon.Models;
using System.Data;

namespace Omazon.Controllers
{
    public class AdminController : Controller
    {
        public IConfiguration Configuration { get; }

        public AdminController(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        // GET: AdminController
        public ActionResult Index()
        {
            return View();
        }

        // GET: AdminController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: AdminController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: AdminController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult CreateProduct(ProductoModel producto)
        {
            string connectionString = Configuration["ConnectionStrings:DB_Connection"];
            var connection = new SqlConnection(connectionString);

            string sqlQuery = $"exec [PRODUCTO].[sp_INSERT_PRODUCTOS] @p_NOMBRE_PRODUCTO = '{producto.NombreProducto}'," +
                  $"@p_STOCK={producto.Stock}, @p_PRECIO={producto.Precio}," +
                  $"@p_RUTA_IMAGEN='{producto.RutaImagen}',@p_ID_CATEGORIA={producto.IDCategoria}";
            using (SqlCommand command = new SqlCommand(sqlQuery, connection))
            {
                command.CommandType = CommandType.Text;
                connection.Open();
                command.ExecuteReader();
                connection.Close();
            }

            return Redirect("~/Producto/Index");
        }

        // GET: AdminController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: AdminController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult EditProduct(ProductoModel producto)
        {
            string connectionString = Configuration["ConnectionStrings:DB_Connection"];
            var connection = new SqlConnection(connectionString);

            string sqlQuery = $"exec [PRODUCTO].[sp_UPDATE_PRODUCTOS] @p_ID_PRODUCTO={producto.IdProducto}, " +
                  $"@p_NOMBRE_PRODUCTO = '{producto.NombreProducto}'," +
                  $"@p_STOCK={producto.Stock}, @p_PRECIO={producto.Precio}," +
                  $"@p_RUTA_IMAGEN='{producto.RutaImagen}', @p_ID_CATEGORIA ={producto.IDCategoria}";
            using (SqlCommand command = new SqlCommand(sqlQuery, connection))
            {
                command.CommandType = CommandType.Text;
                connection.Open();
                command.ExecuteReader();
                connection.Close();
            }

            return Redirect("~/Producto/Index");
        }

        // GET: AdminController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: AdminController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteProduct(ProductoModel producto)
        {
            string connectionString = Configuration["ConnectionStrings:DB_Connection"];
            var connection = new SqlConnection(connectionString);
            Console.Write("id PRODUCTO LLEGUE :"+producto.IdProducto);
            string sqlQuery = $"exec [PRODUCTO].[sp_DELETE_PRODUCTOS] @p_ID_PRODUCTO={producto.IdProducto}";
            using (SqlCommand command = new SqlCommand(sqlQuery, connection))
            {
                command.CommandType = CommandType.Text;
                connection.Open();
                command.ExecuteReader();
                connection.Close();
            }

            return Redirect("~/Producto/Index");
        }
    }
}
