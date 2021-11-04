using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Omazon.Models
{
    public class CarritoModel
    {
        public int IdCarritoCompras { get; set; }
        public List<ProductoModel> Productos { get; set; }
        public int PrecioTotal { get; set; }
    }
}
