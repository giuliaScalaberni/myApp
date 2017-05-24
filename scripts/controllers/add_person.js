'use strict';

/**
 * @ngdoc function
 * @name documentsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the documentsApp
 */
var addPersonController = angular.module('addPersonController', []);
addPersonController.controller('addPersonCtrl', function($scope,$rootScope, $http,$location) {
  if ($rootScope.groupId==undefined){
    $location.path('/');
  }
  $scope.createPerson=function(){
    var obj='{"name":"'+$('#name').val()+'", "userData":"'+$('#data').val()+'"}';
    $http({
            method : "PUT",
            url : "https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/"+$rootScope.groupId+"/persons",
            headers: {
              'Content-Type': 'application/json',
              'Ocp-Apim-Subscription-Key':'19ea017349b84f56aa12bf38a4b50756'
            },
            data: obj
          })
          .then(function mySucces(response) {
            alert("New person created! "+ response.personId);
            $rootScope.userId=response.personId;
            $location.path('/get-person');
          },
          function myError(response) {
            alert(response.data.error.code+": "+response.data.error.message);
            
          });
        };
});
