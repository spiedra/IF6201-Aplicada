using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Omazon.Models
{
    public class ProductoModel
    {
        public int IdProducto { get; set; }

        [Required(ErrorMessage = "El nombre es requerido")]
        public string Nombre { get; set; }

        [Required(ErrorMessage = "La cantidad es requerida")]
        public int Stock { get; set; }

        [Required(ErrorMessage = "El precio es requerido")]
        public string Precio { get; set; }

        public int IdProveedor { get; set; }
    }
}
