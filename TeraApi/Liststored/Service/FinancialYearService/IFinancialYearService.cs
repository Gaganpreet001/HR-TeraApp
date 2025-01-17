using Liststored.Models;

namespace Liststored.Service.FinancialYearService
{
    public interface IFinancialYearService
    {
        Task<IEnumerable<FinancialYearMaster>> GetAllFinancialYears(int pageNo, int pageSize);
        Task<IEnumerable<FinancialYearMaster>> GetFinancialYearAll();
        Task<FinancialYearMaster> GetFinancialYearById(int id);
        Task<FinancialYearMaster> SaveFinancialYear(FinancialYearMaster financialYear);
        Task<int> DeleteFinancialYear(int id);
    }
}
