using backend.Models;
using backend.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BCry = BCrypt.Net.BCrypt;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly DatabaseContext _context;
        public UserController(DatabaseContext context) { _context = context; }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers() { 
            if (_context.Users == null)
            {
                return NotFound();
            }
            return await _context.Users.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(long id)
        {
            if(_context.Users == null)
            {
                return NotFound();
            }
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }

            try
            {
                user.Password = BCry.HashPassword(user.Password);
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
            return Ok(user);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<User>> PutUser(long id, User user)
        {
            if(_context.Users == null)
            {
                return NotFound();
            }
            
            if(id != user.Id) { return BadRequest(); }
            
            try
            {
                _context.Entry(user).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException)
            {
                if (UserExist(id))
                    return NotFound();
                else
                    throw;
            }

            return Ok(user);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUser(long id)
        {
            if(_context == null)
                return NotFound();

            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound();
            try
            {
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException)
            {
                throw;
            }
            return NoContent();
        }

        [HttpPost("login")]
        public async Task<ActionResult<User>> PostAuthenticateUser(LoginDTO loginDTO)
        {
            if (_context == null)
                return NotFound();
            
            var user = await _context.Users.Where(u => (u.Username == loginDTO.Username)).FirstOrDefaultAsync();
         
            if (user != null && BCry.Verify(loginDTO.Password, user.Password))
            {
                return Ok(user);
            }
            
            return BadRequest();
        }

        private bool UserExist(long id)
        {
            return (_context.Users?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
