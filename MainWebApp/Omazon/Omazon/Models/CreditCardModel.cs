using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Omazon.Models
{
   public class CreditCardModel
    {
        public int IdTarjeta { get; set; }

        [Required(ErrorMessage = "La dirección es requerida")]
        public string Direccion { get; set; }

        [Required(ErrorMessage = "El numero de tarjeta es requerido")]
        public string NumeroTarjeta { get; set; }

        [Required(ErrorMessage = "El codigo de seguridad es requerido")]
        public string CodigoSeguridad { get; set; }

        [Required(ErrorMessage = "La fecha de vencimiento es requerida")]
        public string FechaVencimiento { get; set; }
    }
}
