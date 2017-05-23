'use strict';

/**
 * @ngdoc function
 * @name documentsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the documentsApp
 */

    var getPersonController = angular.module('getPersonController', []);
getPersonController.controller('getPersonCtrl', function($scope,$rootScope, $http) {


    var params = {
        // Request parameters
        "personGroupId": "050498",
        "personId": "bf0d6b4a-c928-487e-91cb-efab9abf0435"
    };
    $http({
          method : "GET",
          url : "https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/{personGroupId}/persons/{personId}?" + $.param(params),
          headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key':'19ea017349b84f56aa12bf38a4b50756'
          },
      }).then(function mySucces(response) {
        $scope.faces = response.data;
      }, function myError(response) {
          alert("Error");
      });



  });
