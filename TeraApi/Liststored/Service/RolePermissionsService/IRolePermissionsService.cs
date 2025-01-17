using Liststored.Models;

namespace Liststored.Service.RolePermissionsService
{
    public interface IRolePermissionsService
    {
        Task<IEnumerable<RolePermissions>> GetRolePermissionsList(int pageNo, int pageSize);
        Task<IEnumerable<RolePermissions>> GetAllRolePermissions();
        Task<RolePermissions> GetRolePermissionById(int id);
        Task<IEnumerable<RolePermissions>> GetRolePermissionsByRoleId(int roleId);
        Task<RolePermissions> SaveRolePermission(RolePermissions permission);
        Task<int> DeletePermission(int id);
    }
}
