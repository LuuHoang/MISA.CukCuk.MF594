using MISA.Bussiness.Interfaces;
using MISA.Common.Models;
using MISA.DataAccess.Interfaces;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;

namespace MISA.Bussiness.Service
{
    public class EmployeeService : BaseService<Employee>, IEmployeeService
    {
        IEmployeeRepository _employeeRepository;
        public EmployeeService(IEmployeeRepository employeeRepository):base(employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        public bool CheckEmployeeByCode(string employeeCode)
        {
            return _employeeRepository.CheckEmployeeByCode(employeeCode);
        }

        public IEnumerable GetMaxEmployeeCode()
        {
            return _employeeRepository.GetMaxEmployeeCode();
        }

        public IEnumerable GetWorkStatus()
        {
            return _employeeRepository.GetWorkStatus();
        }
        //protected override bool Validate(Employee entity)
        //{
        //    var isValid = true;
        //    // Check trùng mã:
        //    var isValidExitsCode =  CheckEmployeeByCode(entity.EmployeeCode);
        //    if (isValidExitsCode)
        //    {
        //        isValid = false;
        //        validateErrorResponseMsg.Add("Mã bị trùng 1");
        //    }

        //    // Check trùng số chứng minh thư:
        //    var isValidExitsMobile = CheckEmployeeByCode(entity.EmployeeCode);
        //    if (isValidExitsMobile)
        //    {
        //        isValid = false;
        //        validateErrorResponseMsg.Add("Bị trùng số điện thoại");
        //    }
            
        //    return isValid;
        //}

    }
}
