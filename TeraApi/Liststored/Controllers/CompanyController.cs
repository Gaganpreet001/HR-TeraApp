using Liststored.Models;
using Liststored.Service.CompanyService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Liststored.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CompanyController : ControllerBase
    {
        private readonly ICompanyService _companyService;

        public CompanyController(ICompanyService companyService)
        {
            _companyService = companyService;
        }

        [HttpGet]
        public async Task<IActionResult> GetCompanies()
        {
            var companies = await _companyService.GetAllCompaniesAsync();
            return Ok(companies);
        }

        [HttpGet("GetCompanyList")]
        public async Task<IActionResult> GetCompanyList([FromQuery] int pageNo, [FromQuery] int pageSize)
        {
            var companies = await _companyService.GetCompanyList(pageNo, pageSize);
            return Ok(companies);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCompany(int id)
        {
            var company = await _companyService.GetCompanyByIdAsync(id);
            if (company == null) return NotFound();
            return Ok(company);
        }

        [HttpPost]
        public async Task<IActionResult> SaveCompany(CompanyMaster company)
        {
            var savedCompany = await _companyService.SaveCompanyAsync(company);
            return Ok(savedCompany);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompany(int id)
        {
            try
            {
                var result = await _companyService.DeleteCompanyAsync(id);
                if (result == -1  || result == 0)
                {
                    return NotFound(new { Message = $"Company with ID {id} not found or could not be deleted." });
                }
                return Ok(new { Message = $"Company with ID {id} successfully deleted." });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Message = "An error occurred while deleting the company.", Error = ex.Message });
            }
        }
    }
}
