using backend.DTO;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuestionController : ControllerBase
    {
        private readonly DatabaseContext _context;
        public QuestionController(DatabaseContext context) {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Question>>> GetQuestions()
        {
            if(_context.Questions == null)
            {
                return NotFound("Null Context");
            }
            List<Question> questions = await _context.Questions.ToListAsync();

            foreach(Question q in questions)
            {
                var user = await _context.Users.FindAsync(q.UserId);
                q.User = user;
            }

            return questions;
        }

        [HttpPost]
        public async Task<ActionResult> PostQuestion([FromForm] PostQuestion postQuestion)
        {
            Question question = new Question();

            question.Title = postQuestion.Title;
            question.Description = postQuestion.Description;
            question.TimeStamp = DateTime.Now;
            question.Tags = postQuestion.Tags;
            question.Image = postQuestion.Image.FileName;

            var user = await _context.Users.FindAsync(postQuestion.UserId);
            if(user == null)
                return NotFound("User Not Found");

            question.User = user;
            
            try
            {
                string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/Questions", postQuestion.Image.FileName);
                using (Stream stream = new FileStream(path, FileMode.Create))
                {
                    postQuestion.Image.CopyTo(stream);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            _context.Questions.Add(question);
            await _context.SaveChangesAsync();

            return Ok(question);
        }
    }
}
