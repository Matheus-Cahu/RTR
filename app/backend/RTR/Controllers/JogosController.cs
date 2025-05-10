using Microsoft.AspNetCore.Mvc;
using MeuProjetoApi.Models;
using Microsoft.EntityFrameworkCore;
using MeuProjetoApi.Data;
using Newtonsoft.Json.Linq; // Importante para atualizações parciais

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
        var jogo = await _context.Jogos.FindAsync(id);

        if (jogo == null)
        {
            return NotFound();
        }

        return jogo;
    }

    // POST: api/Jogos
    [HttpPost]
    public async Task<ActionResult<Jogos>> PostJogos(Jogos jogos)
    {
        _context.Jogos.Add(jogos);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetJogos), new { id = jogos.Id }, jogos);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutJogos(int id, [FromBody] JObject jogoJson)
    {
        var dbJogo = await _context.Jogos.FindAsync(id);
        if (dbJogo == null)
        {
            return NotFound();
        }

        foreach (var prop in jogoJson.Properties())
        {
            // Ignora id/Id se for enviado, nunca permite alterar o Id.
            if (string.Equals(prop.Name, "id", StringComparison.OrdinalIgnoreCase))
                continue;

            var propertyInfo = dbJogo.GetType().GetProperty(
                prop.Name,
                System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.IgnoreCase
            );

            if (propertyInfo != null && propertyInfo.CanWrite)
            {
                var value = prop.Value.ToObject(propertyInfo.PropertyType);
                propertyInfo.SetValue(dbJogo, value);
            }
        }

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
        var jogo = await _context.Jogos.FindAsync(id);
        if (jogo == null)
        {
            return NotFound();
        }

        _context.Jogos.Remove(jogo);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool JogosExists(int id)
    {
        return _context.Jogos.Any(e => e.Id == id);
    }
}
}