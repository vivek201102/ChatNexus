using backend.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.DTO
{
    public class AnswersResponse
    {
        public long Id { get; set; }
        public string Answer { get; set; }
        public long UserId { get; set; }
        public User User { get; set; }
        public long QuestionId { get; set; }
        public Question Question { get; set; }
        public DateTime TimeStamp { get; set; }
    }
}
