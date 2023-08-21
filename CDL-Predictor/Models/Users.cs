using System.ComponentModel.DataAnnotations;

namespace CDL_Predictor.Models
{
    public class Users
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(17)]
        public string Username { get; set; }

        //PASSWORD WILL BE HASHED AND STORED PROPERLY BUT IS NOT CURRENTLY IN USE FOR PROOF OF CONCEPT
        public string Password { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [MaxLength(255)]
        public string Email { get; set; }
        public int? FaveTeam { get; set; }
        public string? ImageURL { get; set; }
    }
}