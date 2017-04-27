'use strict';

/**
 * @ngdoc function
 * @name documentsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the documentsApp
 */

    var cognitiveController = angular.module('cognitiveController', []);
cognitiveController.controller('AboutCtrl', function($rootScope) {
  alert($rootScope.url);
});
