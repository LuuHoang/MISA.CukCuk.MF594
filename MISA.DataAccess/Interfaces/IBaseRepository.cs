using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.DataAccess.Interfaces
{
    public interface IBaseRepository<T>
    {
        /// <summary>
        /// Lấy dữ liệu
        /// CreatedBy: LVHOANG (15/10/2020)
        /// </summary>
        /// <returns></returns>
        IEnumerable<T> Get();
        /// <summary>
        /// Lấy dữ liệu theo số trang và số lượng
        /// CreatedBy: LVHOANG (15/10/2020)
        /// </summary>
        /// <returns></returns>
        /// CreatedBy: LVHOANG (15/10/2020)
        IEnumerable<T> Get(int numberpage, int amount);
        /// <summary>
        /// Lấy dữ liệu bảng ghi theo Khóa chính
        /// CreatedBy: LVHOANG (15/10/2020)
        /// </summary>
        /// <returns></returns>
        T GetById(Guid id);
        /// <summary>
        /// Thêm mới dữ liệu
        /// CreatedBy: LVHOANG (15/10/2020)
        /// </summary>
        /// <returns></returns>
        int Insert(T entity);
        /// <summary>
        /// Chỉnh sửa dữ liệu
        /// CreatedBy: LVHOANG (15/10/2020)
        /// </summary>
        /// <returns></returns>
        int Update(T entity);
        /// <summary>
        /// Xóa dữ liệu
        /// CreatedBy: LVHOANG (15/10/2020)
        /// </summary>
        /// <returns></returns>
        int Delete(Guid id);
    }
}
