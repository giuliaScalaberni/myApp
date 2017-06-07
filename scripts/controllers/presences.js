var presencesController = angular.module('presencesController', []);
presencesController.controller('presencesCtrl', function($scope,$rootScope, $http, $route, $location) {
  $scope.goBack=function(){
    window.history.back();
  };

});
