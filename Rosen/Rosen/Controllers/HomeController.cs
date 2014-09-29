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

        public ActionResult Index()
        {
            var gubbe = "glenn";
            return View();
        }

        public ActionResult korvAPI()
        {
            var korvar = "sibyllakorv";

            return View(korvar);


        }

    }
}
