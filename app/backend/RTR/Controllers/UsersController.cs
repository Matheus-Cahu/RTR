using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MeuProjetoApi.Data;
using MeuProjetoApi.Models;
using System.IO;
using BCrypt.Net;

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

        // GET: api/Users/by-email?email=xyz@abc.com
        [HttpGet("by-email")]
        public async Task<ActionResult<UserDto>> GetUserByEmail([FromQuery] string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                return BadRequest("Email não fornecido.");

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
                return NotFound();

            var userDto = new UserDto(user);
            return Ok(userDto);
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

[HttpPost]
public async Task<ActionResult<User>> PostUser([FromForm] UserWithImage userWithImage)
{
    // Valide os dados recebidos
    if (string.IsNullOrWhiteSpace(userWithImage.Password))
        return BadRequest("Senha é obrigatória.");

    if (string.IsNullOrWhiteSpace(userWithImage.Name) || string.IsNullOrWhiteSpace(userWithImage.Email))
        return BadRequest("Nome e email são obrigatórios.");

    int nextChave = 0;

    // Calcular a chave, como você já fazia
    bool existeUsuario = await _context.Users.AnyAsync();
    if (existeUsuario)
    {
        int maxChave = await _context.Users.MaxAsync(u => u.Chave);
        int quantidadeComMaxChave = await _context.Users.CountAsync(u => u.Chave == maxChave);

        if (quantidadeComMaxChave >= 3)
            nextChave = maxChave + 3;
        else
            nextChave = maxChave;
    }

    // Processar a imagem, se enviada
    byte[]? imageBlob = null;
    if (userWithImage.Image != null)
    {
        using (var memoryStream = new MemoryStream())
        {
            await userWithImage.Image.CopyToAsync(memoryStream);
            imageBlob = memoryStream.ToArray();
        }
    }

    // Gere o hash da senha (corrigido)
    var hashedPassword = BCrypt.Net.BCrypt.HashPassword(userWithImage.Password);

    var user = new User
    {
        Name = userWithImage.Name,
        Email = userWithImage.Email,
        Password = hashedPassword, // Salvar o hash corretamente
        Img = imageBlob,
        Chave = nextChave,
        Ranking = await _context.Users.CountAsync() + 1
    };

    _context.Users.Add(user);

    try
    {
        await _context.SaveChangesAsync();
    }
    catch (DbUpdateException)
    {
        if (UserExists(user.ID))
            return Conflict();
        else
            throw;
    }

    return CreatedAtAction("GetUser", new { id = user.ID }, user);
}

            [HttpPost("login")]
public async Task<IActionResult> Login([FromBody] LoginDto LoginDto)
{
    try
    {
        if (LoginDto == null)
        {
            Console.WriteLine("[ERRO LOGIN] Body nulo ou inválido");
            return BadRequest("Body da requisição ausente ou inválido.");
        }

        if (string.IsNullOrWhiteSpace(LoginDto.Email) || string.IsNullOrWhiteSpace(LoginDto.Password))
        {
            Console.WriteLine("[ERRO LOGIN] Email ou senha vazios");
            return BadRequest("Email e senha são obrigatórios.");
        }

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == LoginDto.Email);
        if (user == null)
        {
            Console.WriteLine($"[ERRO LOGIN] Usuário não encontrado: {LoginDto.Email}");
            return Unauthorized("Usuário não encontrado.");
        }

        if (string.IsNullOrEmpty(user.Password))
        {
            Console.WriteLine($"[ERRO LOGIN] Usuário com senha nula: {user.Email}");
            return StatusCode(500, "Senha do usuário está ausente no banco.");
        }

        bool isValid;
        try
        {
            isValid = BCrypt.Net.BCrypt.Verify(LoginDto.Password, user.Password);
        }
        catch (Exception exBcrypt)
        {
            Console.WriteLine($"[ERRO LOGIN] Exceção no BCrypt: {exBcrypt}");
            return StatusCode(500, "Falha ao validar a senha (hash inválido?).");
        }

        if (!isValid)
        {
            Console.WriteLine($"[ERRO LOGIN] Senha inválida para usuário: {user.Email}");
            return Unauthorized("Senha inválida.");
        }

        Console.WriteLine($"[LOGIN OK] Usuário autenticado: {user.Email}");
        return Ok(new { id = user.ID, email = user.Email, name = user.Name });
    }
    catch (Exception ex)
    {
        Console.WriteLine($"[ERRO LOGIN GERAL] {ex}");
        return StatusCode(500, "Erro interno: " + ex.Message);
    }
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