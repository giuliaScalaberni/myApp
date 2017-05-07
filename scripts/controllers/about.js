'use strict';

/**
 * @ngdoc function
 * @name documentsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the documentsApp
 */

    var cognitiveController = angular.module('cognitiveController', []);
cognitiveController.controller('AboutCtrl', function($scope,$rootScope, $http) {
  var params = {
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

    alert(response.data[0].faceId);
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
        alert($scope.myWelcome = result.data["isIdentical"]);
      }, function myError(response) {
          alert($scope.myWelcome = result.data.error.code+": "+result.data.error.message);
      });


    }, function myError(response) {
        $scope.myWelcome = response.statusText;
    });


/*  $.ajax({
      url: "https://westus.api.cognitive.microsoft.com/face/v1.0/detect?" + $.param(params),
      beforeSend: function(xhrObj){
          // Request headers
          //xhrObj.setRequestHeader("Content-Type","application/octet-stream");
          xhrObj.setRequestHeader("Content-Type","application/json");
          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","66dfd0519d9144d798e72d8fb4ce03e1");
      },
      type: "POST",
      // Request body
      data:    obj
  })
  .done(function(data) {
      alert("success");
  })
  .fail(function() {
      alert("error");
  });
});*/

});
