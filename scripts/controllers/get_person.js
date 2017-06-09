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

  if ( $rootScope.groupId == undefined || $rootScope.userId == undefined)
  {

    $location.path("/");
  }
  $scope.getDatas=1;

  var json = $.param({personId: $rootScope.userId});
  $scope.goBack=function(){
    window.history.back();
    $rootScope.groupId="";
  };
  

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
        $scope.getDatas=0;
        $rootScope.infos=response.data;
        if (response.data.persistedFaceIds.length==0)
        {
          $scope.alert=1;
        }
        else{
            $scope.alert=0;
            $http({
              method : "POST",
              url : 'http://localhost:80/getSnaps.php',
              data: json,
              headers : { 'Content-Type': 'application/x-www-form-urlencoded' }

            }).then(function mySucces(ris) {
              $rootScope.datas=ris.data;
              })
        }
        $rootScope.name=response.data.name;





      }, function myError(response) {
          //alert("No parameters to get a response");
          $location.path("/");
      });

      $scope.getPresents=function(){
        $location.path("/presences");
      };

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
        $scope.addPhoto=function(){
          $location.path("/add");
        };
        $scope.verifyPerson=function(){
          $rootScope.name=$scope.infos.name;
          $location.path("/photos");
        };


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
                    var group=$.param({faceId: $scope.id});
                    $http({
                      method : "POST",
                      url : 'http://localhost:80/deleteFace.php',
                      data: group,
                      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }

                    }).then(function mySucces() {
                        $location.path("/");
                      }), function myError(r) {
                          alert("Error: "+r);
                      };
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
                 $http({
                   method : "POST",
                   url : 'http://localhost:80/deleteFaces.php',
                   data: json,
                   headers : { 'Content-Type': 'application/x-www-form-urlencoded' }

                 }).then(function mySucces() {
                     $location.path("/");
                   }), function myError(r) {
                       alert("Error: "+r);
                   };


              }, function myError(response) {
                  alert("Not possible to delete");
              });
          }
        };

  });
