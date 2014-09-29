using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Rosen.Models
{
    public class MapTile
    {
        public int TileId { get; set; }
        public int PositionX { get; set; }
        public int PositionY { get; set; }
        public int MapId { get; set; }
        public string CategoryType { get; set; }
        public string TileType { get; set; }
        public int UserId { get; set; }
        public string Street { get; set; }

    }
}