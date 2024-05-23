using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repositories
{
    public interface IUserRepository
    {
        Task<bool> CreateUserAsync(UserDTO user);
        Task<string> AuthenticateUserAsync(string username, string password);
        Task LogActionAsync(string username, string action);
    }
}
