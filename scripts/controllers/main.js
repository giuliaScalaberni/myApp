'use strict';

/**
 * @ngdoc function
 * @name documentsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the documentsApp
 */
angular.module('documentsApp')
  .controller('MainCtrl', function ($scope, $http, $route, $rootScope) {
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
          alert("Error");
      });

      $scope.findPeople=function(id){
        $rootScope.groupId=id;
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
              alert("Error");
          });

      };
      $scope.showPerson=function(id){
        //$rootScope.=id;
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
              alert("Error");
          });

      };

    $scope.trash=function(id){
      $scope.gid=id;
      $('#modalDelete').modal('show');
      $scope.item="group";
    };
    $scope.trashP=function(pid){
        $scope.pid=pid;
        $('#modalDelete').modal('show');
        $scope.item="person";
      };
    $scope.delete=function(){
       $('#modalDelete').modal('hide');
       if ($scope.item=="group"){
       $http({
             method : "delete",
             url : "https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/"+$scope.gid,
             headers: {
               'Content-Type': 'application/json',
               'Ocp-Apim-Subscription-Key':'19ea017349b84f56aa12bf38a4b50756'
             }
         }).then(function mySucces(response) {
            alert("Delete succeeded");
            $scope.gid="";
            $scope.pid="";
            $route.reload();
         }, function myError(response) {
             alert("Not possible to delete");
         });
         }
         else {
           $http({
                 method : "delete",
                 url : "https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/"+$rootScope.groupId+"/persons/"+$scope.pid,
                 headers: {
                   'Content-Type': 'application/json',
                   'Ocp-Apim-Subscription-Key':'19ea017349b84f56aa12bf38a4b50756'
                 }
             }).then(function mySucces(response) {
                alert("Delete succeeded");
                $scope.gid="";
                $scope.pid="";
                $route.reload();
             }, function myError(response) {
                 alert("Not possible to delete");
             });
         }

    };
});
