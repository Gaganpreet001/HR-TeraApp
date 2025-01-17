using Liststored.Models;
using Liststored.Service.RolePermissionsService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Liststored.Controllers
{
    [Route("api")]
    [ApiController]
    [Authorize]
    public class RolePermissionsController : ControllerBase
    {
        private readonly IRolePermissionsService _permissionService;

        public RolePermissionsController(IRolePermissionsService permissionService)
        {
            _permissionService = permissionService;
        }


        [HttpGet("GetAllPermissions")]
        public async Task<IActionResult> GetPermissions()
        {
            var permissions = await _permissionService.GetAllRolePermissions();
            return Ok(permissions);
        }

        // For Pagination
        [HttpGet("GetPermissionsList")]
        public async Task<IActionResult> GetPermissionsList([FromQuery] int pageNo, [FromQuery] int pageSize)
        {
            var permissions = await _permissionService.GetRolePermissionsList(pageNo, pageSize);
            return Ok(permissions);
        }

        // Get RolePermissionsByRoleId
        [HttpGet("GetRolePermissionByRoleId")]
        public async Task<IActionResult> GetRolePermissionByRoleId([FromQuery] int roleId)
        {
            var permissions = await _permissionService.GetRolePermissionsByRoleId(roleId);
            return Ok(permissions);
        }

        // Get By Id
        [HttpGet("GetRolePermissionById/{id}")]
        public async Task<IActionResult> GetPermissionById(int id)
        {
            var permission = await _permissionService.GetRolePermissionById(id);
            if (permission == null) return NotFound();
            return Ok(permission);
        }

        [HttpPost("SaveRolePermission")]
        public async Task<IActionResult> SaveRolePermission(RolePermissions permission)
        {
            try
            {
                if (permission == null)
                {
                    return BadRequest("Permission data cannot be null.");
                }

                var savedRolePermission = await _permissionService.SaveRolePermission(permission);
                return Ok(savedRolePermission);
            }
            catch (Exception ex)
            {
               
                // Return a generic error response to the client
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "An error occurred while saving the role permission. Please try again later.");
            }
        }


        // Delete Role Permission
        [HttpDelete("DeleteRolePermission/{id}")]
        public async Task<IActionResult> DeleteCompany(int id)
        {
            try
            {
                var result = await _permissionService.DeletePermission(id);
                if (result == -1 || result == 0)
                {
                    return NotFound(new { Message = $"Role Permission with ID {id} not found or could not be deleted." });
                }
                return Ok(new { Message = $"Role Permission with ID {id} successfully deleted." });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Message = "An error occurred while deleting the RolePermission.", Error = ex.Message });
            }
        }
    }
}
