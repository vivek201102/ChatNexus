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
        public async Task<ActionResult<IEnumerable<Solution>>> GetSolutions(long questionId)
        {
            if (_context.Solutions == null || _context.Questions == null)
                return NotFound("Null Context");

            List<Solution> Solutions = _context.Solutions.Where(s => s.QuestionId == questionId).ToList();

            Question q = await _context.Questions.FindAsync(questionId);

            if (q == null)
                return NotFound("Question Not Found");
            
            foreach (Solution s in Solutions)
            {
                s.User = await _context.Users.FindAsync(s.UserId);
                s.Question = q;
            }

            return Ok(Solutions);
        }

        [HttpPost]
        public async Task<ActionResult> PostSolution(PostSolution postSolution)
        {
            if (_context.Solutions == null)
                return NotFound("Null Context");

            Solution Solution = new Solution();
            try
            {
                var user = await _context.Users.FindAsync(postSolution.UserId);
                if (user == null)
                    return NotFound("User not found");
                var question = await _context.Questions.FindAsync(postSolution.QuestionId);
                if (question == null)
                    return NotFound("Question not found");

                if (user.Id == question.UserId)
                    return BadRequest("Question asker can't give Solution");

                Solution.Question = question;
                Solution.Answer = postSolution.Answer;
                Solution.User = user;
                Solution.TimeStamp = DateTime.UtcNow;

                _context.Solutions.Add(Solution);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
            return Ok(Solution);
        }


        
    }
}
