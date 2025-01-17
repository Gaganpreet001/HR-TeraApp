using Dapper;
using Liststored.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace Liststored.Service.RoleService
{
    public class RoleService : IRoleService
    {
        private readonly IConfiguration _configuration;

        public RoleService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<IEnumerable<RoleMaster>> GetAllRoles(int pageNo, int pageSize)
        {
            try
            {
                using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

                var parameters = new
                {
                    PageNo = pageNo,
                    PageSize = pageSize
                };

                var sql = "sp_List_RoleMaster";
                return await connection.QueryAsync<RoleMaster>(sql,parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return null;
            }
        }

        public async Task<RoleMaster> GetRoleById(int id)
        {
            try
            {
                using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                var parameters = new { ID = id };
                var sql = "sp_GetRoleById";

                return await connection.QuerySingleOrDefaultAsync<RoleMaster>(sql, parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return null;
            }
        }

        public async Task<RoleMaster> SaveRole(RoleMaster role)
        {
            try
            {
                using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                var parameters = new
                {
                    ID = role.Id ?? 0,
                    RoleName = role.RoleName,
                    Description = role.Description,
                    EnteredBy = role.EnteredBy,
                    EnteredOn = role.EnteredOn,
                    UpdatedBy = role.UpdatedBy,
                    UpdatedOn = role.UpdatedOn
                };

                var sql = "sp_IU_RoleMaster";
                return await connection.QuerySingleOrDefaultAsync<RoleMaster>(sql, parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return null;
            }
        }

        public async Task<int> DeleteRole(int id)
        {
            try
            {
                using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                var parameters = new { ID = id };
                var sql = "sp_Delete_RoleMaster";

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
