using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Omazon.Models
{
    public class ProductoModel
    {
        public int IdProducto { get; set; }
        public string NombreProducto { get; set; }
        public int Stock { get; set; }
        public string Precio { get; set; }
        public int IdProveedor { get; set; }
        public int Cantidad { get; set; }
    }
}
