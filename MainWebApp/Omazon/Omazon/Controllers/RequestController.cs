using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Omazon.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Omazon.Controllers
{
    public class RequestController : Controller
    {
        public IActionResult Index()
        {
            ViewBag.requests = JsonConvert.DeserializeObject<List<AccessRequestModel>>(GetRequests().Result);
            return View();
        }

        [HttpPost]
        [Route("Request/SendAccessRequest")]
        public async Task<IActionResult> SendAccessRequest(AccessRequestModel request)
        {
            HttpClient httpClient = new HttpClient();
            StringContent content = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");
            var response = await httpClient.PostAsync("https://localhost:44358/Omazon/API/SendProviderRequest", content);
            ViewBag.Ok = await response.Content.ReadAsStringAsync();
            return View("Index");
        }

        public async Task<string> GetRequests()
        {
            HttpClient httpClient = new HttpClient();
            var response = await httpClient.GetAsync("https://localhost:44358/Omazon/API/Requests");
            return await response.Content.ReadAsStringAsync();
        }

        [HttpPost]
        [Route("Request/DeleteRequestById")]
        public async Task<IActionResult> DeleteRequestById(int Id)
        {
            HttpClient httpClient = new HttpClient();
            var response = await httpClient.DeleteAsync("https://localhost:44358/Omazon/API/Delete-request/"+Id);
            ViewBag.Ok= await response.Content.ReadAsStringAsync();
            return View("Index");
        }


    }
}
