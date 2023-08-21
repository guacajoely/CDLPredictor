namespace CDL_Predictor.Models
{
    public class Predictions
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int Team1 { get; set; }
        public int Team2 { get; set; }
        public int Team1Score { get; set; }
        public int Team2Score { get; set; }
    }
}
