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
   'photoAlbumServices'
 ]);

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


/*angular
  .module('documentsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'cloudinary',
    'photoAlbumAnimations',
    'photoAlbumControllers',
    'photoAlbumServices'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });*/
