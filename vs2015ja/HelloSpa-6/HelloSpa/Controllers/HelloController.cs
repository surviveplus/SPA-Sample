﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace HelloSpa.Controllers
{
    public class HelloController : ApiController
    {
        // Get: Hello
        public string GetHello()
        {
            return "Hello (" + DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss") + ")";
        }

        // Get: HelloAndName
        [Route("api/Hello/HelloWithName/{name}")]
        public string GetHelloWithName( string name)
        {
            return "Hello " + name + "!";
        }
    }
}
