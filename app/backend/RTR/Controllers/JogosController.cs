using Microsoft.AspNetCore.Mvc;
using MeuProjetoApi.Models;
using Microsoft.EntityFrameworkCore;
using MeuProjetoApi.Data;

namespace MeuProjetoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JogosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public JogosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Jogos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Jogos>>> GetJogos()
        {
            return await _context.Jogos.ToListAsync();
        }

        // GET: api/Jogos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Jogos>> GetJogos(int id)
        {
            var jogos = await _context.Jogos.FindAsync(id);

            if (jogos == null)
            {
                return NotFound();
            }

            return jogos;
        }

        // POST: api/Jogos
        [HttpPost]
        public async Task<ActionResult<Jogos>> PostJogos(Jogos jogos)
        {
            _context.Jogos.Add(jogos);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetJogos), new { id = jogos.Id }, jogos);
        }

        // PUT: api/Jogos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutJogos(int id, Jogos jogos)
        {
            if (id != jogos.Id)
            {
                return BadRequest();
            }

            _context.Entry(jogos).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JogosExists(id))
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

        // DELETE: api/Jogos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJogos(int id)
        {
            var jogos = await _context.Jogos.FindAsync(id);
            if (jogos == null)
            {
                return NotFound();
            }

            _context.Jogos.Remove(jogos);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool JogosExists(int id)
        {
            return _context.Jogos.Any(e => e.Id == id);
        }
    }
}