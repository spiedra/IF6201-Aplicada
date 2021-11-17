using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Omazon.Models
{
    public class ProveedorModel
    {
        public int codigo { get; set; }
        public string nombre { get; set; }
        public string nombreProducto { get; set; }
        public string nombreCategoria { get; set; }

        public int estado { get; set; }
    }
}
