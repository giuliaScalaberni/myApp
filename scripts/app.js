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
   'welcomeController',
    'webcam',
    'addGroupController',
    'getPersonController',
    'addPersonController',
    'loginController',
    'angularSpinkit',
    'presencesController',
    'oldUsersController',
    //'uploadSnap'


 ]);


 documentsApp.config(['$routeProvider',
   function ($routeProvider) {
     $routeProvider
     .when('/add', {
       templateUrl: 'views/add-face.html',
       controller: 'addFaceCtrl',

     })
     .when('/photos', {
       templateUrl: 'views/photo-upload.html',
       controller: 'photoUploadCtrl',

     }).when('/main', {
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
     .when('/get-person', {
       templateUrl: 'views/get-person.html',
       controller: 'getPersonCtrl',
     })
     .when('/add-person', {
       templateUrl: 'views/add-person.html',
       controller: 'addPersonCtrl',
     })
     .when('/', {
       templateUrl: 'views/login.html',
       controller: 'loginCtrl',
     })
     .when('/presences', {
       templateUrl: 'views/presences.html',
       controller: 'presencesCtrl',
     })
     .when('/old-users', {
       templateUrl: 'views/old-users.html',
       controller: 'oldUsersCtrl',
     })
     .otherwise({
       redirectTo: '/'
     });
   }]);
