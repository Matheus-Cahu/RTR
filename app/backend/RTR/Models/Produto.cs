using System;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace MeuProjetoApi.Models
{
    public class Produto
    {
        public Produto()
        {
            Name = string.Empty;
            Price = 0;
            ID = 0;
            ColorBool = false;
            SizeBool = false;
            Colors = new string[0];
            Sizes = new int[0];
            Img = null;
        }

        public string Name { get; set; }
        public int Price { get; set; }
        public int ID { get; set; }
        public bool ColorBool { get; set; }
        public bool SizeBool { get; set; }
        public string[]? Colors { get; set; }
        public int[]? Sizes { get; set; }
        public byte[]? Img { get; set; }
    }
}