using Kaufland_Software.Server.Data;
using Kaufland_Software.Server.Modely;
using Microsoft.EntityFrameworkCore;

namespace Kaufland_Software.Server.Services
{
    public class ProduktService
    {
        private readonly AppDbContext _context;

        public ProduktService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Produkt?> GetProduktById(int id)
        {
            return await _context.Produkty
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task UpdateProdukt(Produkt produkt)
        {
            _context.Produkty.Update(produkt);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Produkt>> GetLowStockProducts(string category)
        {
            return await _context.Produkty
                .Where(p => p.Zasoba < p.MinZasoba && p.DruhListovania == "Stály" && p.Kategoria == category)
                .ToListAsync();
        }
        public async Task<List<Produkt>> GetZeroStockProducts()
        {
            return await _context.Produkty
                .Where(p => p.Zasoba == 0)
                .ToListAsync();
        }
        public async Task<List<Produkt>> GetNegativeStockProducts()
        {
            return await _context.Produkty
                .Where(p => p.Zasoba < 0)
                .ToListAsync();

        }
        public async Task<List<Produkt>> GetAsProcess()
        {
            return await _context.Produkty
                .Where(p =>p.ASproces != 0) 
                .ToListAsync();
        }
        public async Task SetNewAsPeriod(int id, int day, int month, int year)
        {
            var produkt = await _context.Produkty.FirstOrDefaultAsync(p => p.Id == id);
            if (produkt != null)
            {
                var newDate = new DateTime(year, month, day).AddDays(14);
                produkt.DatumZmenyASFazy = newDate;
                _context.Produkty.Update(produkt);
                await _context.SaveChangesAsync();
            }
        }
    }
}