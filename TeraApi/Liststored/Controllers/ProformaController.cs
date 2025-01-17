using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Liststored.Service.ProformaService;
using Liststored.Models;
using Microsoft.AspNetCore.Authorization;


namespace Liststored.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class ProformaController : ControllerBase
    {
        private readonly IProformaService _proformaService;
        public ProformaController(IProformaService proformaService)
        {
            _proformaService = proformaService;
        }

        [HttpGet("GetProformaPanelList")]
        public async Task<ActionResult<IEnumerable<ProformaPanel>>> GetProformaPanelList([FromQuery] int pageNo, [FromQuery] int pageSize, [FromQuery] DateTime fromDate, [FromQuery] DateTime toDate)
        {
            try
            {
                var result = await _proformaService.GetProformaPanelList(pageNo, pageSize, fromDate, toDate);
                if (result == null)
                {
                    return NotFound("No Proforma List found for the given date range.");
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred while retrieving data: {ex.Message}");
            }

        }
    }
}
