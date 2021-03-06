'use strict';

/**
 * @ngdoc function
 * @name documentsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the documentsApp
 */
angular.module('documentsApp')
  .controller('MainCtrl', function ($scope, $http, $route, $rootScope, $location) {
    $scope.warningAlert = 0;
    $scope.button=0;
    $scope.buttonPerson=0;
    $scope.load=1;
    $scope.loadPerson=1;
    $rootScope.groupId="";
    $rootScope.datas="";

    if($rootScope.admin==false){
      $location.path("/photos");
    };
    $http({
          method : "GET",
          url : "https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups",
          headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key':'19ea017349b84f56aa12bf38a4b50756'
          },
      }).then(function mySucces(response) {
        $scope.load=0;
        $scope.groups = response.data;
        $scope.button=1;
      }, function myError(response) {
          alert(response.data);
          $scope.warningInternet=1;


      });
      $scope.old=function(){
        $location.path("/old-users");
      }

      $scope.signOut=function() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          console.log('User signed out.');
          $rootScope.login=false;
          $rootScope.email=undefined;
          $rootScope.image="";
          $scope.admin=false;
          $location.path("/login");
        });
      };

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

            $scope.buttonPerson=1;
            $scope.loadPerson=0;
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
              $scope.buttonPerson=0;
              alert("Error");
          });

      };
      $scope.showPerson=function(id){
        $rootScope.userId=id;
        $location.path("/get-person");

      };
      /*$scope.onSignIn=function(googleUser) {
        // Useful data for your client-side scripts:
        var profile = googleUser.getBasicProfile();
        console.log("ID: " + profile.getId()); // Don't send this directly to your server!
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log("Image URL: " + profile.getImageUrl());
        console.log("Email: " + profile.getEmail());

        // The ID token you need to pass to your backend:
        var id_token = googleUser.getAuthResponse().id_token;
        console.log("ID Token: " + id_token);
      };*/

    $scope.trash=function(id){
      $scope.gid=id;
      $('#modalDelete').modal('show');
      $scope.item="group";
    };
    $scope.delete=function(){
       $('#modalDelete').modal('hide');
       $http({
             method : "delete",
             url : "https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/"+$scope.gid,
             headers: {
               'Content-Type': 'application/json',
               'Ocp-Apim-Subscription-Key':'19ea017349b84f56aa12bf38a4b50756'
             }
         }).then(function mySucces(response) {
            alert("Delete succeeded");

              var json = $.param({groupId: $scope.gid});
            $http({
              method : "POST",
              url : 'http://localhost:80/deleteGroup.php',
              data: json,
              headers : { 'Content-Type': 'application/x-www-form-urlencoded' }

            }).then(function mySucces() {
                $location.path("/main");
              }), function myError(r) {
                  alert("Error: "+r);
              };
            $scope.gid="";
            $scope.pid="";
            $route.reload();
         }, function myError(response) {
             alert("Not possible to delete");
         });

    };
});
