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

            return Ok(questions);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetQuestion(long id)
        {
            if (_context.Questions == null)
                return NotFound("Null Context");
            try
            {
                var question = await _context.Questions.FindAsync(id);
                if (question == null)
                    return NotFound("Question not found");
                
                var user = await _context.Users.FindAsync(question.UserId);
                question.User = user;

                return Ok(question);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
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

        [HttpPost("WithoutImage")]
        public async Task<ActionResult> PostQuestionNotImage(PostQuestionNotImage postQuestionNotImage)
        {
            try
            {
                Question question = new Question();
                question.Title = postQuestionNotImage.Title;
                question.Description = postQuestionNotImage.Description;
                question.Tags = postQuestionNotImage.Tags;
                question.Image = "No Image";
                question.TimeStamp = DateTime.Now;

                var user = await _context.Users.FindAsync(postQuestionNotImage.UserId);
                if (user == null) return NotFound("User not found");

                question.User = user;
                question.UserId = user.Id;

                _context.Questions.Add(question);
                await _context.SaveChangesAsync();

                return Ok(question);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<ActionResult> PutQuestion(Question question)
        {
            if (_context.Questions == null)
                return NotFound();
            try
            {
                _context.Entry(question).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuestionExist(question.Id))
                    return NotFound("Question Not Found");
                else
                    throw;
            }

            return Ok(question);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteQuestion(long id)
        {
            if(_context.Questions == null)
                return NotFound("Null Context");

            var question = await _context.Questions.FindAsync(id);
            if (question == null)
                return NotFound("User not found");
            try
            {
                _context.Questions.Remove(question);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return Ok("Success");
        }

        private bool QuestionExist(long id)
        {
            return (_context.Questions?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
