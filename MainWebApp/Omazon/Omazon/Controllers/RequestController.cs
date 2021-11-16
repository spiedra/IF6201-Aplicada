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
        public IActionResult AccesoProveedor()
        {
            ViewBag.Ok = "";
            this.DisplayDynamicMessage();
            return View();
        }

        public void DisplayDynamicMessage()
        {
            if (TempData["msg"] != null)
            {
                ViewBag.Ok = TempData["msg"];
            }
        }

        public IActionResult Solicitudes()
        {
            ViewBag.Ok = "";
            this.DisplayDynamicMessage();
            ViewBag.requests = JsonConvert.DeserializeObject<List<AccessRequestModel>>(GetRequests().Result);
            return View();
        }


        [HttpPost]
        [Route("Request/SendAccessRequest")]
        public async Task<IActionResult> SendAccessRequest(AccessRequestModel request)
        {
            HttpClient httpClient = new HttpClient();
            StringContent content = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");
            var response = await httpClient.PostAsync("https://localhost:44353/Omazon/API/SendProviderRequest", content);
            TempData["msg"] = await response.Content.ReadAsStringAsync();
            return RedirectToAction("AccesoProveedor");
        }

        [HttpPost]
        [Route("Request/DoManageAccess")]
        public async Task<IActionResult> DoManageAccess(AccessRequestModel request)
        {
            HttpClient httpClient = new HttpClient();
            StringContent content = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");
            var response = await httpClient.PostAsync("https://localhost:44353/Omazon/API/ManageAccess", content);
            TempData["msg"] = await response.Content.ReadAsStringAsync();
            return RedirectToAction("Solicitudes");
        }
        public async Task<string> GetRequests()
        {
            HttpClient httpClient = new HttpClient();
            var response = await httpClient.GetAsync("https://localhost:44353/Omazon/API/Requests");
            return await response.Content.ReadAsStringAsync();
        }

        [HttpPost]
        [Route("Request/DeleteRequestById")]
        public async Task<IActionResult> DeleteRequestById(int RequestId)
        {
            HttpClient httpClient = new HttpClient();
            var response = await httpClient.DeleteAsync("https://localhost:44353/Omazon/API/Delete-request/" + RequestId);
            TempData["msg"]= await response.Content.ReadAsStringAsync();
            return RedirectToAction("Solicitudes");
        }


    }
}
