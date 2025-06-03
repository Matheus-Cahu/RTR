using System.ComponentModel.DataAnnotations;

namespace MeuProjetoApi.Models
{
  public class RankingUpdateDto
  {
    [Required]
    public int Ranking { get; set;}

    [Required]
    public int Chave { get; set;}

    [Required]
    public int Vitorias { get; set;}

  }
}
