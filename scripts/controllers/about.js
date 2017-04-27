'use strict';

/**
 * @ngdoc function
 * @name documentsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the documentsApp
 */
angular.module('documentsApp')

  .controller('AboutCtrl', ['$scope','$rootScope', 

    function() {

      alert($rootScope.url);

    }]);
