using MISA.Common.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.Bussiness.Interfaces
{
    public interface IBaseService<T>
    {
        /// <summary>
        /// Lấy dữ liệu
        /// </summary>
        /// <returns></returns>
        /// CreatedBy: LVHOANG (15/10/2020)
        IEnumerable<T> Get();
        /// <summary>
        /// Lấy dữ liệu theo số trang và số lượng
        /// </summary>
        /// <returns></returns>
        /// CreatedBy: LVHOANG (15/10/2020)
        IEnumerable<T> Get(int numberpage, int amount);
        /// <summary>
        /// Lấy dữ liệu theo Khóa chính
        /// </summary>
        /// <returns></returns>
        /// CreatedBy: LVHOANG (15/10/2020)
        T GetById(Guid id);
        /// <summary>
        /// Thêm mới dữ liệu
        /// </summary>
        /// <returns></returns>
        /// CreatedBy: LVHOANG (15/10/2020)
        ServiceResponse Insert(T entity);
        /// <summary>
        /// Update dữ liệu
        /// </summary>
        /// <returns></returns>
        /// CreatedBy: LVHOANG (15/10/2020)
        int Update(T entity);
        /// <summary>
        /// Xóa dữ liệu
        /// </summary>
        /// <returns></returns>
        /// CreatedBy: LVHOANG (15/10/2020)
        int Delete(Guid id);
    }
}
