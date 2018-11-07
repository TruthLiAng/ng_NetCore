using System.ComponentModel.DataAnnotations;

namespace ngDemo.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}