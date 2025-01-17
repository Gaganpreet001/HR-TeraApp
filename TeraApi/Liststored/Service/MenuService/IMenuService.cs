using Liststored.Models;

namespace Liststored.Service.MenuService
{
    public interface IMenuService
    {
        Task<IEnumerable<MenuMaster>> GetAllMenus();
        Task<IEnumerable<MenuMaster>> GetMenuList(int pageNo, int pageSize);
        Task<MenuMaster> GetMenuById(int id);
        Task<MenuMaster> SaveMenu(MenuMaster menu);
        Task<int> DeleteMenu(int id);
    }
}
