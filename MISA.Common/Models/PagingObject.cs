using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.Common.Models
{
    public class PagingObject
    {
        public int TotalPage { get; set; }
        public int TotalRecord { get; set; }
        public object Data { get; set; }
        public object AllData { get; set; }
    }
}
