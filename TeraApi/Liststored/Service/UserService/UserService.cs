using Dapper;
using Liststored.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Liststored.Service.UserService
{
    public class UserService: IUserService
    {
        private readonly IConfiguration _configuration;

        public UserService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<IEnumerable<UserMaster>> GetAllUsers()
        {
            try
            {
                using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                var sql = "sp_List_UserMaster";
                return await connection.QueryAsync<UserMaster>(sql, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return null;
            }
        }

        public async Task<IEnumerable<UserMaster>> GetUserList(int pageNo, int pageSize)
        {
            try
            {
                using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                var sql = "sp_List_UserMasterList";
                var parameters = new
                {
                    PageNo = pageNo,
                    PageSize = pageSize
                };

                return await connection.QueryAsync<UserMaster>(sql, parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return null;
            }
        }

        public async Task<UserMaster> GetUserById(int id)
        {
            try
            {
                using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                var parameters = new { ID = id };
                var sql = "sp_GetUserById";

                var user = await connection.QuerySingleOrDefaultAsync<UserMaster>(sql, parameters, commandType: CommandType.StoredProcedure);

                // Fetch the SelectedCompanies list for the user
                if (user != null)
                {
                    var companiesSql = "sp_GetSelectedCompaniesByUserId";
                    user.SelectedCompanies = (await connection.QueryAsync<SelectedCompany>(
                        companiesSql,
                        new { UserId = id },
                        commandType: CommandType.StoredProcedure)).ToList();
                }

                return user;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return null;
            }
        }

        public async Task<UserMaster> SaveUser(UserMaster user)
        {
            try
            {
                using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

                // Save UserMaster details
                var parameters = new
                {
                    ID = user.Id ?? 0,
                    FullName = user.FullName,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    UserName = user.UserName,
                    Password = user.Password,
                    RoleId = user.RoleId,
                    Email = user.Email,
                    EmailPassword = user.EmailPassword,
                    MobileNo = user.MobileNo,
                    EnteredBy = user.EnteredBy,
                    EnteredOn = user.EnteredOn,
                    UpdatedBy = user.UpdatedBy,
                    UpdatedOn = user.UpdatedOn
                };

                var sql = "sp_IU_UserMaster";
                var savedUser = await connection.QuerySingleOrDefaultAsync<UserMaster>(sql, parameters, commandType: CommandType.StoredProcedure);

                if (savedUser == null)
                {
                    throw new Exception("Failed to save UserMaster.");
                }

                // Fetch existing SelectedCompanies for the user
                var existingSelectedCompanies = (await connection.QueryAsync<SelectedCompany>(
                    "SELECT Id, CompanyId FROM SelectedCompany WHERE UserId = @UserId",
                    new { UserId = savedUser.Id }
                )).ToList();

                var providedCompanies = user.SelectedCompanies ?? new List<SelectedCompany>();

                // Compare and determine changes
                var companiesToDelete = existingSelectedCompanies
                    .Where(ec => !providedCompanies.Any(pc => pc.Id == ec.Id))
                    .ToList();

                var companiesToInsertOrUpdate = providedCompanies;

                // Delete old SelectedCompanies
                if (companiesToDelete.Any())
                {
                    foreach (var company in companiesToDelete)
                    {
                        await connection.ExecuteAsync(
                            "DELETE FROM SelectedCompany WHERE Id = @Id",
                            new { Id = company.Id }
                        );
                    }
                }

                // Insert or update SelectedCompanies
                var companiesSql = "sp_IU_SelectedCompany";

                foreach (var company in companiesToInsertOrUpdate)
                {
                    var companyParams = new
                    {
                        Id = company.Id ?? 0, // Pass 0 for new entries, or the existing ID for updates
                        UserId = savedUser.Id,
                        CompanyId = company.CompanyId
                    };

                    await connection.ExecuteAsync(companiesSql, companyParams, commandType: CommandType.StoredProcedure);
                }

                return savedUser;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return null;
            }
        }



        public async Task<int> DeleteUser(int id)
        {
            try
            {
                using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

                // Delete SelectedCompanies first
                var deleteCompaniesSql = "sp_DeleteSelectedCompaniesByUserId";
                await connection.ExecuteAsync(deleteCompaniesSql, new { UserId = id }, commandType: CommandType.StoredProcedure);

                // Delete the user
                var parameters = new { ID = id };
                var sql = "sp_Delete_UserMaster";

                return await connection.ExecuteAsync(sql, parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return -1;
            }
        }
    }
}
