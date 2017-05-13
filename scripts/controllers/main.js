'use strict';

/**
 * @ngdoc function
 * @name documentsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the documentsApp
 */
angular.module('documentsApp')
  .controller('MainCtrl', function ($scope, $http) {

    $http({
          method : "GET",
          url : "https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups",
          headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key':'19ea017349b84f56aa12bf38a4b50756'
          },
      }).then(function mySucces(response) {
        $scope.groups = response.data;

      }, function myError(response) {
          alert("ERRORE");
      });

      $scope.findPeople=function(){
        var $this = $(this);
        alert($this);
        var params={
        "personGroupId": $this
      };
        $http({
              method : "GET",
              url : "https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/{personGroupId}?"+$.param(params),
              headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key':'19ea017349b84f56aa12bf38a4b50756'
              },
          }).then(function mySucces(response) {
            $scope.people = response.data;

          }, function myError(response) {
              alert("ERRORE");
          });

      };

    });
