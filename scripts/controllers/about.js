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
  alert($rootScope.url);
  var params = {
      // Request parameters
      "returnFaceId": "true",
      "returnFaceLandmarks": "false",
      "returnFaceAttributes": "glasses",
  };
  var obj='{"url":"'+$rootScope.url+'"}';
  $http({
        method : "POST",
        url : "https://westus.api.cognitive.microsoft.com/face/v1.0/detect?" + $.param(params),
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key':'66dfd0519d9144d798e72d8fb4ce03e1'
        },
         data: obj
    }).then(function mySucces(response) {
        alert($scope.myWelcome = response.data);
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
