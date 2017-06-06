'use strict';
var welcomeController = angular.module('welcomeController', []);
welcomeController.controller('WelcomeCtrl', function($scope,$rootScope, $http,$location) {
if ($rootScope.action == undefined){
  $location.path("/");
}

});
