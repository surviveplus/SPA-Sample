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
            throw new InvalidOperationException("このWeb APIは廃止されました。");
            //return "Hello (" + DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss") + ")";
        }

        // Get: HelloWithName
        [Route("api/Hello/HelloWithName/{name}")]
        public string GetHelloWithName( string name)
        {
            throw new InvalidOperationException("このWeb APIは廃止されました。");
            //return "Hello " + name + "!";
        }

        [Route("api/Hello/IsEnabled/{clientVersion}")]
        public bool GetIsEnabled( int clientVersion)
        {
            return (clientVersion >= 2);
        }
    }
}
