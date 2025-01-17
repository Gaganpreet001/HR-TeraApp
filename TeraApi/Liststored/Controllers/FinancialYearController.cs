using Liststored.Models;
using Liststored.Service.FinancialYearService;
using Liststored.Service.RoleService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace Liststored.Controllers
{
    [Route("api")]
    [ApiController]
    [Authorize]
    public class FinancialYearController : ControllerBase
    {
        private readonly IFinancialYearService _financialYearService;
        public FinancialYearController(IFinancialYearService financialYearService)
        {
            _financialYearService = financialYearService;
        }

        [HttpGet("GetAllFinancialYears")]
        public async Task<IActionResult> GetFinancialYears([FromQuery] int pageNo, [FromQuery] int pageSize)
        {
            var financialYear = await _financialYearService.GetAllFinancialYears(pageNo, pageSize);
            return Ok(financialYear);
        }

        [HttpGet("GetFinancialYearsAll")]
        public async Task<IActionResult> GetFinancialYearsAll()
        {
            var financialYear = await _financialYearService.GetFinancialYearAll();
            return Ok(financialYear);
        }


        [HttpGet("GetFinancialYearById/{id}")]
        public async Task<IActionResult> GetFinancialYear(int id)
        {
            var financialYear = await _financialYearService.GetFinancialYearById(id);
            if (financialYear == null) return NotFound();
            return Ok(financialYear);
        }

        [HttpPost("SaveFinancialYear")]
        public async Task<IActionResult> SaveFinancialYear(FinancialYearMaster financialYear)
        {
            var savedFinancialYear = await _financialYearService.SaveFinancialYear(financialYear);
            return Ok(savedFinancialYear);
        }

        [HttpDelete("DeleteFinancialYear/{id}")]
        public async Task<IActionResult> DeleteFinancialYear(int id)
        {
            try
            {
                var result = await _financialYearService.DeleteFinancialYear(id);
                if (result == -1 || result == 0)
                {
                    return NotFound(new { Message = $"Financial Year with ID {id} not found or could not be deleted." });
                }
                return Ok(new { Message = $"Financial Year with ID {id} successfully deleted." });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Message = "An error occurred while deleting the Financial Year.", Error = ex.Message });
            }
        }
    }
}
