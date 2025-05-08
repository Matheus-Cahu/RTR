using System;

namespace MeuProjetoApi.Models
{
    public class Jogos
    {
        public Jogos()
        {
            Id = 0;
            Jogador1 = string.Empty;
            Jogador2 = string.Empty;
            Img = null;
            Jog1_G1 = 0;
            Jog1_G2 = 0;
            Jog2_G1 = 0;
            Jog2_G2 = 0;
            Vencedor = string.Empty;
            Data = DateTime.UtcNow;
            Status = string.Empty;
            Local = string.Empty;
        }

        public int Id { get; set; } // Chave primária

        public string Jogador1 { get; set; } // Não pode ser nulo
        public string Jogador2 { get; set; } // Não pode ser nulo

        public byte[]? Img { get; set; } // Pode ser nulo

        // Pontuações
        public int Jog1_G1 { get; set; } // Pontuação do jogador 1 no 1º set
        public int Jog1_G2 { get; set; } // Pontuação do jogador 1 no 2º set
        public int Jog2_G1 { get; set; } // Pontuação do jogador 2 no 1º set
        public int Jog2_G2 { get; set; } // Pontuação do jogador 2 no 2º set

        public string? Vencedor { get; set; } // Pode ser nulo (caso o vencedor ainda não tenha sido definido)

        public DateTime Data { get; set; } // Data do jogo

        public string Status { get; set; } // Status do jogo (ex.: "Encerrado" ou "Pendente")
        public string Local { get; set; } // Local do jogo
    }
}