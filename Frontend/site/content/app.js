angular.module('App', ['ngAnimate'])


.controller('InfoController', ['$scope' , 'order',  function($scope, order){


}])
.controller('MapController', ['$scope' , 'order', '$animate', function($scope, order, $animate){

    $scope.tiles = [];

    $scope.startWidth = 1600;
    $scope.columns = 14;
    $scope.tileWidth = 120;
    $scope.tileHeight = 68;
  //  $scope.startHeight = 0;
    var y = 1;
    var x = 1;
    var tiletype = "generic";
    var business = ["carstore", "weaponstore", "unemploymentoffice", "courthouse", "policestation", "bikeandmopedstore", "hospital", "cityhall"];
    order.shuffle(business);
    var occupied = false;
    var gangcolor = "";
    
    $scope.movemap = function(top, left) {

       
            $("#content").animate({
                
                left: left,
                top: top
                
            }, 1000, function () {
                // Animation complete.
            });

             
    
    };

    var generateTiles = function(numberOfTiles){
         for (var i = 0; i < numberOfTiles; i++) {
            var tile = {};
            if (i > 10 && y < 5 && x > 8) {
                occupied = true;
                gangcolor = "1AFCF0";

            }
            else if (y > 1 && y < 5 && x > 4 && x < 9) {
                occupied = true;
                gangcolor = "E8F908";

            }
            else if (y > 0 && y < 5 && x < 4) {
                occupied = true;
                gangcolor = "EB7465";

            }
            else if (y > 5 && y < 9 && x < 4) {
                occupied = true;
                gangcolor = "6BB7DD";

            }
            else if (y > 5 && y < 9 && x > 10) {
                occupied = true;
                gangcolor = "1EFA3F";

            }
            else if (y > 9 && x > 10) {
                occupied = true;
                gangcolor = "FABF1E";

            }
            else if (y > 9 && x < 6) {
                occupied = true;
                gangcolor = "B35DED";

            }
            else if (y > 9 && x > 6 && x < 10) {
                occupied = true;
                gangcolor = "DB42C7";

            }
            else {
                gangcolor = "";
            }

            var mapnumber = Math.floor((Math.random() * 6) + 1);

            if (i == 21 || i == 31 || i == 40 || i == 86 || i == 97 || i == 157 || i == 166 || i == 175) {
                mapnumber = "hq";
                tiletype = "hq";
                gangcolor = "";
            }
            else if (y > 6 && y < 9 && x > 4 && x < 11) {

                if (y == 7) {
                    mapnumber = "mainstreet";
                }
                else {
                    mapnumber = "mainstreet2";
                }


                tiletype = "mainstreet";

            }
            else if ((y == 6 || y == 9) && (x > 4 && x < 11)) {

                if (x == 5 || x == 10) {
                    tiletype = "gasstation";
                }
                else {
                    tiletype = business.splice(0, 1);
                }

                mapnumber = tiletype;

            }
            else {
                tiletype = "generic";
            }



            var specialplacement = "none";

            if (i < 16) {
                specialplacement = "topright";
            }
            else if (i > 182) {
                specialplacement = "bottomleft";
            }
            else if (i % 14 == 0) {
                specialplacement = "bottomright";
            }
            else if ((i - 1) % 14 == 0) {
                specialplacement = "topleft";
            }

            if (i == 0) {
                specialplacement = "top";
            }

            if (i == 196) {
                specialplacement = "bottom";
            }

            if (i == 183) {
                specialplacement = "left";
            }

            if (i == 14) {
                specialplacement = "right";
            }

            var tile = { id: i, mapnumber: mapnumber, x: x, y: y, specialplacement: specialplacement, tiletype: tiletype, status: "showtile", occupied: occupied, gangcolor: gangcolor, items: [] }

           
/*
            $(div).css("top", height);
            $(div).css("z-index", i);
            $(div).css("left", width);

 */        

/*
            $scope.width = $scope.width + 120;
            $scope.height = $scope.height + 68;
            x++;

            
            if ((i+1) % columns == 0) {

                $scope.width = startwidth - 120;
                startwidth = startwidth - 120;
                y++;
                x = 1;

                $scope.height = startheight + 68;
                startheight = startheight + 68;

            }

*/
            $scope.tiles.push(tile);
        }
    };

    generateTiles(196);

  

}])

.directive('tile', function(){

    return {
        
        restrict: 'A',
        templateUrl: 'content/tile.tpl.html',
        replace:true,
        transclude:true,
        link:function(scope, attrs, element){
            scope.calcHeight = function(index, columns, tileHeight){
                return Math.floor(index / columns) * tileHeight + ((index % columns) * tileHeight);
            }
            scope.calcWidth = function(index, columns, startWidth, tileWidth){
                var width = 0;
                var sp = startWidth - Math.floor(index / columns) * tileWidth
                if(index % columns === 0){
                    width = sp;
                }
                else{
                    width = sp + (index % columns) * tileWidth;
                }
                return width;
            }
            
           
            var setGangColor = function(i, tile){
                 if (i > 10 && tile.y < 5 && tile.x > 8) {
                    tile.occupied = true;
                    tile.gangcolor = "1AFCF0";

                }
                else if (tile.y > 1 && tile.y < 5 && tile.x > 4 && tile.x < 9) {
                    tile.occupied = true;
                    tile.gangcolor = "E8F908";

                }
                else if (tile.y > 0 && tile.y < 5 && tile.x < 4) {
                    tile.occupied = true;
                    tile.gangcolor = "EB7465";

                }
                else if (tile.y > 5 && tile.y < 9 && tile.x < 4) {
                    tile.occupied = true;
                    tile.gangcolor = "6BB7DD";

                }
                else if (tile.y > 5 && tile.y < 9 && tile.x > 10) {
                    tile.occupied = true;
                    tile.gangcolor = "1EFA3F";

                }
                else if (tile.y > 9 && tile.x > 10) {
                    tile.occupied = true;
                    tile.gangcolor = "FABF1E";

                }
                else if (tile.y > 9 && tile.x < 6) {
                    tile.occupied = true;
                    tile.gangcolor = "B35DED";

                }
                else if (tile.y > 9 && tile.x > 6 && tile.x < 10) {
                    tile.occupied = true;
                    tile.gangcolor = "DB42C7";

                }
                else {
                    tile.gangcolor = "";
                }
            };
            setGangColor(scope.$index, scope.tile);
        }
    };
})

.factory('order', function(){
    var shuffle = function(array) {
        var counter = array.length, temp, index;

        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            index = Math.floor(Math.random() * counter);

            // Decrease counter by 1
            counter--;

            // And swap the last element with it
            temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }

        return array;
    };
    return {
        shuffle : shuffle
    };
})



