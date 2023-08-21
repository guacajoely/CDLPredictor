using CDL_Predictor.Models;
using CDL_Predictor.Utils;
using Microsoft.Data.SqlClient;

namespace CDL_Predictor.Repositories
{
    public class TeamsRepo : BaseRepo, ITeamsRepo
    {
        public TeamsRepo(IConfiguration configuration) : base(configuration) { }

        private Teams NewTeamFromReader(SqlDataReader reader)
        {
            return new Teams()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                TeamName = DbUtils.GetString(reader, "TeamName"),
                FullTeamName = DbUtils.GetString(reader, "FullTeamName"),
                Seed = DbUtils.GetInt(reader, "Seed"),
                HP = DbUtils.GetInt(reader, "HP"),
                SND = DbUtils.GetInt(reader, "SND"),
                CON = DbUtils.GetInt(reader, "CON")
            };
        }


        public List<Teams> GetAllTeams()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, TeamName, FullTeamName, Seed, HP, SND, CON
                         FROM Teams";

                    var listOfTeams = new List<Teams>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        listOfTeams.Add(NewTeamFromReader(reader));
                    }
                    reader.Close();

                    return listOfTeams;
                }
            }
        }








    }
}
