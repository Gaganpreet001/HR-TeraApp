using Liststored.Models;
using Liststored.Service.MenuService;
using Liststored.Service.UserService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace Liststored.Controllers
{
    [Route("api")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService) 
        {
            _userService = userService;
        }

        [HttpGet("GetAllUsers")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userService.GetAllUsers();
            return Ok(users);
        }

        [HttpGet("GetUserList")]
        public async Task<IActionResult> GetUserList([FromQuery] int pageNo, [FromQuery] int pageSize)
        {
            try
            {
                var users = await _userService.GetUserList(pageNo, pageSize);
                return Ok(users);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetUserList: {ex.Message}");
                return StatusCode(500, new { message = "An error occurred while fetching users.", error = ex.Message });
            }
        }

        [HttpGet("GetUserById/{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _userService.GetUserById(id);
            if (user == null) return NotFound();
            return Ok(user);
        }

        [HttpPost("SaveUser")]
        public async Task<IActionResult> SaveUser(UserMaster user) // Updated parameter type
        {
            var savedUser = await _userService.SaveUser(user);
            return Ok(savedUser);
        }

        [HttpDelete("DeleteUser/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            try
            {
                var result = await _userService.DeleteUser(id);
                if (result == -1 || result == 0)
                {
                    return NotFound(new { Message = $"User with ID {id} not found or could not be deleted." });
                }
                return Ok(new { Message = $"User with ID {id} successfully deleted." });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Message = "An error occurred while deleting the user.", Error = ex.Message });
            }
        }
    }
}
