using Microsoft.AspNetCore.Mvc;
using CDL_Predictor.Models;
using CDL_Predictor.Repositories;

namespace CDL_Predictor.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PredictionsController : ControllerBase
    {


        private readonly IPredictionsRepo _predictionRepo;
        public PredictionsController(IPredictionsRepo predictionRepo)
        {
            _predictionRepo = predictionRepo;
        }

        [HttpGet("{userId}")]
        public IActionResult GetByUserId(int userId)
        {
            List<Predictions> listOfPredictions = _predictionRepo.GetPredictionsByUserId(userId);

            if (listOfPredictions == null)
            {
                return NotFound();
            }
            return Ok(listOfPredictions);
        }



        [HttpPost]
        public IActionResult Predictions(Predictions prediction)
        {
            _predictionRepo.Add(prediction);
            return CreatedAtAction("GetByUserId", new { userId = prediction.UserId }, prediction);
        }





    }
}
