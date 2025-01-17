using Dapper;
using Liststored.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;


namespace Liststored.Service.MenuService
{
    public class MenuService: IMenuService
    {
        private readonly IConfiguration _configuration;

        public MenuService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<IEnumerable<MenuMaster>> GetAllMenus()
        {
            try
            {
                using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                var sql = "sp_List_MenuMaster";
                return await connection.QueryAsync<MenuMaster>(sql, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return null;
            }
        }

        public async Task<IEnumerable<MenuMaster>> GetMenuList(int pageNo, int pageSize)
        {
            try
            {
                using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                var sql = "sp_List_MenuMasterList";
                var parameters = new
                {
                    PageNo = pageNo,
                    PageSize = pageSize
                };

                return await connection.QueryAsync<MenuMaster>(sql, parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return null;
            }
        }
        public async Task<MenuMaster> GetMenuById(int id)
        {
            try
            {
                using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                var parameters = new { ID = id };
                var sql = "sp_GetMenuById";

                return await connection.QuerySingleOrDefaultAsync<MenuMaster>(sql, parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return null;
            }
        }

        public async Task<MenuMaster> SaveMenu(MenuMaster menu)
        {
            try
            {
                using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                var parameters = new
                {
                    ID = menu.Id ?? 0,
                    Parent = menu.Parent,
                    ParentId = menu.ParentId,
                    MenuTitle = menu.MenuTitle,
                    Link = menu.Link,
                    Icon = menu.Icon,
                    IsOpen = menu.IsOpen,
                    ControllerName = menu.ControllerName,
                    ActionName = menu.ActionName,
                    EnteredBy = menu.EnteredBy,
                    EnteredOn = menu.EnteredOn,
                    UpdatedBy = menu.UpdatedBy,
                    UpdatedOn = menu.UpdatedOn
                };

                var sql = "sp_IU_MenuMaster";
                return await connection.QuerySingleOrDefaultAsync<MenuMaster>(sql, parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return null;
            }
        }

        public async Task<int> DeleteMenu(int id)
        {
            try
            {
                using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                var parameters = new { ID = id };
                var sql = "sp_Delete_MenuMaster";

                var result = await connection.ExecuteAsync(sql, parameters, commandType: CommandType.StoredProcedure);
                Console.WriteLine(result);
                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return -1;
            }
        }
    }
}
