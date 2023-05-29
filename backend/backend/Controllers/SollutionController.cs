using backend.DTO;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AnswerController : ControllerBase
    {
        private readonly DatabaseContext _context;
        public AnswerController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpGet("{questionId}")]
        public async Task<ActionResult<IEnumerable<Sollution>>> GetSollutions(long questionId)
        {
            if (_context.Sollutions == null || _context.Questions == null)
                return NotFound("Null Context");

            List<Sollution> sollutions = _context.Sollutions.Where(s => s.QuestionId == questionId).ToList();

            Question q = await _context.Questions.FindAsync(questionId);

            if (q == null)
                return NotFound("Question Not Found");
            
            foreach (Sollution s in sollutions)
            {
                s.User = await _context.Users.FindAsync(s.UserId);
                s.Question = q;
            }

            return Ok(sollutions);
        }

        [HttpPost]
        public async Task<ActionResult> PostSollution(PostSollution postSollution)
        {
            if (_context.Sollutions == null)
                return NotFound("Null Context");

            Sollution sollution = new Sollution();
            try
            {
                var user = await _context.Users.FindAsync(postSollution.UserId);
                if (user == null)
                    return NotFound("User not found");
                var question = await _context.Questions.FindAsync(postSollution.QuestionId);
                if (question == null)
                    return NotFound("Question not found");

                if (user.Id == question.UserId)
                    return BadRequest("Question asker can't give Sollution");

                sollution.Question = question;
                sollution.Answer = postSollution.Answer;
                sollution.User = user;
                sollution.TimeStamp = DateTime.UtcNow;

                _context.Sollutions.Add(sollution);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
            return Ok(sollution);
        }


        
    }
}
