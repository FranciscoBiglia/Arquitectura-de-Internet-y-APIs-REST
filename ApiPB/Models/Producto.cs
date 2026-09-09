using System.ComponentModel.DataAnnotations;

namespace ApiPB.Models;

public class Producto
{

    [Key]
    public int ProductoId { get; set; }
    public string? Nombres { get; set; }
    public string? Descripcion { get; set; }
    public decimal? PrecioCosto { get; set; }
    public decimal? PrecioVenta { get; set; }

}
