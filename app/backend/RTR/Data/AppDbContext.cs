using Microsoft.EntityFrameworkCore;
using MeuProjetoApi.Models;

namespace MeuProjetoApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Jogos> Jogos { get; set; } // Adicione esta linha

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configurações adicionais de mapeamento, se necessário
            modelBuilder.Entity<User>().ToTable("Users");
            modelBuilder.Entity<Jogos>().ToTable("Jogos"); // Adicione esta linha
        }
    }
}