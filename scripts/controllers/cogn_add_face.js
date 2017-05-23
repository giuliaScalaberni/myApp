'use strict';

/**
 * @ngdoc function
 * @name documentsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the documentsApp
 */

    var cognAddFileController = angular.module('cognAddFileController', []);
cognAddFileController.controller('cognAddFileCtrl', function($scope,$rootScope, $http) {

  var params = {
      // Request parameters
      "personGroupId": "050498",
      "personId": "bf0d6b4a-c928-487e-91cb-efab9abf0435",
      "userData": "photoXXX",
  };
  var obj='{"url":"'+$rootScope.url+'"}';
  $http({
        method : "POST",
        url : "https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/{personGroupId}/persons/{personId}/persistedFaces?" + $.param(params),
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key':'19ea017349b84f56aa12bf38a4b50756'
        },
         data: obj
    }).then(function mySucces(response) {
      $scope.warningAlert=0;
      $scope.myWelcome="Face added, id: "+response.data.persistedFaceId;
      $scope.successAlert=1;
    }, function myError(response) {
        $scope.myWelcome = response.data.error.code+": "+response.data.error.message;
        $scope.warningAlert=1;
        $scope.successAlert=0;
    });

    $scope.getFaces=function(){
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
          $scope.warningAlert=0;
          $scope.successAlert=0;
        }, function myError(response) {
            alert("Error");
        });



    };
});
