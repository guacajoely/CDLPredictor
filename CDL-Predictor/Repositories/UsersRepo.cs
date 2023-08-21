using CDL_Predictor.Models;
using CDL_Predictor.Utils;
using Microsoft.Data.SqlClient;

namespace CDL_Predictor.Repositories
{
    public class UsersRepo : BaseRepo, IUsersRepo
    {
        public UsersRepo(IConfiguration configuration) : base(configuration) { }



        private Users NewUserFromReader(SqlDataReader reader)
        {
            return new Users()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Username = DbUtils.GetString(reader, "Username"),
                Password = DbUtils.GetString(reader, "Password"),
                Email = DbUtils.GetString(reader, "Email"),
                FaveTeam = DbUtils.GetNullableInt(reader, "FaveTeam"),
                ImageURL = DbUtils.GetNullableString(reader, "ImageURL")
            };
        }



        public Users GetByEmail(string email)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, Username, [Password], Email, FaveTeam, ImageURL
                          FROM [Users]
                         WHERE Email = @Email";

                    DbUtils.AddParameter(cmd, "@Email", email);

                    Users user = null;

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        user = NewUserFromReader(reader);
                    }
                    reader.Close();

                    return user;
                }
            }
        }


        public void Add(Users user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO [Users] (Username, [Password], Email, FaveTeam, ImageURL)
                        OUTPUT INSERTED.ID
                        VALUES (@FullName, @Password, @Email, @FaveTeam, @ImageURL)";

                    DbUtils.AddParameter(cmd, "@FullName", user.Username);
                    DbUtils.AddParameter(cmd, "@Password", user.Password);
                    DbUtils.AddParameter(cmd, "@Email", user.Email);

                    //BECAUSE WE'RE USING THE DBUTILS ADDPARAMETER, ITS OKAY IF THESE VALUES ARE NULL
                    DbUtils.AddParameter(cmd, "@FaveTeam", user.FaveTeam);
                    DbUtils.AddParameter(cmd, "@ImageURL", user.ImageURL);

                    user.Id = (int)cmd.ExecuteScalar();
                }
            }
        }



        public void Update(Users user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Users
                        SET
                            [Username] = @Username,
                            [Password] = @Password,
                            [Email] = @Email,
                            [FaveTeam] = @FaveTeam,
                            [ImageURL] = @ImageURL
                        WHERE Id = @Id
                        ";
                    cmd.Parameters.AddWithValue("@Id", user.Id);
                    cmd.Parameters.AddWithValue("@Username", user.Username);
                    cmd.Parameters.AddWithValue("@Password", user.Password);
                    cmd.Parameters.AddWithValue("@Email", user.Email);
                    cmd.Parameters.AddWithValue("@FaveTeam", DbUtils.ValueOrDBNull(user.FaveTeam));
                    cmd.Parameters.AddWithValue("@ImageURL", DbUtils.ValueOrDBNull(user.ImageURL));
                    

                    cmd.ExecuteNonQuery();
                }
            }
        }


        public Users GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Username, [Password], Email, FaveTeam, ImageURL
                         FROM [Users]
                         WHERE Id = @Id";

                    cmd.Parameters.AddWithValue("@Id", id);
                    var reader = cmd.ExecuteReader();

                    Users user = null;

                    if (reader.Read())
                    {
                        user = NewUserFromReader(reader);
                    }

                    reader.Close();

                    return user;
                }
            }
        }



    }
}
