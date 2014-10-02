using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Rosen.Models
{
    public class Service
    {
        public Service()
        {
            TestUsers = new List<User>();
            for (int i = 1; i < 11; i++)
            {
                var user = new User()
                {
                    Id = i,
                    Name = "User" + i
                };
                TestUsers.Add(user);

            }
        }
        private List<string> GetSpecialTileTypes()
        {

            return new List<string>() { "GasStation", "BikeStore", "CarStore", "PoliceStation", "UndemploymentOffice", "Hospital", "CourtHouse", "WeaponStore"  };
        }
        private List<string> GetGenericTileTypes()
        {

            return new List<string>() { "Houses", "Park", "HorseTrack", "Alley", "HockeyRink", "Pizzeria" , "ConstructionYard" , "Slum" };
        }

        private List<MapTile> GetHQPositions()
        {
            var list = new List<MapTile>();
            list.Add(
                new MapTile()
                {
                    PositionX = 7,
                    PositionY = 2
                });
            list.Add(
                new MapTile()
                {
                    PositionX = 10,
                    PositionY = 2
                });
            list.Add(
                new MapTile()
                {
                    PositionX = 3,
                    PositionY = 3
                });
            list.Add(
                new MapTile()
                {
                    PositionX = 14,
                    PositionY = 3
                });
            list.Add(
                new MapTile()
                {
                    PositionX = 2,
                    PositionY = 6
                });
            list.Add(
                new MapTile()
                {
                    PositionX = 15,
                    PositionY = 6
                });
            list.Add(
                new MapTile()
                {
                    PositionX = 3,
                    PositionY = 10
                });
            list.Add(
                new MapTile()
                {
                    PositionX = 7,
                    PositionY = 11
                });
            list.Add(
                new MapTile()
                {
                    PositionX = 10,
                    PositionY = 11
                });
            list.Add(
                new MapTile()
                {
                    PositionX = 14,
                    PositionY = 10
                });
            return list;
        }

        private List<MapTile> GetAllMapTiles()
        {
            var tileId = 0;
            var rand = new Random();
            var mapTiles = new List<MapTile>();
            for (var x = 1; x <= 16; x++)
            {
                
                for(var y = 1; y <= 12; y++){


                    var tile = new MapTile();
                    tile.TileId = tileId++;
                    tile.PositionX = x;
                    tile.PositionY = y;
                   
                    tile.CategoryType = "Generic";
                    var genericTypes = GetGenericTileTypes();
                    
                    int r = rand.Next(genericTypes.Count);
                    tile.TileType = genericTypes[r];
                    
                    mapTiles.Add(tile);
                }
            }
            var specialTiles = GetSpecialTileTypes().OrderBy(t => Guid.NewGuid()).ToList();
            var currentX = 5;
            var currentY = 5;
            var timesLeftToChangeRow = 3;
            foreach (var tile in specialTiles)
            {
               
                var positionX = rand.Next(currentX, currentX + 2);
                var positionY = rand.Next(currentY, currentY + 2);
                var mapTile = mapTiles.Where(t => t.PositionX == positionX && t.PositionY == positionY).FirstOrDefault();
                mapTile.CategoryType = "Special";
                mapTile.TileType = tile;
                if (timesLeftToChangeRow == 0)
                {
                    currentX = 5;
                    currentY = 7;
                    timesLeftToChangeRow = 4;
                }
                else
                {
                    currentX += 2;
                    timesLeftToChangeRow --;
                }

            }
            var hqs = GetHQPositions().OrderBy(t => new Guid()).ToList();
            var counter = 0;
            var users = TestUsers;
            foreach (var user in users)
            {
                var hq = hqs[counter++];
                var mapTile = mapTiles.Where(t => t.PositionX == hq.PositionX && t.PositionY == hq.PositionY).FirstOrDefault();
                mapTile.UserId = user.Id;
                mapTile.TileType = "HQ";
                mapTile.CategoryType = "Special";
            }

            return mapTiles;

        }
        public List<User> TestUsers { get; set; }
       
        private void AddUserToMap(User user, Map map)
        {
            map.Users.Add(user);

        }

        public List<MapTile> GenerateMap()
        {
            var tiles = GetAllMapTiles();

            return tiles.OrderBy(t => t.PositionY ).ThenBy(t => t.PositionX).ToList();
        }
        public List<Vehicle> GetVehicles()
        {

            var list = new List<Vehicle>();
            var vehicle = new Vehicle();
            vehicle.TileId = 5;
            vehicle.Name = "Skoda";
            vehicle.Speed = 18;
            vehicle.Type = "Car";
            list.Add(vehicle);
            return list;

        }
    }
}