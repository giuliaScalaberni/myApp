'use strict';

/**
 * @ngdoc function
 * @name documentsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the documentsApp
 */
    var loginController = angular.module('loginController', []);
loginController.controller('loginCtrl', function($scope,$rootScope, $http, $route, $location) {
  function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
    $rootScope.mail=profile.getEmail();
    $rootScope.image=profile.getImageUrl();
    $scope.login=true;
  };

   function signOut() {
     var auth2 = gapi.auth2.getAuthInstance();
     auth2.signOut().then(function () {
       console.log('User signed out.');
       $scope.login=false;
       $rootScope.mail="";
       $rootScope.image="";
     });
   };

   if ($rootScope.mail!=""){
     alert($rootScope.mail);
   }
  window.onSignIn = onSignIn;

  });
