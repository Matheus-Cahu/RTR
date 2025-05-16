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
        public DbSet<Jogos> Jogos { get; set; }
        public DbSet<Produto> Produto { get; set; } // Adicione esta linha
        public DbSet<Pedido> Pedido { get; set; }
        public DbSet<Notificacoes> Notificacoes { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configurações adicionais de mapeamento, se necessário
            modelBuilder.Entity<User>().ToTable("Users");
            modelBuilder.Entity<Jogos>().ToTable("Jogos");
            modelBuilder.Entity<Produto>().ToTable("Produto"); // Adicione esta linha
            modelBuilder.Entity<Pedido>().ToTable("Pedido");
            modelBuilder.Entity<Notificacoes>().ToTable("Notificacoes");
        }
    }
}