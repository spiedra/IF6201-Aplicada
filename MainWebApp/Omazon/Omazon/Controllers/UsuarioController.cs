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

            string sqlQuery = $"exec USUARIO.sp_SELECT_CARRITO '{1}'"; //Aquí va como parametro el ID de usuario
            using (SqlCommand command = new SqlCommand(sqlQuery, connection))
            {
                command.CommandType = CommandType.Text;
                connection.Open();
                SqlDataReader respuestaReader = command.ExecuteReader();

                if (!respuestaReader.HasRows)
                    return View();
                
                CarritoModel carrito = new CarritoModel();
                
                carrito.IdCarritoCompras = Int32.Parse(respuestaReader["ID_CARRITO_COMPRAS"].ToString());
                carrito.SubTotal = respuestaReader["ID_CARRITO_COMPRAS"].ToString();

                while (respuestaReader.Read())
                {
                    ProductoModel producto = new ProductoModel();

                    producto.IdProducto = Int32.Parse(respuestaReader["ID_PRODUCTO"].ToString());
                    producto.NombreProducto = respuestaReader["NOMBRE_PRODUCTO"].ToString();
                    producto.Precio = respuestaReader["PRECIO"].ToString();
                    producto.Cantidad = Int32.Parse(respuestaReader["CANTIDAD"].ToString());

                    carrito.Productos.Add(producto);

                }
                connection.Close();
                ViewBag.Carrito = carrito;
            }
            return View();
        }
    }
}
