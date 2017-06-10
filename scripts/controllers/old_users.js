var oldUsersController = angular.module('oldUsersController', []);

oldUsersController.controller('oldUsersCtrl', ['$scope','$rootScope', '$http', '$route', '$location','$filter', function($scope,$rootScope, $http, $route, $location,$filter) {


/*  if ( $rootScope.groupId == undefined || $rootScope.userId == undefined)
  {

    $location.path("/");
  }*/
  $scope.goBack=function(){
    window.history.back();
  };
  $scope.sortType     = 'nome';
  $scope.sortReverse  = false;
  $scope.searchData   = '';
  var self = this;
  $http({
    method : "GET",
    url : 'http://localhost:80/getOldUsers.php',
    headers : { 'Content-Type': 'application/x-www-form-urlencoded' }

  }).then(function mySucces(ris) {

  $scope.oldUsers=ris.data;


  }), function myError(r) {
      alert("Error: "+r);
  };

  $scope.goBack=function(){
    window.history.back();
    $rootScope.groupId="";
  };

  $scope.moreInfos=function(pid){
      $('#modalInfos').modal('show');
      $scope.sortTypeOld     = 'data_ora';
      $scope.sortReverseOld  = false;
      $scope.searchDataOld   = '';
      var self = this;
      $scope.id=pid;
        var json = $.param({personId: pid});
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

    };




}]);
