﻿using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Solution
    {
        public long Id { get; set; }
        public string Answer { get; set; }
        public long UserId { get; set; }
        public long QuestionId { get; set; }
        [ForeignKey("QuestionId")]
        public virtual Question Question { get; set; }
        public DateTime TimeStamp { get; set; }
    }
}
