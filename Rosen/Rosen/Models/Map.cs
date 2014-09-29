using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Rosen.Models
{
    public class Map
    {
        public int Id { get; set; }
        public List<MapTile> Tiles { get; set; }
        public List<User> Users { get; set; }
        public string Mapname { get; set; }
        public int TilesNumberX { get; set; }
        public int TilesNumberY { get; set; }
       
    }
}