'use strict';
var welcomeController = angular.module('welcomeController', []);
welcomeController.controller('WelcomeCtrl', function($scope,$rootScope, $http,$location) {
if ($rootScope.action == undefined){
  $location.path("/");
}
$scope.goBack=function(){
  window.history.back();
  $rootScope.groupId="";
};

$scope.sortType     = 'data_ora';
$scope.sortReverse  = false;
$scope.searchData   = '';
var self = this;
  var json = $.param({personId: $rootScope.userId});
$http({
  method : "POST",
  url : 'http://localhost:80/getLastPresences.php',
  data: json,
  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }

}).then(function mySucces(ris) {


$scope.users=ris.data;


}), function myError(r) {
    alert("Error: "+r);
};
});
