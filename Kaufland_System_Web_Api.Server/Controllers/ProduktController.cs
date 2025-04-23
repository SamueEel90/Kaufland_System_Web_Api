using Kaufland_Software.Server.Data;
using Kaufland_Software.Server.Modely;
using Kaufland_Software.Server.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

[Route("api/[controller]")]
[ApiController]
public class ProductController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ProduktService _produktService;

    public ProductController(AppDbContext context, ProduktService produktService)
    {
        _context = context;
        _produktService = produktService;
    }

    [HttpGet("GetAllProducts")]
    public async Task<ActionResult<IEnumerable<Produkt>>> GetAllProducts()
    {
        return await _context.Produkty.ToListAsync();
    }

    [HttpGet("Search")]
    public IActionResult Search(string searchType, string searchTerm)
    {
        IQueryable<Produkt> query = _context.Produkty;

        if (searchType == "Nazov")
        {
            query = query.Where(a => a.Nazov.Contains(searchTerm));
        }
        else if (searchType == "EanKod")
        {
            query = query.Where(a => a.EanKod.Contains(searchTerm));
        }

        return Ok(query.ToList());
    }

    [HttpPatch("KorekciaZasob/{id}")]
    public async Task<ActionResult> KorekciaZasob(int id, [FromBody] int quantity)
    {
        var produkt = await _produktService.GetProduktById(id);
        if (produkt == null)
        {
            return NotFound();
        }
        produkt.Zasoba = quantity;

        await _produktService.UpdateProdukt(produkt);
        return NoContent();
    }

    [HttpPatch("Odpisy/{id}")]
    public async Task<ActionResult> Odpisy(int id, [FromBody] int quantity)
    {
        var produkt = await _produktService.GetProduktById(id);
        if (produkt == null)
        {
            return NotFound();
        }
        produkt.Zasoba -= quantity;

        await _produktService.UpdateProdukt(produkt);
        return NoContent();
    }

    [HttpPatch("MAX/{id}")]
    public async Task<ActionResult> MAX(int id, [FromBody] int quantity)
    {
        var produkt = await _produktService.GetProduktById(id);
        if (produkt == null)
        {
            return NotFound();
        }
        produkt.MaxZasoba = quantity;
        await _produktService.UpdateProdukt(produkt);
        return NoContent();
    }

    [HttpPatch("OPT/{id}")]
    public async Task<ActionResult> OPT(int id, [FromBody] int quantity)
    {
        var produkt = await _produktService.GetProduktById(id);
        if (produkt == null)
        {
            return NotFound();
        }
        produkt.MinZasoba = quantity;
        await _produktService.UpdateProdukt(produkt);
        return NoContent();
    }

    [HttpGet("RegularOrder")]
    public async Task<ActionResult<IEnumerable<Produkt>>> GetLowStockProducts(string category)
    {
        var lowStockProducts = await _produktService.GetLowStockProducts(category);
        return Ok(lowStockProducts);
    }
    [HttpGet("NulovaZasoba")]
    public async Task<ActionResult<IEnumerable<Produkt>>> GetZeroStockProducts()
    {
        var zeroStockProducts = await _produktService.GetZeroStockProducts();
        return Ok(zeroStockProducts);
    }
    [HttpGet("MinusovaZasoba")]
    public async Task<ActionResult<IEnumerable<Produkt>>> GetNegativeStockProducts()
    {
        var negativeStockProducts = await _produktService.GetNegativeStockProducts();
        return Ok(negativeStockProducts);
    }
    [HttpGet("AsProcess")]
    public async Task<ActionResult<IEnumerable<Produkt>>> GetAsProcess()
    {
    var asProcesItems = await _produktService.GetAsProcess();
    return Ok(asProcesItems);
    }
    [HttpPatch("ZmenaFazyAs/{id}")]
    public async Task<ActionResult> ZmenaFazyAs(int id, int day, int month, int year)
    {
    await _produktService.SetNewAsPeriod(id, day, month, year);
    return NoContent();
    }
}