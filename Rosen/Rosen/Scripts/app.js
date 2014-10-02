angular.module('app', [])
    .controller('testController', function ($scope, $http) {

        $http({ method: 'GET', url: address }).
          success(function (data, status, headers, config) {
              // this callback will be called asynchronously
              // when the response is available
              $scope.mapData = data.Map;
              $scope.vehicles = data.Vehicles;
             
              for (var i = 0; i < data.Vehicles.lenght; i++) {
                  
                 
              }
             
          }).
          error(function (data, status, headers, config) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
          });
        
          
    
});