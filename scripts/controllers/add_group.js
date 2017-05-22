'use strict';

/**
 * @ngdoc function
 * @name documentsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the documentsApp
 */
var addGroupController = angular.module('addGroupController', []);
addGroupController.controller('addGroupCtrl', function($scope,$rootScope, $http,$location) {
  $scope.createGroup=function(){
    var obj='{"name":"'+$('#name').val()+'", "userData":"'+$('#data').val()+'"}';
    $http({
            method : "PUT",
            url : "https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/"+$('#id').val(),
            headers: {
              'Content-Type': 'application/json',
              'Ocp-Apim-Subscription-Key':'19ea017349b84f56aa12bf38a4b50756'
            },
            data: obj
          })
          .then(function mySucces(response) {
            alert("New group created!");
            $location.path('/index');
          },
          function myError(response) {
            alert(response.data.error.code+": "+response.data.error.message);
          });
        };
});
