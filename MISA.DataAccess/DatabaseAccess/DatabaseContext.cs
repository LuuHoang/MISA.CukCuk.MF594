using MISA.Common.Models;
using MISA.DataAccess.Interfaces;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace MISA.DataAccess.DatabaseAccess
{
    public class DatabaseContext<T> : IDisposable, IDatabaseContext<T>
    {
        #region DECLARE
        readonly string _connectionString = "User Id=nvmanh;Password=12345678@Abc;Host=35.194.166.58;Port=3306;Database=MISACukCuk_F09_LVHOANG;Character Set=utf8";
        MySqlConnection _sqlConnection;
        MySqlCommand _sqlCommand;
        #endregion

        #region CONSTRUCTOR
        public DatabaseContext()
        {
            // Khởi tạo kết nối:
            _sqlConnection = new MySqlConnection(_connectionString);
            _sqlConnection.Open();
            // Đối tượng xử lý command:
            _sqlCommand = _sqlConnection.CreateCommand();
            _sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
        }
        #endregion

        #region METHOD
        /// <summary>
        /// Phương thức Xóa cho lớp base
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// Author: LVHOANG(21/10/2020)
        public int Delete(object id)
        {
            var entityName = typeof(T).Name;
            _sqlCommand.Parameters.Clear();
            _sqlCommand.CommandText = $"Proc_Delete{entityName}ById";
            //_sqlCommand.Parameters.AddWithValue($"@{entityName}Id", id);
            MySqlCommandBuilder.DeriveParameters(_sqlCommand);
            if (_sqlCommand.Parameters.Count > 0)
            {
                _sqlCommand.Parameters[0].Value = id;
            }
            var affectRows = _sqlCommand.ExecuteNonQuery();
            return affectRows;
        }

        /// <summary>
        /// Chức năng Lấy ra thông tin lớp theo Khóa chính
        /// </summary>
        /// <param name="employeeId"></param>
        /// <returns></returns>
        /// Author: LVHOANG(21/10/2020)
        public T GetById(object entityId)
        {
            var className = typeof(T).Name;
            _sqlCommand.CommandText = $"Proc_Get{className}ById";
            var EntityId = "@" + className + "Id";
            //_sqlCommand.Parameters.AddWithValue("@EmployeeId", entityId);
            _sqlCommand.Parameters.AddWithValue(EntityId, entityId);
            MySqlDataReader mySqlDataReader = _sqlCommand.ExecuteReader();
            while (mySqlDataReader.Read())
            {
                var employee = Activator.CreateInstance<T>();
                for (int i = 0; i < mySqlDataReader.FieldCount; i++)
                {
                    var columnName = mySqlDataReader.GetName(i);
                    var value = mySqlDataReader.GetValue(i);
                    var propertyInfo = employee.GetType().GetProperty(columnName);
                    if (propertyInfo != null && value != DBNull.Value)
                        propertyInfo.SetValue(employee, value);
                }
                return employee;
            }
            return default;
        }
        /// <summary>
        /// Lấy ra bảng danh sách thông tin
        /// </summary>
        /// <returns></returns>
        /// Author: LVHOANG(21/10/2020)
        public IEnumerable<T> Get()
        {
            var entities = new List<T>();
            var className = typeof(T).Name;
            _sqlCommand.CommandText = $"Proc_Get{className}s";
            // Thực hiện đọc dữ liệu:
            MySqlDataReader mySqlDataReader = _sqlCommand.ExecuteReader();
            while (mySqlDataReader.Read())
            {
                var entity = Activator.CreateInstance<T>();
                //employee.EmployeeId = mySqlDataReader.GetGuid(0);
                //employee.EmployeeCode = mySqlDataReader.GetString(1);
                //employee.FullName = mySqlDataReader.GetString(2);

                for (int i = 0; i < mySqlDataReader.FieldCount; i++)
                {
                    var columnName = mySqlDataReader.GetName(i);
                    var value = mySqlDataReader.GetValue(i);
                    var propertyInfo = entity.GetType().GetProperty(columnName);
                    if (propertyInfo != null && value != DBNull.Value)
                        propertyInfo.SetValue(entity, value);
                }
                entities.Add(entity);
            }
            // 1. Kết nối với Database:
            // 2. Thực thi command lấy dữ liệu:
            // Trả về:
            return entities;
        }
        /// <summary>
        /// Thêm mới trong lớp Base (Insert Database)
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        /// Author: LVHOANG(21/10/2020)
        public int Insert(T entity)
        {
            var entityName = typeof(T).Name;
            _sqlCommand.Parameters.Clear();
            _sqlCommand.CommandText = $"Proc_Insert{entityName}";
            MySqlCommandBuilder.DeriveParameters(_sqlCommand);
            var parameters = _sqlCommand.Parameters;
            var properties = typeof(T).GetProperties();
            // Cách 1:
            //foreach (var property in properties)
            //{
            //    var propertyName = property.Name;
            //    var propertyValue = property.GetValue(entity);
            //    foreach (MySqlParameter param in parameters)
            //    {
            //        var paramName = param.ParameterName;
            //        if (paramName == $"@{propertyName}")
            //            param.Value = propertyValue;
            //    }
            //}

            // Cách 2:
            foreach (MySqlParameter param in parameters)
            {
                var paramName = param.ParameterName.Replace("@", string.Empty);
                var property = entity.GetType().GetProperty(paramName, BindingFlags.IgnoreCase|BindingFlags.Public|BindingFlags.Instance);
                if (property != null)
                    param.Value = property.GetValue(entity);
            }
            var affectRows = _sqlCommand.ExecuteNonQuery();
            return affectRows;
        }
        /// <summary>
        /// Chỉnh Sửa thông tin của lớp Base
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        /// Author: LVHOANG(21/10/2020)
        public int Update(T entity)
        {
            var entityName = typeof(T).Name;
            _sqlCommand.Parameters.Clear();
            _sqlCommand.CommandText = $"Proc_Update{entityName}";
            MySqlCommandBuilder.DeriveParameters(_sqlCommand);
            var parameters = _sqlCommand.Parameters;
            var properties = typeof(T).GetProperties();
            // Cách 2:
            foreach (MySqlParameter param in parameters)
            {
                var paramName = param.ParameterName.Replace("@", string.Empty);
                var property = entity.GetType().GetProperty(paramName, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
                if (property != null)
                    param.Value = property.GetValue(entity);
            }
            var affectRows = _sqlCommand.ExecuteNonQuery();
            return affectRows;
        }
        /// <summary>
        /// Đóng kết nối database
        /// </summary>
        /// Author: LVHOANG(21/10/2020)
        public void Dispose()
        {
            _sqlConnection.Close();
        }
        /// <summary>
        /// Lấy ra danh sách bảng tin khi truyền vào 1 chuỗi Proc
        /// </summary>
        /// <param name="storeName"></param>
        /// <returns></returns>
        /// Author: LVHOANG(21/10/2020)
        public IEnumerable<T> Get(string storeName)
        {
            var entities = new List<T>();
            _sqlCommand.CommandText = storeName;
            // Thực hiện đọc dữ liệu:
            MySqlDataReader mySqlDataReader = _sqlCommand.ExecuteReader();
            while (mySqlDataReader.Read())
            {
                var entity = Activator.CreateInstance<T>();
                //employee.EmployeeId = mySqlDataReader.GetGuid(0);
                //employee.EmployeeCode = mySqlDataReader.GetString(1);
                //employee.FullName = mySqlDataReader.GetString(2);

                for (int i = 0; i < mySqlDataReader.FieldCount; i++)
                {
                    var columnName = mySqlDataReader.GetName(i);
                    var value = mySqlDataReader.GetValue(i);
                    var propertyInfo = entity.GetType().GetProperty(columnName);
                    if (propertyInfo != null && value != DBNull.Value)
                        propertyInfo.SetValue(entity, value);
                }
                entities.Add(entity);
            }
            // 1. Kết nối với Database:
            // 2. Thực thi command lấy dữ liệu:
            // Trả về:
            return entities;
        }
        /// <summary>
        /// Lấy ra thông đối tượng khi truyền vào Proc và mã đối tượng
        /// </summary>
        /// <param name="storeName"></param>
        /// <param name="code"></param>
        /// <returns></returns>
        /// Author: LVHOANG(21/10/2020)
        public object Get(string storeName, string code)
        {
            _sqlCommand.Parameters.Clear();
            _sqlCommand.CommandText = storeName;
            _sqlCommand.Parameters.AddWithValue("@EmployeeCode", code);
            // Thực hiện đọc dữ liệu:
            return _sqlCommand.ExecuteScalar();
            
        }
        /// <summary>
        /// Lấy ra bảng tin khi truyền tham số,số lượng và số trang
        /// </summary>
        /// <param name="numberpage"></param>
        /// <param name="amount"></param>
        /// <returns></returns>
        /// Author: LVHOANG(21/10/2020)
        public IEnumerable<T> Get(int numberpage, int amount)
        {
            var entities = new List<T>();
            var className = typeof(T).Name;
            _sqlCommand.CommandText = $"Proc_Get{className}sPage";
            _sqlCommand.Parameters.AddWithValue($"@NumberPage", numberpage);
            _sqlCommand.Parameters.AddWithValue($"@Amount", amount);
            // Thực hiện đọc dữ liệu:
            MySqlDataReader mySqlDataReader = _sqlCommand.ExecuteReader();
            while (mySqlDataReader.Read())
            {
                var entity = Activator.CreateInstance<T>();
                //employee.EmployeeId = mySqlDataReader.GetGuid(0);
                //employee.EmployeeCode = mySqlDataReader.GetString(1);
                //employee.FullName = mySqlDataReader.GetString(2);

                for (int i = 0; i < mySqlDataReader.FieldCount; i++)
                {
                    var columnName = mySqlDataReader.GetName(i);
                    var value = mySqlDataReader.GetValue(i);
                    var propertyInfo = entity.GetType().GetProperty(columnName);
                    if (propertyInfo != null && value != DBNull.Value)
                        propertyInfo.SetValue(entity, value);
                }
                entities.Add(entity);
            }
            // 1. Kết nối với Database:
            // 2. Thực thi command lấy dữ liệu:
            // Trả về:
            return entities;
        }


        #endregion
    }
}
