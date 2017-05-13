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
    $scope.warningAlert = 0;
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

      $scope.findPeople=function(id){
        $http({
              method : "GET",
              url : "https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/"+id+"/persons",
              headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key':'19ea017349b84f56aa12bf38a4b50756'
              },
          }).then(function mySucces(response) {
            
            if (response.data.length==0){
              $scope.people='';
              $scope.warningAlert=1;
              //alert("Warning: no user for this group");
            }
            else{
              $scope.warningAlert=0;
                $scope.people='';
            //alert(response.data[0].name)
            $scope.people = response.data;
            }

          }, function myError(response) {
              alert("ERRORE");
          });

      };

    });
