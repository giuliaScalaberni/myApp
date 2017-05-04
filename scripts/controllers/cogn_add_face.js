'use strict';

/**
 * @ngdoc function
 * @name documentsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the documentsApp
 */

    var cognAddFileController = angular.module('cognAddFileController', []);
cognAddFileController.controller('cognAddFileCtrl', function($scope,$rootScope, $http) {

  var params = {
      // Request parameters
      "personGroupId": "050498",
      "personId": "bf0d6b4a-c928-487e-91cb-efab9abf0435",
      "userData": "photoXXX",
  };
  var obj='{"url":"'+$rootScope.url+'"}';
  $http({
        method : "POST",
        url : "https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/{personGroupId}/persons/{personId}/persistedFaces?" + $.param(params),
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key':'19ea017349b84f56aa12bf38a4b50756'
        },
         data: obj
    }).then(function mySucces(response) {
      $scope.myWelcome = response.data.persistedFaceId;
        alert("persisted ID of last upload: "+$scope.myWelcome);
    }, function myError(response) {
        alert($scope.myWelcome = response.data.error.code+": "+response.data.error.message);
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
