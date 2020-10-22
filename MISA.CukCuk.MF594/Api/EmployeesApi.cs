using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System.Net.WebSockets;
using MISA.DataAccess.Interfaces;
using MISA.Common.Models;
using MISA.Bussiness.Interfaces;
using MISA.Bussiness.Service;
using System.Collections;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MISA.CukCuk.MF594.Api
{
    [Route("employees")]
    [ApiController]
    public class EmployeesApi : BaseApi<Employee>
    {
        IEmployeeService _employeeService;
        public EmployeesApi(IEmployeeService employeeService):base(employeeService)
        {
            _employeeService = employeeService;
        }
        /// <summary>
        /// Chức năng kiểm tra mã nhân viên có bị trùng hay không
        /// </summary>
        /// <param name="employeeCode"></param>
        /// <returns></returns>
        /// Author:LVHOANG(15/10/2020)
        [HttpGet]
        [Route("checkEmployeeByCode/{employeeCode}")]
        public bool GetCheckCode(String employeeCode)
        {
            return _employeeService.CheckEmployeeByCode(employeeCode);
        }
        /// <summary>
        /// Chức năng lấy ra trạng thái công việc
        /// </summary>
        /// <returns></returns>
        /// Author:LVHOANG(15/10/2020)
        [HttpGet]
        [Route("workStatus")]
        public IEnumerable GetWorkStatus()
        {
            return _employeeService.GetWorkStatus();
        }
        /// <summary>
        /// Chức năng lấy ra Mã nhân viên cao nhất
        /// </summary>
        /// <returns></returns>
        /// Author:LVHOANG(15/10/2020)
        [HttpGet]
        [Route("getMaxEmployeeCode")]
        public IEnumerable GetMaxEmployeeCode()
        {
            return _employeeService.GetMaxEmployeeCode();
        }
    }
}
