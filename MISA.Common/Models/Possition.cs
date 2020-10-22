using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.Common.Models
{
    public class Possition
    {
        /// <summary>
        /// Khóa chính chức vụ
        /// Author: LVHOANG(10/10/2020)
        /// </summary>
        public Guid PossitionId { get; set; }
        /// <summary>
        /// Tên chức vụ phòng ban
        /// Author: LVHOANG(10/10/2020)
        /// </summary>
        public string PossitionName { get; set; }
    }
}
