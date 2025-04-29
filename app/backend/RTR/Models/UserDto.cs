namespace MeuProjetoApi.Models
{
    public class UserDto
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public int Ranking { get; set; }
        public int Vitorias { get; set; }
        public int Chave { get; set; }
        public string? ImgBase64 { get; set; } // Representação da imagem em Base64

        // Construtor para facilitar a conversão de User para UserDto
        public UserDto(User user)
        {
            ID = user.ID;
            Name = user.Name;
            Email = user.Email;
            Ranking = user.Ranking;
            Vitorias = user.Vitorias;
            Chave = user.Chave;
            ImgBase64 = user.Img != null ? Convert.ToBase64String(user.Img) : null;
        }
    }
}