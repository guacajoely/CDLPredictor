using Microsoft.AspNetCore.Mvc;
using CDL_Predictor.Models;
using CDL_Predictor.Repositories;

namespace CDL_Predictor.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamsController : ControllerBase
    {


        private readonly ITeamsRepo _teamRepo;
        public TeamsController(ITeamsRepo teamsRepo)
        {
            _teamRepo = teamsRepo;
        }



        [HttpGet]
        public ActionResult Get()
        {
            return Ok(_teamRepo.GetAllTeams());
        }


    }
}
