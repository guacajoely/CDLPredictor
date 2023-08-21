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


        [HttpGet("GetByEmail")]
        public IActionResult GetByEmail(string email)
        {
            var user = _userRepo.GetByEmail(email);

            if (email == null || user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }


        [HttpGet("{id}")]
        public IActionResult GetByAdmissionId(int id)
        {
            Users user = _userRepo.GetById(id);

            if (user == null)
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
                "GetByEmail",
                new { email = user.Email },
                user);
        }


        [HttpPut("{id}")]
        public IActionResult Put(int id, Users user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }
            _userRepo.Update(user);
            return CreatedAtAction(
                "GetByEmail",
                new { email = user.Email },
                user);
        }



    }
}
