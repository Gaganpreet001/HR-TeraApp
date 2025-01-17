using Dapper;
using Liststored.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace Liststored.Service.ProformaService
{
    public class ProformaService: IProformaService
    {
        private readonly IConfiguration _configuration;
        public ProformaService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task<IEnumerable<ProformaPanel>> GetProformaPanelList(int pageNo, int pageSize, DateTime fromDate, DateTime toDate)
        {
            try
            {
                using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                var parameters = new
                {
                    PageNo = pageNo,
                    PageSize = pageSize,
                    FromDate = fromDate,
                    ToDate = toDate
                };

                var sql = "sp_GetProformaPanel";
                return await connection.QueryAsync<ProformaPanel>(sql, parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                var error = ex.Message;
                return null;
            }
        }
    }
}
