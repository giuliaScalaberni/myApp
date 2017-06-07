var presencesController = angular.module('presencesController', []);
presencesController.controller('presencesCtrl', ['$scope','$rootScope', '$http', '$route', '$location','NgTableParams', function($scope,$rootScope, $http, $route, $location,NgTableParams) {
  if ( $rootScope.groupId == undefined || $rootScope.userId == undefined)
  {

    $location.path("/");
  }
  $scope.goBack=function(){
    window.history.back();
  };
  var self = this;
//var data = [{name: "Moroni", age: 50} /*,*/];

  var data = [{

        age: 24,
        name: "Mathis Hurst"

    }, {

        age: 38,
        name: "Gallegos Ryan"

    }    ];
    self.tableParams = new NgTableParams({}, { dataset: data});


}]);
