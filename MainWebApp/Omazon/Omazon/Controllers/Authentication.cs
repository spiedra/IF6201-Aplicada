using Omazon.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;

namespace Omazon.Controllers
{
    public class Authentication : Controller
    {
        public IConfiguration Configuration { get; }

        public Authentication(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult> UserAuthentication(UserViewModel userViewModel)
        {
            string connectionString = Configuration["ConnectionStrings:DB_Connection"];
            var connection = new SqlConnection(connectionString);
            string sqlQuery = $"exec [OMAZON].[sp_AUTENTICACACION] '{userViewModel.UserName}', '{userViewModel.Password}'";
            using (SqlCommand command = new SqlCommand(sqlQuery, connection))
            {
                command.CommandType = CommandType.Text;
                connection.Open();
                SqlDataReader response = command.ExecuteReader();

                if (response.Read())
                {
                    switch (response["RESPONSE"].ToString())
                    {
                        case "1":
                            await CreateUserSession(userViewModel.UserName, response["TIPO_ROLE"].ToString());
                            connection.Close();
                            return Redirect("~/Admin/Index");
                        case "2":
                            await CreateUserSession(userViewModel.UserName, response["TIPO_ROLE"].ToString());
                            connection.Close();
                            return Redirect("~/Home/Index");
                        default:
                            connection.Close();
                            return Redirect("Index");
                    }
                }
                return Redirect("Index");
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

            //uso de cookies para la sesion

            claimsIdentity = new ClaimsIdentity(
            claims, CookieAuthenticationDefaults.AuthenticationScheme);

            //propiedades de la sesion

            authProperties = new AuthenticationProperties
            {
                AllowRefresh = true,
                // Refreshing the authentication session should be allowed.

                ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(10),
                // The time at which the authentication ticket expires.

                IsPersistent = true,
                // Whether the authentication session is persisted across 
                // multiple requests. When used with cookies, controls
                // whether the cookie's lifetime is absolute (matching the
                // lifetime of the authentication ticket) or session-based.

                //IssuedUtc = <DateTimeOffset>,
                // The time at which the authentication ticket was issued.

                //RedirectUri = <string>
                // The full path or absolute URI to be used as an http 
                // redirect response value.
            };

            //informe al contexto (todo el sistema) que hay un nuevo usuario
            await HttpContext.SignInAsync(
            CookieAuthenticationDefaults.AuthenticationScheme,
            new ClaimsPrincipal(claimsIdentity),
            authProperties);

            return true;
        }

    }
}
