using CDL_Predictor.Models;

namespace CDL_Predictor.Repositories
{
    public interface IUsersRepo
    {
        Users GetByEmail(string username);
        Users GetById(int id);
        void Add(Users user);
        void Update(Users user);
    }
}
