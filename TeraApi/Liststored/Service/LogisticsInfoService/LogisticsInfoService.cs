using Liststored.Data;
using Liststored.Models;
using Microsoft.EntityFrameworkCore;

namespace Liststored.Service.LogisticsInfoService
{
    public class LogisticsInfoService : ILogisticsInfoService
    {
        private readonly ApplicationDbContext dbContext;

        public LogisticsInfoService(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        // Get all LogisticsInfo records
        public async Task<List<LogisticsInfo>> GetAllLogisticsInfo()
        {
            try
            {
                return await dbContext.LogisticsInfo.ToListAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetAllLogisticsInfo: {ex.Message}");
                return new List<LogisticsInfo>();
            }
        }

        // Get LogisticsInfo by Id
        public async Task<LogisticsInfo> GetLogisticsInfoById(int id)
        {
            try
            {
                var logisticsInfo = await dbContext.LogisticsInfo.FirstOrDefaultAsync(info => info.ID == id);
                return logisticsInfo ?? null;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetLogisticsInfoById: {ex.Message}");
                return null;
            }
        }

        public async Task<LogisticsInfo> SaveLogisticsInfo(LogisticsInfo logisticsInfo)
        {
            try
            {
                var existingInfo = await dbContext.LogisticsInfo.FirstOrDefaultAsync(info =>
                    info.ORDER_NO == logisticsInfo.ORDER_NO ||
                    (logisticsInfo.INVOICE_NO != null && info.INVOICE_NO == logisticsInfo.INVOICE_NO));

                if (existingInfo != null)
                {
                    dbContext.Entry(existingInfo).State = EntityState.Detached;
                    logisticsInfo.ID = existingInfo.ID;

                    dbContext.LogisticsInfo.Update(logisticsInfo);
                }
                else
                {
                    await dbContext.LogisticsInfo.AddAsync(logisticsInfo);
                }
                await dbContext.SaveChangesAsync();
                return logisticsInfo;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in SaveLogisticsInfo: {ex.Message}");
                return null;
            }
        }



        // Add a new LogisticsInfo
        public async Task<LogisticsInfo> AddLogisticsInfo(LogisticsInfo logisticsInfo)
        {
            try
            {
                await dbContext.LogisticsInfo.AddAsync(logisticsInfo);
                await dbContext.SaveChangesAsync();
                return logisticsInfo;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in AddLogisticsInfo: {ex.Message}");
                return null;
            }
        }

        // Update an existing LogisticsInfo
        public async Task<LogisticsInfo> UpdateLogisticsInfo(int id, LogisticsInfo logisticsInfo)
        {
            try
            {
                var existingInfo = await dbContext.LogisticsInfo.FirstOrDefaultAsync(u => u.ID == id);
                if (existingInfo == null)
                {
                    return null;
                }

                // Detach the existing item to avoid conflict
                dbContext.Entry(existingInfo).State = EntityState.Detached;
                logisticsInfo.ID = id;

                dbContext.LogisticsInfo.Update(logisticsInfo);
                await dbContext.SaveChangesAsync();
                return logisticsInfo;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in UpdateLogisticsInfo: {ex.Message}");
                return null;
            }
        }

        public async Task<bool> DeleteLogisticsInfo(int id)
        {
            try
            {
                var logisticsInfo = await dbContext.LogisticsInfo.FirstOrDefaultAsync(u => u.ID == id);
                if (logisticsInfo == null)
                {
                    return false;
                }

                dbContext.LogisticsInfo.Remove(logisticsInfo);
                await dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in DeleteLogisticsInfo: {ex.Message}");
                return false;
            }
        }
    }
}
