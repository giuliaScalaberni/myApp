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
  $scope.goBack=function(){
    window.history.back();
  };
  $scope.createPerson=function(){
    var obj='{"name":"'+$('#name').val()+'", "userData":"'+$('#data').val()+'"}';
    $http({
            method : "POST",
            url : "https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/"+$rootScope.groupId+"/persons",
            headers: {
              'Content-Type': 'application/json',
              'Ocp-Apim-Subscription-Key':'19ea017349b84f56aa12bf38a4b50756'
            },
            data: obj
          })
          .then(function mySucces(response) {
            alert("New person created! "+ response.data.personId);
            var json = $.param({nome:$('#name').val() , pers: response.data.personId});
            $http({
              method : "POST",
              url : 'http://localhost:80/putUser.php',
              data: json,
              headers : { 'Content-Type': 'application/x-www-form-urlencoded' }

            }).then(function mySucces(ris) {
            //  alert(ris);

              })

            $rootScope.userId=response.data.personId;
            $location.path('/get-person');
          },
          function myError(response) {
            alert(response.data.error.code+": "+response.data.error.message);

          });
        };
});
