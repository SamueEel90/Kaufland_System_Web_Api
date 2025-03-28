﻿namespace Kaufland_Software.Server.Modely
{
    public class Produkt
    {
        public int Id { get; set; }
        public string Nazov { get; set; } = string.Empty;
        public decimal Cena { get; set; }
        public string EanKod { get; set; } = string.Empty;
        public int Zasoba { get; set; }
        public string Kategoria { get; set; } = string.Empty;
        public string DruhListovania { get; set; } = string.Empty;
        public string Vyrobca { get; set; } = string.Empty;
        public int PocetPredanych { get; set; }
        public int MinZasoba { get; set; }
        public int MaxZasoba { get; set; }

        public DateTime DatumSpotreby { get; set; } = DateTime.Now;
    }
}