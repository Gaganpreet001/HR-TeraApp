using Dapper;
using Liststored.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace Liststored.Service.FinancialYearService
{
    public class FinancialYearService: IFinancialYearService
    {
        private readonly IConfiguration _configuration;

        public FinancialYearService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<IEnumerable<FinancialYearMaster>> GetFinancialYearAll()
        {
            try
            {
                using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                var sql = "sp_List_FinancialYearMasterAll";
                return await connection.QueryAsync<FinancialYearMaster>(sql, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return null;
            }
        }
        public async Task<IEnumerable<FinancialYearMaster>> GetAllFinancialYears(int pageNo, int pageSize)
        {
            try
            {
                using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                var sql = "sp_List_FinancialYearMaster";
                var parameters = new
                {
                    PageNo = pageNo,
                    PageSize = pageSize
                };

                return await connection.QueryAsync<FinancialYearMaster>(sql, parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return null;
            }
        }

        public async Task<FinancialYearMaster> GetFinancialYearById(int id)
        {
            try
            {
                using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                var parameters = new { ID = id };
                var sql = "sp_GetFinancialYearById";

                return await connection.QuerySingleOrDefaultAsync<FinancialYearMaster>(sql, parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return null;
            }
        }

        public async Task<FinancialYearMaster> SaveFinancialYear(FinancialYearMaster financialYear)
        {
            try
            {
                using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                var parameters = new
                {
                    ID = financialYear.Id ?? 0,
                    FromDate = financialYear.FromDate,
                    ToDate = financialYear.ToDate,
                    EnteredBy = financialYear.EnteredBy,
                    EnteredOn = financialYear.EnteredOn,
                    UpdatedBy = financialYear.UpdatedBy,
                    UpdatedOn = financialYear.UpdatedOn
                };

                var sql = "sp_IU_FinancialYearMaster";
                return await connection.QuerySingleOrDefaultAsync<FinancialYearMaster>(sql, parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return null;
            }
        }

        public async Task<int> DeleteFinancialYear(int id)
        {
            try
            {
                using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                var parameters = new { ID = id };
                var sql = "sp_Delete_FinancialYearMaster";

                var result = await connection.ExecuteAsync(sql, parameters, commandType: CommandType.StoredProcedure);

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
