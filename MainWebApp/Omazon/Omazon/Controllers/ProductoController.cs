using Microsoft.AspNetCore.Mvc;
using Omazon.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Omazon.Controllers
{
    public class ProductoController : Controller
    {

        public IActionResult Index()
        {
            return View();
        } 
        [HttpPost]
        public IActionResult Ver(ProductoModel producto)
        {
            ViewBag.nombre = producto.Nombre;
            return View();
        }

        public IActionResult IngresarProducto()
        {
          return View();
        }

        //[HttpPost]
        //public IActionResult IngresarProducto(ProductoModel producto)
        //{
        //    return View();
        //}
       
        public IActionResult GestionProducto()
        {
            return View();
        }
    }
}
