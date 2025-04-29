using System;

namespace MeuProjetoApi.Models{

public class UserWithImage
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public IFormFile? Image { get; set; } // Arquivo de imagem enviado pelo cliente
}
}