using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Rosen.Models
{
    public class Map
    {
        public int id { get; set; }
        public List<MapTiles> tiles { get; set; }
        public List<User> Users { get; set; }

        
    }
}