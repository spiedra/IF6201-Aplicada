using Omazon.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;

namespace Omazon.Controllers
{
    public class Authentication : Controller
    {
        public IConfiguration Configuration { get; }

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> UserAuthentication(UserViewModel userViewModel)
        {
            string connectionString = Configuration["ConnectionStrings:DB_Connection"];
            var connection = new SqlConnection(connectionString);
            string sqlQuery = $"exec [OMAZON].[sp_AUTENTICACION] '{userViewModel.UserName}', '{userViewModel.Password}'";
            using (SqlCommand command = new SqlCommand(sqlQuery, connection))
            {
                command.CommandType = CommandType.Text;
                connection.Open();
                SqlDataReader action = command.ExecuteReader();

                switch (action.GetString(0))
                {
                    case "1":
                        await CreateUserSession(userViewModel.UserName, "Administrador");
                        connection.Close();
                        return Redirect("~/Home/Index");
                    case "2":
                        await CreateUserSession(userViewModel.UserName, "Cliente");
                        connection.Close();
                        return Redirect("~/Home/Client/Index");
                    default:
                        return View("Index");
                }
            }
        }

        public async Task<bool> CreateUserSession(string NombreUsuario, string Role)
        {
            List<Claim> claims;
            AuthenticationProperties authProperties;
            ClaimsIdentity claimsIdentity;

            claims = new List<Claim>
            {
                 new Claim(ClaimTypes.Name,NombreUsuario ),
                 new Claim(ClaimTypes.Role, Role),
             };
            claimsIdentity = new ClaimsIdentity(
            claims, CookieAuthenticationDefaults.AuthenticationScheme);
            authProperties = new AuthenticationProperties
            {
                AllowRefresh = true,
                ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(10),
                IsPersistent = true,
            };

            await HttpContext.SignInAsync(
            CookieAuthenticationDefaults.AuthenticationScheme,
            new ClaimsPrincipal(claimsIdentity),
            authProperties);

            return true;
        }
    }
}
