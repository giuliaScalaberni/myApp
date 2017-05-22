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
   'addFaceController',
   'cognitiveController',
   'cognAddFileController',
   'welcomeController',
    'webcam',
    'addGroupController',
    //'uploadSnap'


 ]);


 documentsApp.config(['$routeProvider',
   function ($routeProvider) {
     $routeProvider
     .when('/add', {
       templateUrl: 'views/add-face.html',
       controller: 'addFaceCtrl',

     })
     .when('/uploadAdd', {
       templateUrl: 'views/photo-add-result.html',
       controller: 'cognAddFileCtrl',

     })
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
     }).when('/welcome',{
       templateUrl:'views/welcome.html',
       controller:'WelcomeCtrl',
     })
     .when('/add-group', {
       templateUrl: 'views/add-group.html',
       controller: 'addGroupCtrl',
     })
     .otherwise({
       redirectTo: '/'
     });
   }]);
