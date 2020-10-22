using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.Common.Models
{
    public class Department
    {
        /// <summary>
        /// Khóa chính phòng ban
        /// Author: LVHOANG(10/10/2020)
        /// </summary>
        public Guid DepartmentId { get; set; }
        /// <summary>
        /// Mã phòng ban
        /// Author: LVHOANG(10/10/2020)
        /// </summary>
        public string DepartmentCode { get; set; }
        /// <summary>
        /// Tên phòng ban
        /// Author: LVHOANG(10/10/2020)
        /// </summary>
        public string DepartmentName { get; set; }
    }
}
