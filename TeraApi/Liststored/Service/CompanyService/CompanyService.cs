using Dapper;
using Liststored.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace Liststored.Service.CompanyService
{
    public class CompanyService : ICompanyService
    {
        private readonly IConfiguration _configuration;

        public CompanyService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<IEnumerable<CompanyMaster>> GetAllCompaniesAsync()
        {
            try
            {
                using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                var sql = "sp_List_CompanyMaster";
                return await connection.QueryAsync<CompanyMaster>(sql, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return null;
            }
        }

        public async Task<IEnumerable<CompanyMaster>> GetCompanyList(int pageNo, int pageSize)
        {
            try
            {
                using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                var sql = "sp_List_CompanyMasterList";
                var parameters = new
                {
                    PageNo = pageNo,
                    PageSize = pageSize
                };

                return await connection.QueryAsync<CompanyMaster>(sql, parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return null;
            }
        }
        public async Task<CompanyMaster> GetCompanyByIdAsync(int id)
        {
            try
            {
                using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                var parameters = new { ID = id };
                var sql = "sp_GetCompanyById";

                return await connection.QuerySingleOrDefaultAsync<CompanyMaster>(sql, parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return null;
            }
        }

        public async Task<CompanyMaster> SaveCompanyAsync(CompanyMaster company)
        {
            try
            {
                using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                var parameters = new
                {
                    ID = company.Id ?? 0,
                    CompanyName = company.CompanyName,
                    LegalName = company.LegalName,
                    ShortName = company.ShortName,
                    Address = company.Address,
                    City = company.City,
                    Phone = company.Phone,
                    EmailId = company.EmailId,
                    GSTIN = company.GSTIN,
                    PAN = company.PAN,
                    EnteredBy = company.EnteredBy,
                    EnteredOn = company.EnteredOn,
                    UpdatedBy = company.UpdatedBy,
                    UpdatedOn = company.UpdatedOn
                };

                var sql = "sp_IU_CompanyMaster";
                return await connection.QuerySingleOrDefaultAsync<CompanyMaster>(sql, parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return null;
            }
        }

        public async Task<int> DeleteCompanyAsync(int id)
        {
            try
            {
                using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                var parameters = new { ID = id };
                var sql = "sp_Delete_CompanyMaster";

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
