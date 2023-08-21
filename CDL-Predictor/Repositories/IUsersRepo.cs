using CDL_Predictor.Models;

namespace CDL_Predictor.Repositories
{
    public interface IUsersRepo
    {
        Users GetByUsername(string username);
        void Add(Users user);
    }
}
