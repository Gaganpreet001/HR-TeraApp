using Liststored.Models;

namespace Liststored.Service.UserService
{
    public interface IUserService
    {
        Task<IEnumerable<UserMaster>> GetUserList(int pageNo, int pageSize);
        Task<IEnumerable<UserMaster>> GetAllUsers();
        Task<UserMaster> GetUserById(int id);
        Task<UserMaster> SaveUser(UserMaster user);
        Task<int> DeleteUser(int id);
    }
}
