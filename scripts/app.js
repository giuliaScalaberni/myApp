'use strict';

/**
 * @ngdoc overview
 * @name documentsApp
 * @description
 * # documentsApp
 *
 * Main module of the application.
 */
 var documentsApp = angular.module('documentsApp', [
   'ngAnimate',
   'ngCookies',
   'ngResource',
   'ngRoute',
   'ngSanitize',
   'ngTouch',
   'cloudinary',
   'photoAlbumControllers',
   'photoAlbumServices',
    'webcam'
 ]);

 documentsApp.factory('photoUrl', function() {
 var savedData = {}
 function set(data) {
   savedData = data;
 }
 function get() {
  return savedData;
 }

 return {
  set: set,
  get: get
 }

});

 documentsApp.config(['$routeProvider',
   function ($routeProvider) {
     $routeProvider


     .when('/photos', {
       templateUrl: 'views/photo-upload.html',
       controller: 'photoUploadCtrl',

     }).when('/', {
       templateUrl: 'views/main.html',
       controller: 'MainCtrl',
       controllerAs: 'main'
     }).when('/about', {
       templateUrl: 'views/about.html',
       controller: 'AboutCtrl',
       controllerAs: 'about'
     })
     .otherwise({
       redirectTo: '/'
     });
   }]);
