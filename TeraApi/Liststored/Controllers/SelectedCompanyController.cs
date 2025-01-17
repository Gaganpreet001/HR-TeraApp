using Liststored.Service.SelectedCompanyService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Liststored.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SelectedCompanyController : ControllerBase
    {
        private readonly ISelectedCompanyService _selectedCompanyService;

        public SelectedCompanyController(ISelectedCompanyService selectedCompanyService)
        {
            _selectedCompanyService = selectedCompanyService;
        }
 
        [HttpGet]
        public async Task<IActionResult> GetSelectedCompanies(int userId)
        {
            var companies = await _selectedCompanyService.GetSelectedCompanyByUserId(userId);   
            return Ok(companies);
        }
    }
}
