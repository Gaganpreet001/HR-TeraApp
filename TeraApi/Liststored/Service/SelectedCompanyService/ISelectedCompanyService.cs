using Liststored.Models;

namespace Liststored.Service.SelectedCompanyService
{
    public interface ISelectedCompanyService
    {
        Task<IEnumerable<SelectedCompany>> GetSelectedCompanyByUserId(int roleId);
    }
}
