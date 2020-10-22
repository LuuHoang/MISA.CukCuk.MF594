using MISA.Common.Properties;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Resources;

namespace MISA.Common.Models
{
    public partial class Employee
    {
        public Employee()
        {
            EmployeeId = Guid.NewGuid();
        }
        /// <summary>
        /// Khóa chính bảng nhân viên
        /// Author:LVHOANG (10/10/2020)
        /// </summary>
        public Guid EmployeeId { get; set; }
        /// <summary>
        /// Mã nhân viên
        /// Author:LVHOANG (10/10/2020)
        /// </summary>
        public string EmployeeCode { get; set; }
        /// <summary>
        /// Tên nhân viên
        /// Author:LVHOANG (10/10/2020)
        /// </summary>
        public string EmployeeName { get; set; }
        /// <summary>
        /// Ngày Sinh
        /// Author:LVHOANG (10/10/2020)
        /// </summary>
        public DateTime? DateOfBirth { get; set; }
        /// <summary>
        /// Mã Giới tính (0 -1 -2)
        /// Author:LVHOANG (10/10/2020)
        /// </summary>
        public int? Gender { get; set; }
        /// <summary>
        /// Tên giới tính Nam Nữ , không xác định ,...
        /// Author:LVHOANG (10/10/2020)
        /// </summary>

        public string GenderName
        {
            get
            {
                switch (Gender)
                {
                    case 0:
                        return "Nữ";
                    case 1:
                        return "Nam";
                    case 2:
                        return "Khác";
                    default:
                        return "Không xác định";
                }
            }
        }
        /// <summary>
        /// Email của nhân viên
        /// Author:LVHOANG (10/10/2020)
        /// </summary>
        public string Email { get; set; }
        /// <summary>
        /// Số điện thoại
        /// Author:LVHOANG (10/10/2020)
        /// </summary>
        public string PhoneNumber { get; set; }
        /// <summary>
        /// Khóa chính Chức vụ
        /// Author:LVHOANG (10/10/2020)
        /// </summary>
        public Guid? PossitionId { get; set; }
        /// <summary>
        /// Tên Chức vụ
        /// Author:LVHOANG (10/10/2020)
        /// </summary>
        public string PossitionName { get; set; }
        /// <summary>
        /// Khóa chính bảng Phòng ban
        /// Author:LVHOANG (10/10/2020)
        /// </summary>
        public Guid? DepartmentId { get; set; }
        /// <summary>
        /// Tên phòng ban
        /// Author:LVHOANG (10/10/2020)
        /// </summary>
        public string DepartmentName { get; set; }
        /// <summary>
        /// Mã số thuế
        /// Author:LVHOANG (10/10/2020)
        /// </summary>
        public string TaxCode { get; set; }
        /// <summary>
        /// Lương
        /// Author:LVHOANG (10/10/2020)
        /// </summary>
        public double? Salary { get; set; }
        /// <summary>
        /// Ngày gia nhập công ty
        /// Author:LVHOANG (10/10/2020)
        /// </summary>
        public DateTime? JoinDate { get; set; }
        /// <summary>
        /// Mã Trạng thái công việc
        /// Author:LVHOANG (10/10/2020)
        /// </summary>
        public int? WorkStatus { get; set; }
        /// <summary>
        /// Tên Trạng thái công việc
        /// Author:LVHOANG (10/10/2020)
        /// </summary>
        public string WorkStatusName
        {
            get
            {
                if (WorkStatus == null)
                    return string.Empty;
                switch ((WorkStatus)WorkStatus)
                {
                    case Models.WorkStatus.Stopped:
                        return ResourcesVN.Enum_WorkStatus_Stopped;
                    case Models.WorkStatus.Working:
                        return ResourcesVN.Enum_WorkStatus_Working;
                    case Models.WorkStatus.Waiting:
                        return ResourcesVN.Enum_WorkStatus_Waitiing;
                    default:
                        return string.Empty;
                }
            }
        }
        /// <summary>
        /// Số Chức minh nhân dân , hộ chiếu
        /// Author:LVHOANG (10/10/2020)
        /// </summary>

        public string IdentityNumber { get; set; }
        /// <summary>
        /// Ngày cấp Số Chức minh nhân dân , hộ chiếu
        /// Author:LVHOANG (10/10/2020)
        /// </summary>
        public DateTime? IdentityDate { get; set; }
        /// <summary>
        /// Nơi cấp Số Chức minh nhân dân , hộ chiếu
        /// Author:LVHOANG (10/10/2020)
        /// </summary>
        public string IdentityPlace { get; set; }

    }
}
