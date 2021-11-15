using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Nest;
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
        private readonly ElasticClient _client;

        public ProductoController(IConfiguration configuration, ElasticClient client)
        {
            Configuration = configuration;
            _client = client;
        }

        public ActionResult Index()
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
                    //producto.IdProveedor = Int32.Parse(respuestaReader["ID_PROVEEDOR"].ToString());
                    producto.NombreProveedor = respuestaReader["NOMBRE_PROVEEDOR"].ToString();
                    producto.NombreCategoria = respuestaReader["NOMBRE_CATEGORIA"].ToString();
                    producto.RutaImagen = respuestaReader["RUTA_IMAGEN"].ToString();

                    productos.Add(producto);

                }
                connection.Close();
                ViewBag.Productos = productos;
            }

            sqlQuery = $"exec [OMAZON].[sp_SELECT_CATEGORIA]";
            using (SqlCommand command = new SqlCommand(sqlQuery, connection))
            {
                command.CommandType = CommandType.Text;
                connection.Open();
                SqlDataReader respuestaReader = command.ExecuteReader();

                List<CategoriaModel> categorias = new List<CategoriaModel>();
                while (respuestaReader.Read())
                {
                    CategoriaModel categoria = new CategoriaModel();

                    categoria.IdCategoria = Int32.Parse(respuestaReader["ID_CATEGORIA"].ToString());
                    categoria.NombreCategoria = respuestaReader["NOMBRE_CATEGORIA"].ToString();

                    categorias.Add(categoria);

                }
                connection.Close();
                ViewBag.Categorias = categorias;
            }
            return View();
        }
        [HttpPost]
        public ActionResult Index(ProductoModel productoModal)
        {

            string connectionString = Configuration["ConnectionStrings:DB_Connection"];
            var connection = new SqlConnection(connectionString);

            string sqlQuery = $"exec [OMAZON].[sp_BUSCAR_PRODUCTO_NOMBRE] @NOMBRE_BUSCAR='{productoModal.NombreProducto}'";
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
                    //producto.IdProveedor = Int32.Parse(respuestaReader["ID_PROVEEDOR"].ToString());
                    producto.NombreProveedor = respuestaReader["NOMBRE_PROVEEDOR"].ToString();
                    producto.NombreCategoria = respuestaReader["NOMBRE_CATEGORIA"].ToString();
                    producto.RutaImagen = respuestaReader["RUTA_IMAGEN"].ToString();

                    productos.Add(producto);

                }
                connection.Close();
                ViewBag.Productos = productos;
            }

            sqlQuery = $"exec [OMAZON].[sp_SELECT_CATEGORIA]";
            using (SqlCommand command = new SqlCommand(sqlQuery, connection))
            {
                command.CommandType = CommandType.Text;
                connection.Open();
                SqlDataReader respuestaReader = command.ExecuteReader();

                List<CategoriaModel> categorias = new List<CategoriaModel>();
                while (respuestaReader.Read())
                {
                    CategoriaModel categoria = new CategoriaModel();

                    categoria.IdCategoria = Int32.Parse(respuestaReader["ID_CATEGORIA"].ToString());
                    categoria.NombreCategoria = respuestaReader["NOMBRE_CATEGORIA"].ToString();

                    categorias.Add(categoria);

                }
                connection.Close();
                ViewBag.Categorias = categorias;
            }
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
           
            ISearchResponse<ProductoModel> response;

            var searchRequest = new SearchRequest<ProductoModel>
            {
                Query = Query<ProductoModel>.QueryString(qs => qs.Query($"*{productoBusqueda.NombreProducto}*").DefaultField(f => f.NombreProducto).DefaultOperator(Operator.And))
            };

            response = _client.Search<ProductoModel>(searchRequest);
            ViewBag.busqueda = response.Documents;
            ViewBag.valorBusqueda = productoBusqueda.NombreProducto;
            return View();
        }//BusquedaProducto


        public string AgregarProductoACarrito(int idProducto, int precio , int cantidad)
        {
            string connectionString = Configuration["ConnectionStrings:DB_Connection"];
            var connection = new SqlConnection(connectionString);
            var subTotal = precio * cantidad;
            string sqlQuery = $"exec [OMAZON].[sp_INSERTAR_PRODUCTO_CARRITO] '{2}'," +
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

        public string EliminarProductoCarrito(int idProducto)
        {
            /*
            string connectionString = Configuration["ConnectionStrings:DB_Connection"];
            var connection = new SqlConnection(connectionString);
            var subTotal = precio * cantidad;
            string sqlQuery = $"exec [OMAZON].[sp_INSERTAR_PRODUCTO_CARRITO] '{2}'," +
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
            */
            return "";
        }
            
    }
}
