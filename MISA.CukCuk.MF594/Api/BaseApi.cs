using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.Bussiness.Interfaces;

namespace MISA.CukCuk.MF594.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApi<T> : ControllerBase
    {
        IBaseService<T> _baseService;
        public BaseApi(IBaseService<T> baseService)
        {
            _baseService = baseService;
        }
        // GET: api/<DepartmentApi>
        [HttpGet]
        public IActionResult Get()
        {
            var rs = _baseService.Get();
            if (rs != null)
                return Ok(rs);
            else
                return NoContent();
        }

        /// <summary>
        /// Lấy thông tin nhân viên theo Id
        /// </summary>
        /// <param name="id">Id của nhân viên</param>
        /// <returns></returns>
        /// CreatedBy: NVMANH (13/10/2020)
        [HttpGet("{id}")]
        public IActionResult Get([FromRoute] Guid id)
        {
            var employee = _baseService.GetById(id);
            if (employee != null)
                return Ok(employee);
            else
                return NoContent();
        }
        /// <summary>
        /// Lấy số lượng bản ghi trong 1 trang
        /// Phân trang
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// CreatedBy: LVHOANG(20/10/2020)
        [HttpGet("{numberpage}/{amount}")]
        public IActionResult Get([FromRoute] int numberpage,int amount)
        {
            var employee = _baseService.Get(numberpage, amount);
            if (employee != null)
                return Ok(employee);
            else
                return NoContent();
        }

        // POST api/<EmployeesApi>
        [HttpPost]
        public IActionResult Post([FromBody] T employee)
        {
            var serviceResponse = _baseService.Insert(employee);
            var affectRows = serviceResponse.Data != null ? ((int)serviceResponse.Data) : 0;
            if ( affectRows > 0)
                return CreatedAtAction("POST", affectRows);
            else
                return BadRequest(serviceResponse);
        }

        // PUT api/<EmployeesApi>/5
        [HttpPut]
        public int Put([FromBody] T entity)
        {
            return _baseService.Update(entity);
        }

        // DELETE api/<EmployeesApi>/5
        [HttpDelete("{id}")]
        public int Delete(Guid id)
        {
             return _baseService.Delete(id);
        }

    }
}
