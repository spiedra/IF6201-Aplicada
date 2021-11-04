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
    public class UsuarioController : Controller
    {

        public IConfiguration Configuration { get; }

        public UsuarioController(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Carrito()
        {
            string connectionString = Configuration["ConnectionStrings:DB_Connection"];
            var connection = new SqlConnection(connectionString);

            string sqlQuery = $"exec [USUARIO].[sp_SELECT_CARRITO] '{2}'"; //HttpContext.User.Identity.Name -> para recuperar el nombre del usuario
            using (SqlCommand command = new SqlCommand(sqlQuery, connection))
            {
                command.CommandType = CommandType.Text;
                connection.Open();
                SqlDataReader respuestaReader = command.ExecuteReader();

                if (!respuestaReader.HasRows)
                    return View();
                
                CarritoModel carrito = new CarritoModel();
                carrito.Productos = new List<ProductoModel>();

                carrito.PrecioTotal = 0;

                while (respuestaReader.Read())
                {
                    ProductoModel producto = new ProductoModel();

                    carrito.IdCarritoCompras = Int32.Parse(respuestaReader["ID_CARRITO_COMPRAS"].ToString());
                    producto.SubTotal = Int32.Parse(respuestaReader["SUB_TOTAL"].ToString());

                    producto.IdProducto = Int32.Parse(respuestaReader["ID_PRODUCTO"].ToString());
                    producto.NombreProducto = respuestaReader["NOMBRE_PRODUCTO"].ToString();
                    producto.Cantidad = Int32.Parse(respuestaReader["CANTIDAD"].ToString());
                    producto.Precio = respuestaReader["PRECIO"].ToString();

                    carrito.PrecioTotal += producto.SubTotal;

                    carrito.Productos.Add(producto);

                }
                connection.Close();
                ViewBag.Carrito = carrito;
            }
            return View();
        }

        public string AgregarProductoACarrito(int idProducto, int cantidad, int precio)
        {
            string connectionString = Configuration["ConnectionStrings:DB_Connection"];
            var connection = new SqlConnection(connectionString);
            int subTotal = precio * cantidad;
            string sqlQuery = $"exec [OMAZON].[sp_INSERTAR_PRODUCTO_CARRITO] '{2}'," + //cambiar al id cuando esté el session
                $"'{idProducto}', '{cantidad}', '{subTotal}'";
            string respuesta = "Error";
            using (SqlCommand command = new SqlCommand(sqlQuery, connection))
            {
                command.CommandType = CommandType.Text;
                connection.Open();
                SqlDataReader respuestaReader = command.ExecuteReader();


                List<ProductoModel> productos = new List<ProductoModel>();
                if (respuestaReader.Read())
                {
                    respuesta = respuestaReader["RESPUESTA"].ToString();
                }
                connection.Close();
            }
            return respuesta;
        }
    }
}
