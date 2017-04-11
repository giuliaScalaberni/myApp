'use strict';

/* Controllers */

var photoAlbumControllers = angular.module('photoAlbumControllers', ['ngFileUpload']);

photoAlbumControllers.controller('photoUploadCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'Upload', 'cloudinary',
  /* Uploading with Angular File Upload */
  function($scope, $rootScope, $routeParams, $location, $upload, cloudinary) {
    var d = new Date();
    $scope.title = "Image_" + d.getDate() + " - " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    //$scope.$watch('files', function() {


    $scope.uploadFile = function(){
      var video = document.getElementById('video');
      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, 640, 480);
      var x = canvas.toDataURL('image/png');


          alert(x);
        if (x &&!x.$error) {
          x.upload = $upload.upload({
            url: "https://api.cloudinary.com/v1_1/" + cloudinary.config().cloud_name + "/upload",
            data: {
              upload_preset: cloudinary.config().upload_preset,
              tags: 'myphotoalbum',
              context: 'photo=' + $scope.title,
              file: x
            }
          }).progress(function (e) {
            x.progress = Math.round((e.loaded * 100.0) / e.total);
            x.status = "Uploading... " + x.progress + "%";
          }).success(function (data, status, headers, config) {
            $rootScope.photos = $rootScope.photos || [];
            data.context = {custom: {photo: $scope.title}};
            x.result = data;
            $rootScope.photos.push(data);
          }).error(function (data, status, headers, config) {
            x.result = data;
          });
        };

   //});
 };

     angular.element(document).ready(function () {
    var video = document.getElementById('video');
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    // Get access to the camera!
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
        navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
            video.src = window.URL.createObjectURL(stream);
            video.play();
        });
    }
  });
    //});

    /* Modify the look and fill of the dropzone when files are being dragged over it */
    /*$scope.dragOverClass = function($event) {
      var items = $event.dataTransfer.items;
      var hasFile = false;
      if (items != null) {
        for (var i = 0 ; i < items.length; i++) {
          if (items[i].kind == 'file') {
            hasFile = true;
            break;
          }
        }
      } else {
        hasFile = true;
      }
      return hasFile ? "dragover" : "dragover-err";
    };*/
  }]);
