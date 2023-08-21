using CDL_Predictor.Models;

namespace CDL_Predictor.Repositories
{
    public interface IPredictionsRepo
    {
        List<Predictions> GetPredictionsByUserId(int userId);
        void Add(Predictions prediction);
    }
}
