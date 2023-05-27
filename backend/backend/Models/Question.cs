using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Question
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Tags { get; set; }
        public string Image { get; set; }
        public long UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
        public DateTime TimeStamp { get; set; }
    }
}
