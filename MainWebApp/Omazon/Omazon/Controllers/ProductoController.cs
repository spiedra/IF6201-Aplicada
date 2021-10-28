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
        [HttpGet]
        public IActionResult Ver(ProductoModel producto)
        {
            ViewBag.Producto = producto;
            return View();
        }


    }
}
