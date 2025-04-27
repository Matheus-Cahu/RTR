using System;

namespace MeuProjetoApi.Models
{
    public class User
    {
        // Usando construtor para inicializar as propriedades
        public User()
        {
            ID = 0;
            Name = string.Empty;
            Email = string.Empty; // Valor padrão para Email
            Ranking = 0; // Valor padrão para Ranking
            Vitorias = 0;
            Chave = 0;
            Image = Array.Empty<byte>(); // Inicializa como um array vazio
        }

        public int ID { get; set; }
        public string Name { get; set; }
        public string Email { get; set; } // Campo para armazenar o email do usuário
        public int Ranking { get; set; } // Garantido que não será nulo
        public int Vitorias { get; set; }
        public int Chave { get; set; }
        public byte[] Image { get; set; } // Campo para armazenar a imagem como byte array
    }
}