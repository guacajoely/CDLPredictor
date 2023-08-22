using CDL_Predictor.Models;
using CDL_Predictor.Utils;
using Microsoft.Data.SqlClient;

namespace CDL_Predictor.Repositories
{
    public class PredictionsRepo : BaseRepo, IPredictionsRepo
    {
        public PredictionsRepo(IConfiguration configuration) : base(configuration) { }

        private Predictions NewPredictionFromReader(SqlDataReader reader)
        {
            return new Predictions()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                UserId = DbUtils.GetInt(reader, "UserId"),
                Team1 = DbUtils.GetInt(reader, "Team1"),
                Team2 = DbUtils.GetInt(reader, "Team2"),
                Team1Score = DbUtils.GetInt(reader, "Team1Score"),
                Team2Score = DbUtils.GetInt(reader, "Team2Score")
            };
        }


        public List<Predictions> GetPredictionsByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, UserId, Team1, Team2, Team1Score, Team2Score
                        FROM Predictions
                        WHERE UserId = @UserId";

                    DbUtils.AddParameter(cmd, "@UserId", userId);

                    var listOfPredictions = new List<Predictions>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        listOfPredictions.Add(NewPredictionFromReader(reader));
                    }
                    reader.Close();

                    return listOfPredictions;
                }
            }
        }


        public void Add(Predictions prediction)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Predictions (UserId, Team1, Team2, Team1Score, Team2Score)
                        OUTPUT INSERTED.ID
                        VALUES (@UserId, @Team1, @Team2, @Team1Score, @Team2Score)";

                    cmd.Parameters.AddWithValue("@UserId", prediction.UserId);
                    cmd.Parameters.AddWithValue("@Team1", prediction.Team1);
                    cmd.Parameters.AddWithValue("@Team2", prediction.Team2);
                    cmd.Parameters.AddWithValue("@Team1Score", prediction.Team1Score);
                    cmd.Parameters.AddWithValue("@Team2Score", prediction.Team2Score);

                    prediction.Id = (int)cmd.ExecuteScalar();
                }
            }
        }


        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM Predictions
                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }



    }
}
