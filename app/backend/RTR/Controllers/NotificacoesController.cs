using Microsoft.AspNetCore.Mvc;
using MeuProjetoApi.Models;
using MeuProjetoApi.Data;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System;

namespace MeuProjetoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificacoesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public NotificacoesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Notificacoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Notificacoes>>> GetNotificacoes()
        {
            return await _context.Notificacoes.ToListAsync();
        }

        // GET: api/Notificacoes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Notificacoes>> GetNotificacao(int id)
        {
            var notificacao = await _context.Notificacoes.FindAsync(id);

            if (notificacao == null)
            {
                return NotFound();
            }

            return notificacao;
        }

        // POST: api/Notificacoes
        [HttpPost]
        public async Task<ActionResult<Notificacoes>> PostNotificacao(Notificacoes notificacao)
        {
            _context.Notificacoes.Add(notificacao);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetNotificacao), new { id = notificacao.Id }, notificacao);
        }

        // PUT: api/Notificacoes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNotificacao(int id, [FromBody] JObject notificacaoJson)
        {
            var dbNotificacao = await _context.Notificacoes.FindAsync(id);
            if (dbNotificacao == null)
            {
                return NotFound();
            }

            foreach (var prop in notificacaoJson.Properties())
            {
                if (string.Equals(prop.Name, "id", StringComparison.OrdinalIgnoreCase))
                    continue;

                var propertyInfo = dbNotificacao.GetType().GetProperty(
                    prop.Name,
                    System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.IgnoreCase
                );

                if (propertyInfo != null && propertyInfo.CanWrite)
                {
                    var value = prop.Value.ToObject(propertyInfo.PropertyType);
                    propertyInfo.SetValue(dbNotificacao, value);
                }
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NotificacaoExists(id))
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

        // DELETE: api/Notificacoes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNotificacao(int id)
        {
            var notificacao = await _context.Notificacoes.FindAsync(id);
            if (notificacao == null)
            {
                return NotFound();
            }

            _context.Notificacoes.Remove(notificacao);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool NotificacaoExists(int id)
        {
            return _context.Notificacoes.Any(e => e.Id == id);
        }
    }
}