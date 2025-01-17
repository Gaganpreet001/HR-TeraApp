using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Liststored.Models;

namespace Liststored.Service.LogisticService
{
    public interface ILogisticsService
    {
        Task<IEnumerable<LogisticsPanel>> GetLogisticsPanelAsync(DateTime fromDate, DateTime toDate);
        Task<IEnumerable<LogisticsPanel>> GetLogisticsById(float? pinNo, float? invoiceNo);
        Task<LogisticsInfo> SaveLogisticsInfoAsync(LogisticsInfo logisticsInfo);
        //Task<IEnumerable<LogisticsPanel>> GetLogisticsPanelData(int pageNo, int pageSize, DateTime fromDate, DateTime toDate);
        Task<(IEnumerable<LogisticsPanel> Data, int TotalCount)> GetLogisticsPanelData(int pageNo, int pageSize, DateTime fromDate, DateTime toDate);

    }
}
