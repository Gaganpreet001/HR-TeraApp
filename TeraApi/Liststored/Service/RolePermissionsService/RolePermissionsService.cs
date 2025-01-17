using Dapper;
using Liststored.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace Liststored.Service.RolePermissionsService
{
    public class RolePermissionsService:IRolePermissionsService
    {
        private readonly IConfiguration _configuration;

        public RolePermissionsService (IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<IEnumerable<RolePermissions>> GetAllRolePermissions()
        {
            try
            {
                using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                var sql = "sp_List_RolePermissions";
                return await connection.QueryAsync<RolePermissions>(sql, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return null;
            }
        }

        public async Task<IEnumerable<RolePermissions>> GetRolePermissionsList(int pageNo, int pageSize)
        {
            try
            {
                using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                var sql = "sp_List_RolePermissionsList";
                var parameters = new
                {
                    PageNo = pageNo,
                    PageSize = pageSize
                };

                return await connection.QueryAsync<RolePermissions>(sql, parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return null;
            }
        }
        public async Task<RolePermissions> GetRolePermissionById(int id)
        {
            try
            {
                using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                var parameters = new { ID = id };
                var sql = "sp_GetRolePermissionById";

                return await connection.QuerySingleOrDefaultAsync<RolePermissions>(sql, parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return null;
            }
        }

        public async Task<IEnumerable<RolePermissions>> GetRolePermissionsByRoleId(int roleId)
        {
            try
            {
                using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                var sql = "sp_GetRolePermissionsByRoleId";
                var parameters = new
                {
                    RoleId = roleId
                };

                var result = await connection.QueryAsync<RolePermissions>(sql, parameters, commandType: CommandType.StoredProcedure);
                Console.WriteLine(result);
                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return null;
            }
        }

        public async Task<RolePermissions> SaveRolePermission(RolePermissions permission)
        {
            try
            {
                using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                var parameters = new
                {
                    ID = permission.Id ?? 0,
                    MenuId = permission.MenuId,
                    ActionName = permission.ActionName,
                    IsAdd = permission.IsAdd,
                    IsEdit = permission.IsEdit,
                    IsDelete = permission.IsDelete,
                    IsDisplay = permission.IsDisplay,
                    RoleId = permission.RoleId,
                    EnteredBy = permission.EnteredBy,
                    EnteredOn = permission.EnteredOn,
                    UpdatedBy = permission.UpdatedBy,
                    UpdatedOn = permission.UpdatedOn
                };

                var sql = "sp_IU_RolePermissions";
                return await connection.QuerySingleOrDefaultAsync<RolePermissions>(sql, parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return null;
            }
        }

        public async Task<int> DeletePermission(int id)
        {
            try
            {
                using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                var parameters = new { ID = id };
                var sql = "sp_Delete_RolePermissions";

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
