using Rosen.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Rosen.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/
        private Service _service;

        private Service Service
        {
            get { return _service ?? (_service = new Service()); }
        }

        public ActionResult Index()
        {
            int[] test = new int[10] { 1, 22, 13, 401, 25, 63, 17, 180, 99, 140 };
            
            
            var model = Service.GenerateMap();
            return Json(model, JsonRequestBehavior.AllowGet);
          // return RedirectToAction("Index", "Map");
        }

        

    }
}
