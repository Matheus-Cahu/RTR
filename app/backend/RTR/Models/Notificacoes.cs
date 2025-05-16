using System;
using System.Drawing;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace MeuProjetoApi.Models
{
    public class Notificacoes
    {
        public Notificacoes()
        {
            Conteudo = string.Empty;
            Titulo = string.Empty;
            Id = 0;
            Dest = [];
            Forall = false;
            Seen = false;
        }
        public string Conteudo { get; set; }
        public string Titulo { get; set; }
        public int Id { get; set; }
        public string[] Dest { get; set; }
        public bool Forall { get; set; }
        public bool Seen { get; set; }
    }
}