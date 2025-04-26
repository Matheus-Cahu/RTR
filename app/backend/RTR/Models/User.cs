using System;

namespace MeuProjetoApi.Models
{
    public class User
    {
        // Usando construtor para inicializar as propriedades
        public User()
        {
            ID = string.Empty;
            Name = string.Empty;
            UltimoPagamento = Array.Empty<DateTime>();
        }

        public string ID { get; set; }
        public string Name { get; set; }
        public DateTime[] UltimoPagamento { get; set; }
        public int Ranking { get; set; }
    }
}