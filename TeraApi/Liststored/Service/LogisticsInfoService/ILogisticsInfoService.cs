using Liststored.Models;

namespace Liststored.Service.LogisticsInfoService
{
    public interface ILogisticsInfoService
    {
        Task<List<LogisticsInfo>> GetAllLogisticsInfo();
        Task<LogisticsInfo> GetLogisticsInfoById(int id);
        Task<LogisticsInfo> AddLogisticsInfo(LogisticsInfo logisticsInfo);
        Task<LogisticsInfo> SaveLogisticsInfo(LogisticsInfo logisticsInfo);
        Task<LogisticsInfo> UpdateLogisticsInfo(int id, LogisticsInfo logisticsInfo);
        Task<bool> DeleteLogisticsInfo(int id);
    }
}
