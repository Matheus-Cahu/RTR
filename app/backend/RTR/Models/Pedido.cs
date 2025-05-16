using System;
using System.Drawing;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace MeuProjetoApi.Models
{
    public class Pedido
    {
        public Pedido()
        {
            Total = 0;
            Id = 0;
            Product = string.Empty;
            User = string.Empty;
        }
        public int Total { get; set; }
        public int Id { get; set; }
        public string Product { get; set; }
        public int? Qtd { get; set; }
        public string User { get; set; }
    }
}