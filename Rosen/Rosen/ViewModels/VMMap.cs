
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Rosen.Models;

namespace Rosen.ViewModels
{
    public class VMMap
    {
        public List<MapTile> Map { get; set; }
        public List<Vehicle> Vehicles { get; set; }
    }
}