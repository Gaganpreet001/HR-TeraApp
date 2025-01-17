using Dapper;
using Liststored.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Liststored.Service.SelectedCompanyService
{
    public class SelectedCompanyService: ISelectedCompanyService
    {
        private readonly IConfiguration _configuration;

        public SelectedCompanyService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task<IEnumerable<SelectedCompany>> GetSelectedCompanyByUserId(int userId)
        {
            try
            {
                using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                var sql = "sp_GetSelectedCompaniesByUserId";
                var parameters = new
                {
                    userId = userId
                };

                return await connection.QueryAsync<SelectedCompany>(sql, parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return null;
            }
        }
    }
}
