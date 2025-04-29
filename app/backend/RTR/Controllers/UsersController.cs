using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MeuProjetoApi.Data;
using MeuProjetoApi.Models;
using System.IO;

namespace MeuProjetoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();

            // Converte cada User para UserDto
            var userDtos = users.Select(user => new UserDto(user)).ToList();

            return Ok(userDtos);
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            // Usa o construtor de UserDto para converter o objeto User
            var userDto = new UserDto(user);

            return Ok(userDto);
        }

        // POST: api/Users
        [HttpPost]
        public async Task<ActionResult<User>> PostUser([FromForm] UserWithImage userWithImage)
        {
            // Se NÃO tiver nenhum usuário, chave e ranking começam em 0 e 1
            int nextChave = 0;

            bool existeUsuario = await _context.Users.AnyAsync();
            if (existeUsuario)
            {
                // Descobre a chave máxima atualmente usada
                int maxChave = await _context.Users.MaxAsync(u => u.Chave);

                // Conta quantos jogadores têm essa chave máxima
                int quantidadeComMaxChave = await _context.Users.CountAsync(u => u.Chave == maxChave);

                // Decide se incrementa ou mantém a chave
                if (quantidadeComMaxChave >= 3)
                    nextChave = maxChave + 3;
                else
                    nextChave = maxChave;
            }

            // Converte a imagem para BLOB, se fornecida
            byte[]? imageBlob = null;
            if (userWithImage.Image != null)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await userWithImage.Image.CopyToAsync(memoryStream);
                    imageBlob = memoryStream.ToArray(); // Converte a imagem para um array de bytes
                }
            }

            // Cria o objeto User com os dados recebidos
            var user = new User
            {
                Name = userWithImage.Name,
                Email = userWithImage.Email,
                Password = userWithImage.Password,
                Img = imageBlob, // Armazena a imagem como BLOB
                Chave = nextChave,
                Ranking = await _context.Users.CountAsync() + 1 // Ranking: total atual de usuários + 1
            };

            _context.Users.Add(user);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UserExists(user.ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetUser", new { id = user.ID }, user);
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.ID)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.ID == id);
        }
    }
}