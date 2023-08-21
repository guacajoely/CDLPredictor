using Microsoft.AspNetCore.Mvc;
using CDL_Predictor.Models;
using CDL_Predictor.Repositories;

namespace CDL_Predictor.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {


        //private readonly IUsersRepository _userRepository;
        private readonly IUsersRepo _userRepo;
        public UsersController(IUsersRepo usersRepo)
        {
            //_userRepository = usersRepository;
            _userRepo = usersRepo;
        }


        [HttpGet("GetByUsername")]
        public IActionResult GetByUsername(string username)
        {
            var user = _userRepo.GetByUsername(username);

            if (username == null || user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }



        [HttpPost]
        public IActionResult Post(Users user)
        {
            _userRepo.Add(user);
            return CreatedAtAction(
                "GetByUsername",
                new { username = user.Username },
                user);
        }



    }
}
