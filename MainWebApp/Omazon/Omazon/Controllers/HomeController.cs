using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Omazon.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace Omazon.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        public IConfiguration Configuration { get; }

        public HomeController(ILogger<HomeController> logger, IConfiguration configuration)
        {
            Configuration = configuration;
            _logger = logger;
        }

        public IActionResult Index()
        {
            string connectionString = Configuration["ConnectionStrings:DB_Connection"];
            var connection = new SqlConnection(connectionString);

            string sqlQuery = $"exec PRODUCTO.sp_SELECT_PRODUCTOS";
            using (SqlCommand command = new SqlCommand(sqlQuery, connection))
            {
                command.CommandType = CommandType.Text;
                connection.Open();
                SqlDataReader respuestaReader = command.ExecuteReader();

                List<ProductoModel> productos = new List<ProductoModel>();
                while (respuestaReader.Read())
                {
                    ProductoModel producto = new ProductoModel();

                    producto.IdProducto = Int32.Parse(respuestaReader["ID_PRODUCTO"].ToString());
                    producto.NombreProducto = respuestaReader["NOMBRE_PRODUCTO"].ToString();
                    producto.Stock = Int32.Parse(respuestaReader["STOCK"].ToString());
                    producto.Precio = respuestaReader["PRECIO"].ToString();
                    producto.IdProveedor = Int32.Parse(respuestaReader["ID_PROVEEDOR"].ToString());

                    productos.Add(producto);

                }
                connection.Close();
                ViewBag.Productos = productos;
            }
            return View();
        }//Index

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
