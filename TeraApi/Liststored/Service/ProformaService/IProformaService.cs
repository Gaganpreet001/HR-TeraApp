using Liststored.Models;

namespace Liststored.Service.ProformaService
{
    public interface IProformaService
    {
        Task<IEnumerable<ProformaPanel>> GetProformaPanelList(int pageNo, int pageSize, DateTime fromDate, DateTime toDate);
    }
}
