using Dapper;
using Liststored.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace Liststored.Service.LogisticService
{
    public class LogisticsService : ILogisticsService
    {
        private readonly IConfiguration _configuration;
        public LogisticsService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task<IEnumerable<LogisticsPanel>> GetLogisticsPanelAsync(DateTime fromDate, DateTime toDate)
        {
            try
            {
                using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                var parameters = new { FromDate = fromDate, ToDate = toDate };
                var sql = "sp_GetLogisticsPanel";

                return await connection.QueryAsync<LogisticsPanel>(sql, parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                var error = ex.Message.ToString();
                return null;
            }
        }
        public async Task<IEnumerable<LogisticsPanel>> GetLogisticsById(float? piNo, float? invoiceNo)
        {
            try
            {
                using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                var parameters = new { PINo = piNo, InvoiceNo = invoiceNo };
                var sql = "sp_GetLogisticsPanel";

                return await connection.QueryAsync<LogisticsPanel>(sql, parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex) {
                var error = ex.Message.ToString();
                return null;
            } 
        }

        // New method for Insert/Update using sp_IU_LogisticInfo
        public async Task<LogisticsInfo> SaveLogisticsInfoAsync(LogisticsInfo logisticsInfo)
        {
            try
            {
                using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

                var parameters = new
                {
                    ID = logisticsInfo.ID ?? 0,
                    ORDER_NO = logisticsInfo.ORDER_NO,
                    INVOICE_NO = logisticsInfo.INVOICE_NO,
                    COC = logisticsInfo.COC,
                    ACTUAL_VESSEL_DETAILS = logisticsInfo.ACTUAL_VESSEL_DETAILS,
                    ACTUAL_SOB = logisticsInfo.ACTUAL_SOB,
                    TARGET_SOB = logisticsInfo.TARGET_SOB,
                    RAIL_OUT = logisticsInfo.RAIL_OUT,
                    TARGET_ETA = logisticsInfo.TARGET_ETA,
                    ACTUAL_ETA = logisticsInfo.ACTUAL_ETA,
                    CARGO_UNLOADING_DATE = logisticsInfo.CARGO_UNLOADING_DATE,
                    REMARKS = logisticsInfo.REMARKS
                };

                var sql = "sp_IU_LogisticInfo";

                // Execute the stored procedure and fetch the result
                var result = await connection.QuerySingleOrDefaultAsync<LogisticsInfo>(sql, parameters, commandType: CommandType.StoredProcedure);

                return result;
            }
            catch (Exception ex)
            {
                var error = ex.Message.ToString();
                return null;
            }
        }

        public async Task<(IEnumerable<LogisticsPanel> Data, int TotalCount)> GetLogisticsPanelData(int pageNo, int pageSize, DateTime fromDate, DateTime toDate)
        {
            try
            {
                using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                var parameters = new
                {
                    FromDate = fromDate,
                    ToDate = toDate,
                    PageNo = pageNo,
                    PageSize = pageSize
                };

                var sql = "sp_GetLogisticsPanelList";
                using var multi = await connection.QueryMultipleAsync(sql, parameters, commandType: CommandType.StoredProcedure);

                var data = await multi.ReadAsync<LogisticsPanel>();
                var totalCount = await multi.ReadSingleAsync<int>();

                return (data, totalCount);
            }
            catch (Exception ex)
            {
                var error = ex.Message.ToString();
                return (null, 0);
            }
        }

    }
}
