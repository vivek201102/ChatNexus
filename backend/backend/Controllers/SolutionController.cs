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

            var solutions = _context.Solutions.Where(s => s.QuestionId == questionId)?.ToArray();
            List<AnswersResponse> answerResponses = new List<AnswersResponse>();
            Question q = await _context.Questions.FindAsync(questionId);
            foreach(var s in solutions)
            {
                AnswersResponse answer = new AnswersResponse();
                answer.QuestionId = s.QuestionId;
                answer.Question = q;
                answer.Answer = s.Answer;
                answer.UserId = s.UserId;
                answer.Id = s.Id;
                answer.TimeStamp = s.TimeStamp;
                User u = await _context.Users.FindAsync(s.UserId);
                answer.User = u;
                answerResponses.Add(answer);
            }
           

            return Ok(answerResponses);
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
                Solution.UserId = postSolution.UserId;
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

        [HttpPut]
        public async Task<ActionResult<Solution>> PutAnswer(Solution solution)
        {
            if (_context.Solutions == null)
                return NotFound();
            try
            {
                _context.Entry(solution).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                    throw;
            }

            return Ok(solution);
        }


        
    }
}
