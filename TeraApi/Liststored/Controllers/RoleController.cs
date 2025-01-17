using Liststored.Models;
using Liststored.Service.RoleService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Liststored.Controllers
{
    [Route("api")]
    [ApiController]
    [Authorize]
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _roleService;
        public RoleController(IRoleService roleService)
        {
            _roleService = roleService;
        }

        [HttpGet("GetAllRoles")]
        public async Task<IActionResult> GetRoles([FromQuery] int pageNo, [FromQuery] int pageSize)
        {
            try
            {
                var roles = await _roleService.GetAllRoles(pageNo, pageSize);
                return Ok(roles);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetRoles: {ex.Message}");
                return StatusCode(500, new { message = "An error occurred while fetching roles.", error = ex.Message });
            }
        }

        [HttpGet("GetRoleById/{id}")]
        public async Task<IActionResult> GetRole(int id)
        {
            var role = await _roleService.GetRoleById(id);
            if (role == null) return NotFound();
            return Ok(role);
        }

        [HttpPost("SaveRole")]
        public async Task<IActionResult> SaveRole(RoleMaster role)
        {
            var savedRole = await _roleService.SaveRole(role);
            return Ok(savedRole);
        }

        [HttpDelete("DeleteRole/{id}")]
        public async Task<IActionResult> DeleteRole(int id)
        {
            try
            {
                var result = await _roleService.DeleteRole(id);
                if (result == -1 || result == 0)
                {
                    return NotFound(new { Message = $"Role with ID {id} not found or could not be deleted." });
                }
                return Ok(new { Message = $"Role with ID {id} successfully deleted." });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Message = "An error occurred while deleting the company.", Error = ex.Message });
            }
        }
    }
}
