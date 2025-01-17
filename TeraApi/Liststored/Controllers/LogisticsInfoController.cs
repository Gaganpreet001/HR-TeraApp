using Liststored.Service.LogisticsInfoService;
using Liststored.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Liststored.Models;

namespace Liststored.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class LogisticsInfoController : ControllerBase
    {
        private readonly ILogisticsInfoService logisticsInfoService;

        public LogisticsInfoController(ILogisticsInfoService logisticsInfoService)
        {
            this.logisticsInfoService = logisticsInfoService;
        }

        // Get all LogisticInfo records
        [HttpGet]
        public async Task<ActionResult<List<LogisticsInfo>>> GetAllLogisticsInfo()
        {
            var logisticsInfo = await logisticsInfoService.GetAllLogisticsInfo(); 
            return Ok(logisticsInfo);
        }

        // Get LogisticInfo by Id
        [HttpGet("{id}")]
        public async Task<ActionResult<LogisticsInfo>> GetLogisticsInfoById(int id)
        {
            var logisticsInfo = await logisticsInfoService.GetLogisticsInfoById(id);
            if (logisticsInfo == null)
            {
                return NotFound();
            }
            return Ok(logisticsInfo);
        }
        // Save (Add or Update) LogisticsInfo
        [HttpPost("save")]
        public async Task<ActionResult<LogisticsInfo>> SaveLogisticsInfo(LogisticsInfo logisticsInfo)
        {
            try
            {
                var savedLogisticsInfo = await logisticsInfoService.SaveLogisticsInfo(logisticsInfo);
                if (savedLogisticsInfo == null)
                {
                    return BadRequest("Failed to save LogisticsInfo.");
                }
                return Ok(savedLogisticsInfo);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in SaveLogisticsInfo: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while saving the logistics information.");
            }
        }

        // Add a new  LogisticsInfo
        [HttpPost]
        public async Task<ActionResult<LogisticsInfo>> AddLogisticInfo(LogisticsInfo logisticsInfo)
        {
            var newLogisticsInfo = await logisticsInfoService.AddLogisticsInfo(logisticsInfo);
            return Ok(newLogisticsInfo);
        }


        // Update an existing LogisticsInfo
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLogisticsInfo(int id, LogisticsInfo logisticsInfo)
        {
            var existingLogisticsInfo = await logisticsInfoService.GetLogisticsInfoById(id);
            if (existingLogisticsInfo == null)
            {
                return BadRequest();
            }

            var updatedlogisticsInfo = await logisticsInfoService.UpdateLogisticsInfo(id, logisticsInfo);
            return Ok(updatedlogisticsInfo);
        }

        // Delete logisticsInfo by Id
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLogisticInfo(int id)
        {
            var result = await logisticsInfoService.DeleteLogisticsInfo(id);
            if (result == false)
            {
                return NotFound();
            }

            return Ok();
        }

    }
}
