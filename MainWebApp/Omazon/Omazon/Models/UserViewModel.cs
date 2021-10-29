using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Omazon.Models
{
    public class UserViewModel
    {
        [Required(ErrorMessage = "El nombre de usuario es requerido")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "La contraseña es requerida")]
        public string Password { get; set; }
    }
}
