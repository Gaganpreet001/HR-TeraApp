using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Liststored.Service.LogisticService;
using Liststored.Models;
using Microsoft.AspNetCore.Authorization;

namespace Liststored.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class LogisticsController : ControllerBase
    {
        private readonly ILogisticsService _logisticsService;    
        public LogisticsController(ILogisticsService logisticsService) { 
            _logisticsService = logisticsService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LogisticsPanel>>> Get([FromQuery] DateTime fromDate, [FromQuery] DateTime toDate)
        {
            try
            {
                var results = await _logisticsService.GetLogisticsPanelAsync(fromDate, toDate);
                if (results == null)
                {
                    return NotFound("No logistics data found for the given date range.");
                }
                return Ok(results);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred while retrieving data: {ex.Message}");
            }
        }

        // Get logistics data by PI No and Invoice No
        [HttpGet("GetLogisticsById")]
        public async Task<ActionResult<IEnumerable<LogisticsPanel>>> GetById([FromQuery] float? piNo, [FromQuery] float? invoiceNo)
        {
            try
            {
                var results = await _logisticsService.GetLogisticsById(piNo, invoiceNo);

                if (results == null)
                {
                    return NotFound("No logistics data found for the given PI No and Invoice No.");
                }
                return Ok(results);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred while retrieving data: {ex.Message}");
            }
        }

        [HttpPost("SaveLogisticsInfo")]
        public async Task<ActionResult> SaveLogisticsInfo([FromBody] LogisticsInfo logisticsInfo)
        {
            if (logisticsInfo == null)
            {
                return BadRequest(new { message = "Invalid logistics information." });
            }
            try
            {
                var savedLogisticsInfo = await _logisticsService.SaveLogisticsInfoAsync(logisticsInfo);

                if (savedLogisticsInfo != null)
                {
                    return Ok(savedLogisticsInfo);
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Failed to save logistics information." });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = $"An error occurred: {ex.Message}" });
            }
        }
        
        [HttpGet("GetLogisticsDataPages")]
        public async Task<ActionResult> GetLogisticsDataPages([FromQuery] int pageNo, [FromQuery] int pageSize, [FromQuery] DateTime fromDate, [FromQuery] DateTime toDate)
        {   
            try
            {
                var (data, totalCount) = await _logisticsService.GetLogisticsPanelData(pageNo, pageSize, fromDate, toDate);
                if (data == null)
                {
                    return NotFound("No logistics data found for the given date range.");
                }
                var response = new
                {
                    Data = data,
                    TotalCount = totalCount
                };
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred while retrieving data: {ex.Message}");
            }
        }

    }
}
