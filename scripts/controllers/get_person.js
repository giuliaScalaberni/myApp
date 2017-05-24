'use strict';

/**
 * @ngdoc function
 * @name documentsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the documentsApp
 */

    var getPersonController = angular.module('getPersonController', []);
getPersonController.controller('getPersonCtrl', function($scope,$rootScope, $http, $route, $location) {

    var params = {
        // Request parameters
        "personGroupId": $rootScope.groupId,
        "personId":   $rootScope.userId
    };
    $http({
          method : "GET",
          url : "https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/{personGroupId}/persons/{personId}?" + $.param(params),
          headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key':'19ea017349b84f56aa12bf38a4b50756'
          },
      }).then(function mySucces(response) {
        if (response.data.persistedFaceIds.length==0)
        {
          $scope.alert=1;
        }
        else{
            $scope.alert=0;
        }
        $scope.faces = response.data;

      }, function myError(response) {
          //alert("No parameters to get a response");
          $location.path("/");
      });

      $scope.trashPhoto=function(pid){
          $scope.id=pid;
          $scope.item="photo";
          $('#modalDelete').modal('show');

        };
        $scope.trashPerson=function(){
          $scope.id=$rootScope.userId;
          $scope.item="person";
          $('#modalDelete').modal('show');

        }

        $scope.delete=function(){
           $('#modalDelete').modal('hide');
           if ($scope.item=="photo"){
               $http({
                     method : "delete",
                     url : "https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/"+$rootScope.groupId+"/persons/"+$rootScope.userId+"/persistedFaces/"+$scope.id,
                     headers: {
                       'Content-Type': 'application/json',
                       'Ocp-Apim-Subscription-Key':'19ea017349b84f56aa12bf38a4b50756'
                     }
                 }).then(function mySucces(response) {
                    alert("Delete succeeded");
                    $scope.id="";
                    $route.reload();
                 }, function myError(response) {
                     alert("Not possible to delete");
                 });
          }
          else
          {
            $http({
                  method : "delete",
                  url : "https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/"+$rootScope.groupId+"/persons/"+$rootScope.userId,
                  headers: {
                    'Content-Type': 'application/json',
                    'Ocp-Apim-Subscription-Key':'19ea017349b84f56aa12bf38a4b50756'
                  }
              }).then(function mySucces(response) {
                 alert("Delete succeeded");
                   $location.path("/");

              }, function myError(response) {
                  alert("Not possible to delete");
              });
          }
        };

  });
