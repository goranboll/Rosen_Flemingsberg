using Rosen.Models;
using Rosen.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Rosen.Controllers
{
    public class MapController : Controller
    {


        private Service _service;

        private Service Service
        {
            get { return _service ?? (_service = new Service()); }
        }

        public ActionResult Index()
        {
            return View();
        }
        public ActionResult GetMapData()
        {
            var model = new VMMap();
            model.Map = Service.GenerateMap();
            model.Vehicles = Service.GetVehicles();
            return Json(model, JsonRequestBehavior.AllowGet);
            // return RedirectToAction("Index", "Map");
        }
        
    }
}
