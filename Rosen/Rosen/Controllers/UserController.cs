using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Rosen.ViewModels;
using Rosen.Models;

namespace Rosen.Controllers
{
    public class UserController : Controller
    {
        
        public ActionResult Index(int id)
        {
            
            var model = new VMUser();

            if (id == 2)
            {
                model.User = new User() { Id = 3, Name = "lungan" };
            }
            else {
                model.User = new User() { Id = 3, Name = "micke" };
            }

            return View(model);
        }


        public ActionResult GetUserDetails(int id)
        {
            Response.CacheControl = "no-cache";

            var model = new User();

            if (id == 2)
            {
                model = new User() { Id = 3, Name = "lungan" };
            }
            else
            {
                model = new User() { Id = 3, Name = "micke" };
            }
           

            return Json(model, JsonRequestBehavior.AllowGet);
        }

    }
}
