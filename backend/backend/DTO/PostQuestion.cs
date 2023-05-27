namespace backend.DTO
{
    public class PostQuestion
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Tags { get; set; }
        public IFormFile Image { get; set; }
        public long UserId { get; set; }
    }
}
