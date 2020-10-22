using MISA.Common.Models;
using MISA.DataAccess.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.DataAccess
{

    public class DatabaseSqlServerAccess : IDatabaseContext<Employee>
    {
        //readonly string _connectionString = "Data Source=35.194.166.58;Initial Catalog=MISACukCuk_F09;User ID=sa;Password=12345678@Abc";
        //SqlConnection _sqlConnection;
        //SqlCommand _sqlCommand;

        //public DatabaseSqlServerAccess()
        //{
        //    // Khởi tạo kết nối:
        //    _sqlConnection = new SqlConnection(_connectionString);
        //    _sqlConnection.Open();
        //    // Đối tượng xử lý command:
        //    _sqlCommand = _sqlConnection.CreateCommand();
        //    _sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
        //}
        //public int Delete(Guid id)
        //{
        //    throw new NotImplementedException();
        //}

        //public Employee GetById(Guid employeeId)
        //{
        //    _sqlCommand.CommandText = "Proc_GetEmployeeById";
        //    _sqlCommand.Parameters.AddWithValue("@EmployeeId", employeeId);
        //    SqlDataReader mySqlDataReader = _sqlCommand.ExecuteReader();
        //    while (mySqlDataReader.Read())
        //    {
        //        var employee = new Employee();
        //        for (int i = 0; i < mySqlDataReader.FieldCount; i++)
        //        {
        //            var columnName = mySqlDataReader.GetName(i);
        //            var value = mySqlDataReader.GetValue(i);
        //            var propertyInfo = employee.GetType().GetProperty(columnName);
        //            if (propertyInfo != null && value != DBNull.Value)
        //                propertyInfo.SetValue(employee, value);
        //        }
        //        return employee;
        //    }
        //    return null;
        //}

        //public IEnumerable<Employee> Get()
        //{
        //    var employees = new List<Employee>();
        //    _sqlCommand.CommandText = "Proc_GetEmployees";
        //    // Thực hiện đọc dữ liệu:
        //    SqlDataReader mySqlDataReader = _sqlCommand.ExecuteReader();
        //    while (mySqlDataReader.Read())
        //    {
        //        var employee = new Employee();
        //        //employee.EmployeeId = mySqlDataReader.GetGuid(0);
        //        //employee.EmployeeCode = mySqlDataReader.GetString(1);
        //        //employee.FullName = mySqlDataReader.GetString(2);

        //        for (int i = 0; i < mySqlDataReader.FieldCount; i++)
        //        {
        //            var columnName = mySqlDataReader.GetName(i);
        //            var value = mySqlDataReader.GetValue(i);
        //            var propertyInfo = employee.GetType().GetProperty(columnName);
        //            if (propertyInfo != null && value != DBNull.Value)
        //                propertyInfo.SetValue(employee, value);
        //        }
        //        employees.Add(employee);
        //    }
        //    // 1. Kết nối với Database:
        //    // 2. Thực thi command lấy dữ liệu:
        //    // Trả về:
        //    return employees;
        //}

        //public int Insert(Employee employee)
        //{
        //    _sqlCommand.CommandText = "Proc_InsertEmployee";
        //    _sqlCommand.Parameters.AddWithValue("@EmployeeId", employee.EmployeeId);
        //    _sqlCommand.Parameters.AddWithValue("@EmployeeCode", employee.EmployeeCode);
        //    _sqlCommand.Parameters.AddWithValue("@EmployeeName", employee.EmployeeName);
        //    _sqlCommand.Parameters.AddWithValue("@DateOfBirth", employee.DateOfBirth);
        //    _sqlCommand.Parameters.AddWithValue("@Gender", employee.Gender);
        //    _sqlCommand.Parameters.AddWithValue("@Email", employee.Email);
        //    _sqlCommand.Parameters.AddWithValue("@PhoneNumber", employee.PhoneNumber);
        //    _sqlCommand.Parameters.AddWithValue("@IdentityDate", employee.IdentityDate);
        //    _sqlCommand.Parameters.AddWithValue("@IdentityNumber", employee.IdentityNumber);
        //    _sqlCommand.Parameters.AddWithValue("@IdentityPlace", employee.IdentityPlace);
        //    _sqlCommand.Parameters.AddWithValue("@PossitionId", employee.PossitionId);
        //    _sqlCommand.Parameters.AddWithValue("@DepartmentId", employee.DepartmentId);
        //    _sqlCommand.Parameters.AddWithValue("@Salary", employee.Salary);
        //    _sqlCommand.Parameters.AddWithValue("@TaxCode", employee.TaxCode);
        //    _sqlCommand.Parameters.AddWithValue("@JoinDate", employee.JoinDate);
        //    _sqlCommand.Parameters.AddWithValue("@WorkStatus", employee.WorkStatus);
        //    var affectRows = _sqlCommand.ExecuteNonQuery();
        //    return affectRows;
        //}

        //public int Update(Employee employee)
        //{
        //    throw new NotImplementedException();
        //}

        //public IEnumerable<Employee> Get(string storeName)
        //{
        //    throw new NotImplementedException();
        //}

        //public IEnumerable<Employee> Get(string storeName, string code)
        //{
        //    throw new NotImplementedException();
        //}

        //object IDatabaseContext<Employee>.Get(string storeName, string code)
        //{
        //    throw new NotImplementedException();
        //}

        //public Employee GetById(object employeeId)
        //{
        //    throw new NotImplementedException();
        //}

        //public int Delete(object id)
        //{
        //    throw new NotImplementedException();
        //}
        public int Delete(object id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Employee> Get()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Employee> Get(string storeName)
        {
            throw new NotImplementedException();
        }

        public object Get(string storeName, string code)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Employee> Get(int numberpage, int amount)
        {
            throw new NotImplementedException();
        }

        public Employee GetById(object employeeId)
        {
            throw new NotImplementedException();
        }

        public int Insert(Employee employee)
        {
            throw new NotImplementedException();
        }

        public int Update(Employee employee)
        {
            throw new NotImplementedException();
        }
    }
}
