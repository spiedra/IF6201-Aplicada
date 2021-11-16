using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Omazon.Models
{
    public class ProductoModel
    {
        
        public int? IdProducto { get; set; }

        
        [Required(ErrorMessage = "El nombre es requerido")]
        public string NombreProducto { get; set; }

        
        [Required(ErrorMessage = "La cantidad es requerida")]
        public int? Stock { get; set; }

       
        [Required(ErrorMessage = "El precio es requerido")]
        public int? Precio { get; set; }
        
        public int IdProveedor { get; set; }

        
        public string NombreProveedor { get; set; }

        public int Cantidad { get; set; }

        
        [Required(ErrorMessage = "La imagen es requerido")]
        public string RutaImagen { get; set; }

       
        [Required(ErrorMessage = "La categoria es requerido")]
        public string NombreCategoria { get; set; }
        
        public string IDCategoria { get; set; }
        
        public int SubTotal { get; set; }
    }
}
