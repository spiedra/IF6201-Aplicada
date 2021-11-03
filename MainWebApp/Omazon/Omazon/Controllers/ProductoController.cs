using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Omazon.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Omazon.Controllers
{
    public class ProductoController : Controller
    {
        public IConfiguration Configuration { get; }

        public ProductoController(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult Ver(ProductoModel producto)
        {
            ViewBag.Producto = producto;
            return View();
        }

        [HttpGet]
        public IActionResult BusquedaProducto(ProductoModel productoBusqueda)
        {
            string connectionString = Configuration["ConnectionStrings:DB_Connection"];
            var connection = new SqlConnection(connectionString);

            string sqlQuery = $"exec [OMAZON].[sp_BUSCAR_PRODUCTO_NOMBRE] '{productoBusqueda.NombreProducto}'";
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
                    producto.NombreCategoria = respuestaReader["NOMBRE_CATEGORIA"].ToString();
                    producto.RutaImagen = respuestaReader["RUTA_IMAGEN"].ToString();

                    productos.Add(producto);

                }
                connection.Close();
                ViewBag.Productos = productos;
                ViewBag.ValorBusqueda = productoBusqueda.NombreProducto;
            }
            return View();
        }
    }
}
