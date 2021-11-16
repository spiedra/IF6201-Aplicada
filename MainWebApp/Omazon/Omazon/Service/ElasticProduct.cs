using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Omazon.Models
{
    public class ElasticProduct
    {
        public int? IdProducto { get; set; }

        public string NombreProducto { get; set; }

        public int? Stock { get; set; }

        public int? Precio { get; set; }

        public string NombreProveedor { get; set; }

        public string RutaImagen { get; set; }

        public string NombreCategoria { get; set; }


    }
}
