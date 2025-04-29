using System;

namespace MeuProjetoApi.Models
{
    public class User
    {
        public User()
        {
            ID = 0;
            Name = string.Empty;
            Email = string.Empty;
            Ranking = 0;
            Vitorias = 0;
            Chave = 0;
            Img = null; // Permite que Img seja nulo
        }

        public int ID { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }

        public string Password { get; set; }
        public int Ranking { get; set; }
        public int Vitorias { get; set; }
        public int Chave { get; set; }
        public byte[]? Img { get; set; } // Agora Img pode ser nulo
    }
}