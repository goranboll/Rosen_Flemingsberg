using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Rosen.Models
{
    public class Vehicle
    {
        public string Type { get; set; }
        public int VehicleId { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
        public int Speed { get; set; }
        public int TileId { get; set; }
    }
}