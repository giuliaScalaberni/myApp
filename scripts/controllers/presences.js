var presencesController = angular.module('presencesController', []);

presencesController.controller('presencesCtrl', ['$scope','$rootScope', '$http', '$route', '$location','$filter', function($scope,$rootScope, $http, $route, $location,$filter) {


  if ( $rootScope.groupId == undefined || $rootScope.userId == undefined)
  {

    $location.path("/");
  }
  $scope.goBack=function(){
    window.history.back();
  };
  $scope.sortType     = 'data_ora';
  $scope.sortReverse  = false;
  $scope.searchData   = '';
  var self = this;
    var json = $.param({personId: $rootScope.userId});
  $http({
    method : "POST",
    url : 'http://localhost:80/getPresence.php',
    data: json,
    headers : { 'Content-Type': 'application/x-www-form-urlencoded' }

  }).then(function mySucces(ris) {


  $scope.users=ris.data;


  }), function myError(r) {
      alert("Error: "+r);
  };





}]);
