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
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Ver(ProductoModel producto)
        {
            ViewBag.nombre = producto.Nombre;
            return View();
        }
    }
}
