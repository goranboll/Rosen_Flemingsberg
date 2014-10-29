angular.module('app', [])
    .controller('testController', function ($scope, $http) {

        $http({ method: 'GET', url: getmapdata }).
          success(function (data, status, headers, config) {
              // this callback will be called asynchronously
              // when the response is available
              $scope.mapData = data.Map;
              $scope.vehicles = data.Vehicles;
              angular.element(document).ready(function () {

                  for (var i = 0; i < $scope.vehicles.length; i++) {

                      createVehicle($scope.vehicles[i]);
                  }
              });
             
             
          }).
          error(function (data, status, headers, config) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
          });
         
        function createVehicle(vehicle) {

            var vehicleDiv = document.createElement("div");
            $(vehicleDiv).on("click", function () {
                return clickVehicle(vehicle);
            });
            vehicleDiv.innerHTML = vehicle.Name;
            $(vehicleDiv).addClass(vehicle.Type);
            $("#tile" + vehicle.MapTile.TileId + " .layer" ).append(vehicleDiv);
            $scope.$apply();

        }
        function clickVehicle (vehicle) {
            
            getRange(4, vehicle);
        }
        function clickMapTile(vehicle) {

            $http({ method: 'POST', url: postvehiclemove, data: {   }}).

            success(function (data, status, headers, config) {
            
            }).
            error(function (data, status, headers, config) {
             // called asynchronously if an error occurs
             // or server returns response with an error status.
            });
        }
        function getRange( range, vehicle) {

            for (var index in $scope.mapData) {

                if (Math.abs($scope.mapData[index].PositionX - vehicle.MapTile.PositionX) + Math.abs($scope.mapData[index].PositionY - vehicle.MapTile.PositionY) < range) {

                    $scope.mapData[index].isReachable = true;
                    $("#tile" + $scope.mapData[index].TileId + " .layer").addClass("reachable");
                    $("#tile" + $scope.mapData[index].TileId).on("click", function () {
                        return clickMapTile(vehicle);
                    })
                }
                else {


                    $scope.mapData[index].isReachable = false;
                    $("#tile" + $scope.mapData[index].TileId + " .layer").addClass("unreachable");
                }
                    
                    

            }
            $scope.$apply();
        }
    
});