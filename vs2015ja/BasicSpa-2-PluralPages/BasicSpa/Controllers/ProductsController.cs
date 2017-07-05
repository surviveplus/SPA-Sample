using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BasicSpa.Controllers
{
    public class ProductsController : Controller
    {
        // GET: Products
        public ActionResult Index()
        {
            return View();
        }


        // GET: Products/NewItem
        public ActionResult NewItem()
        {
            return View();
        }
    }
}