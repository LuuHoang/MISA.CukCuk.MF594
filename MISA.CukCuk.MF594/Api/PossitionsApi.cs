using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.Bussiness.Interfaces;
using MISA.Common.Models;

namespace MISA.CukCuk.MF594.Api
{
    [Route("possitions")]
    public class PossitionsApi : BaseApi<Possition>
    {
        public PossitionsApi(IBaseService<Possition> possitionService) : base(possitionService)
        {
        }
    }
}
