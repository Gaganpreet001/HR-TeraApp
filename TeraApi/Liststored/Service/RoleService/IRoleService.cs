using Liststored.Models;

namespace Liststored.Service.RoleService
{
    public interface IRoleService
    {
        Task<IEnumerable<RoleMaster>> GetAllRoles(int pageNo, int pageSize);
        Task<RoleMaster> GetRoleById(int id);
        Task<RoleMaster> SaveRole(RoleMaster role);
        Task<int> DeleteRole(int id);
    }
}
