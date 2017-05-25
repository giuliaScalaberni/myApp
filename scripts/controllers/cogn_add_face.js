'use strict';

/**
 * @ngdoc function
 * @name documentsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the documentsApp
 */

    var cognAddFileController = angular.module('cognAddFileController', []);
cognAddFileController.controller('cognAddFileCtrl', function($scope,$rootScope, $http, $location) {

  
    $scope.getFaces=function(){
      var params = {
          // Request parameters
          "personGroupId": $rootScope.groupId,
          "personId":  $rootScope.userId,
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
          $scope.warningAlert=0;
          $scope.successAlert=0;
        }, function myError(response) {
            alert("Error");
            $location.path("/");
        });



    };
});
