using Microsoft.Data.SqlClient;

namespace CDL_Predictor.Repositories
{
    public abstract class BaseRepo
    {



        private readonly string _connectionString;

        public BaseRepo(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        protected SqlConnection Connection
        {
            get
            {
                return new SqlConnection(_connectionString);
            }
        }



    }
}