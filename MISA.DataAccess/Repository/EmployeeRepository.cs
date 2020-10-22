using MISA.Common.Models;
using MISA.DataAccess.Interfaces;
using MySql.Data.MySqlClient;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Text;

namespace MISA.DataAccess.Repository
{
    public class EmployeeRepository : BaseRepository<Employee>, IEmployeeRepository
    {
        public EmployeeRepository(IDatabaseContext<Employee> databaseContext):base(databaseContext)
        {
        }


        public bool CheckEmployeeByCode(string employeeCode)
        {
            var objectValue = _databaseContext.Get("Proc_GetEmployeeByCode", employeeCode);
            if (objectValue == null)
                return false;
            else
                return true;
        }

        public IEnumerable GetMaxEmployeeCode()
        {
            return _databaseContext.Get("Proc_GetMaxEmployeeCode");
        }

        public IEnumerable GetWorkStatus()
        {
            return _databaseContext.Get("Proc_GetWorkStatuss"); ;
        }
    }
}
