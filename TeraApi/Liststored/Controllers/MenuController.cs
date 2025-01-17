using Liststored.Models;
using Liststored.Service.MenuService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Liststored.Controllers
{
    [Route("api")]
    [ApiController]
    [Authorize]
    public class MenuController : ControllerBase
    {
        private readonly IMenuService _menuService;

        public MenuController(IMenuService menuService)
        {
            _menuService = menuService;
        }

        [HttpGet("GetAllMenus")]
        public async Task<IActionResult> GetMenus()
        {
            var menus = await _menuService.GetAllMenus();
            return Ok(menus);
        }
        [HttpGet("GetMenuList")]
        public async Task<IActionResult> GetMenuList([FromQuery] int pageNo, [FromQuery] int pageSize)
        {
            try
            {
                var menus = await _menuService.GetMenuList(pageNo, pageSize);
                return Ok(menus);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetMenus: {ex.Message}");
                return StatusCode(500, new { message = "An error occurred while fetching menus.", error = ex.Message });
            }
        }

        [HttpGet("GetMenuById/{id}")]
        public async Task<IActionResult> GetMenu(int id)
        {
            var menu = await _menuService.GetMenuById(id);
            if (menu == null) return NotFound();
            return Ok(menu);
        }

        [HttpPost("SaveMenu")]
        public async Task<IActionResult> SaveMenu(MenuMaster menu)
        {
            var savedMenu = await _menuService.SaveMenu(menu);
            return Ok(savedMenu);
        }

        [HttpDelete("DeleteMenu/{id}")]
        public async Task<IActionResult> DeleteMenu(int id)
        {
            try
            {
                var result = await _menuService.DeleteMenu(id);
                if (result == -1 || result == 0)
                {
                    return NotFound(new { Message = $"Menu with ID {id} not found or could not be deleted." });
                }
                return Ok(new { Message = $"Menu with ID {id} successfully deleted." });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Message = "An error occurred while deleting the menu.", Error = ex.Message });
            }
        }

    }
}
