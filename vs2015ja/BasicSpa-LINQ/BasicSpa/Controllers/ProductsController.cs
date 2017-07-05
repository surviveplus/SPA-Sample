using BasicSpa.Data;
using BasicSpa.Data.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BasicSpa.Controllers
{
    public class ProductsController : ApiController
    {
        [Route("api/Products/")]
        public IEnumerable<ViewProduct> GetProducts()
        {

            using (var db = new BasicSpaModelContainer())
            {
                var results =
                    from p in (from p in db.Products select p).ToList()
                    select ViewProduct.FromProduct(p);

                return results;
            }

        }

        [Route("api/Products/{index}")]
        public IEnumerable<ViewProduct> GetProducts(int index)
        {
            using (var db = new BasicSpaModelContainer())
            {
                var results =
                    from p in (from p in db.Products orderby p.Id select p)
                         .Skip(10 * index).Take(10).ToList()
                    select ViewProduct.FromProduct(p);
                return results;
            }

        }


        [Route("api/SaveProduct")]
        public Models.SaveResult SaveProduct(ViewProduct product)
        {
            using (var db = new BasicSpaModelContainer())
            {
                var target = new Product();
                db.Products.Add(target);
                target.SetProperties(product);

                db.SaveChanges();
            } // end using(db)

            return new Models.SaveResult { success = true };
        } // end function

    }
}
