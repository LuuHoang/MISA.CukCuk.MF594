using MISA.Common.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;

namespace MISA.Bussiness.Interfaces
{
    public interface IEmployeeService:IBaseService<Employee>
    {

        /// <summary>
        /// Kiểm tra thông tin nhân viên theo mã
        /// </summary>
        /// <param name="employeeCode"></param>
        /// <returns>true: có; false: không</returns>
        /// CreatedBy: NVMANH (14/10/2020)
        bool CheckEmployeeByCode(string employeeCode);
        /// <summary>
        /// Đưa ra trạng thái làm việc
        /// </summary>
        /// CreatedBy: LVHOANG (18/10/2020)
        IEnumerable GetWorkStatus();
        /// <summary>
        /// Đưa ra Mã nhân viên cao nhất
        /// </summary>
        /// CreatedBy: LVHOANG (19/10/2020)
        IEnumerable GetMaxEmployeeCode();
    }
}
