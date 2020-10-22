using MISA.Common.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.DataAccess.Interfaces
{
    public interface IDatabaseContext<T>
    {
        /// <summary>
        /// Lớp Interface Lấy ra danh sách 
        /// Author: LVHOANG(20/10/2020)
        /// </summary>
        /// <returns></returns>
        IEnumerable<T> Get();
        /// <summary>
        /// Lớp Interface Lấy ra danh sách khi truyền vào Proc
        /// Author: LVHOANG(20/10/2020)
        /// </summary>
        /// <returns></returns>
        IEnumerable<T> Get(string storeName);
        /// <summary>
        /// Lớp Interface Lấy ra danh sách 
        /// Author: LVHOANG(20/10/2020)
        /// </summary>
        /// <returns></returns>
        object Get(string storeName, string code);
        /// <summary>
        /// Lớp Interface Lấy ra danh sách 
        /// Author: LVHOANG(20/10/2020)
        /// </summary>
        /// <returns></returns>
        IEnumerable<T> Get(int numberpage,int amount);
        /// <summary>
        /// Lớp Interface Lấy ra thông tin Theo Khóa chính
        /// Author: LVHOANG(20/10/2020)
        /// </summary>
        /// <returns></returns>
        T GetById(object id);
        /// <summary>
        /// Lớp Interface Thêm mới thông tin vào
        /// Author: LVHOANG(20/10/2020)
        /// </summary>
        /// <returns></returns>
        int Insert(T entity);
        /// <summary>
        /// Lớp Interface Sửa chữa thông tin  
        /// Author: LVHOANG(20/10/2020)
        /// </summary>
        /// <returns></returns>
        int Update(T entity);
        /// <summary>
        /// Lớp Interface Xóa đối tượng theo Id
        /// Author: LVHOANG(20/10/2020)
        /// </summary>
        /// <returns></returns>
        int Delete(object id);
    }
}
