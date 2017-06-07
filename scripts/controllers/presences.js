var presencesController = angular.module('presencesController', []);
presencesController.controller('presencesCtrl', function($scope,$rootScope, $http, $route, $location) {
  if ( $rootScope.groupId == undefined || $rootScope.userId == undefined)
  {

    $location.path("/");
  }
  $scope.goBack=function(){
    window.history.back();
  };

});
