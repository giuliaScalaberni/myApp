var presencesController = angular.module('presencesController', []);
presencesController.controller('presencesCtrl', function($scope,$rootScope, $http, $route, $location) {
  if ( $rootScope.groupId == undefined || $rootScope.userId == undefined)
  {

    $location.path("/");
  }
  $scope.goBack=function(){
    window.history.back();
  };

  $scope.people = [{
        "id": 0,
        "age": 24,
        "name": "Mathis Hurst",
        "birthdate": "2004-11-17T00:04:56 -01:00"
    }, {
        "id": 1,
        "age": 38,
        "name": "Gallegos Ryan",
        "birthdate": "2001-08-06T11:04:54 -02:00"
    }, {
        "id": 2,
        "age": 27,
        "name": "Jodi Valencia",
        "birthdate": "2012-10-16T12:15:19 -02:00"
    }, {
        "id": 3,
        "age": 28,
        "name": "Jenna Anderson",
        "birthdate": "1990-05-06T01:57:40 -02:00"
    }, {
        "id": 4,
        "age": 28,
        "name": "Horne Clark",
        "birthdate": "1991-11-19T19:23:53 -01:00"
    }];
    $scope.list = $scope.$parent.people;
 $scope.config = {
   itemsPerPage: 5,
   fillLastPage: true
 };

});
