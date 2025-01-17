using System.Collections.Generic;
using System.Threading.Tasks;
using Liststored.Models;

namespace Liststored.Service.CompanyService
{
    public interface ICompanyService
    {
        Task<IEnumerable<CompanyMaster>> GetCompanyList(int pageNo, int pageSize);
        Task<IEnumerable<CompanyMaster>> GetAllCompaniesAsync();
        Task<CompanyMaster> GetCompanyByIdAsync(int id);
        Task<CompanyMaster> SaveCompanyAsync(CompanyMaster company);
        Task<int> DeleteCompanyAsync(int id);
    }
}
