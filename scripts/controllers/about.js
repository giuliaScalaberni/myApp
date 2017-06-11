'use strict';

/**
 * @ngdoc function
 * @name documentsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the documentsApp
 */

    var cognitiveController = angular.module('cognitiveController', []);
cognitiveController.controller('AboutCtrl', function($scope,$rootScope, $http,$location) {
/*  var params = {
      // Request parameters
      "returnFaceId": "true",
      "returnFaceLandmarks": "false"
  };
  var obj='{"url":"'+$rootScope.url+'"}';
  $http({
        method : "POST",
        url : "https://westus.api.cognitive.microsoft.com/face/v1.0/detect?" + $.param(params),
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key':'19ea017349b84f56aa12bf38a4b50756'
        },
         data: obj
    }).then(function mySucces(response) {
    if (response.data.length==0)

  {
      alert("Unsuccessfully operation, please verify again! Make sure your snapshot is ok.");
      $location.path('/photos');
    } else{
    alert("Good snap!");
    var id=response.data[0].faceId;

    var obj = '{ "faceId": "'+id+'","personId": "bf0d6b4a-c928-487e-91cb-efab9abf0435","personGroupId": "050498"}';

    //var obj='{"url":"'+$rootScope.url+'"}';
    $http({
          method : "POST",
          url : "https://westus.api.cognitive.microsoft.com/face/v1.0/verify",
          headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key':'19ea017349b84f56aa12bf38a4b50756'
          },
          data: obj
          // data: obj
      }).then(function mySucces(result) {
        if (result.data["isIdentical"]===true){
        $location.path('/welcome');
      }
        else {


          alert("User not identical. Please try again");
          $location.path('/photos');
        }
        //alert($scope.myWelcome = result.data["isIdentical"]);


      }, function myError(result) {
          alert($scope.myWelcome = result.data.error.code+": "+result.data.error.message);
          $location.path('/photos');
      });


    }}, function myError(response) {
      alert($scope.myWelcome = response.statusText );
      $location.path('/photos');
    });*/




});
