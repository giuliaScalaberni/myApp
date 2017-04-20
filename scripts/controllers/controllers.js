'use strict';

/* Controllers */

var photoAlbumControllers = angular.module('photoAlbumControllers', ['ngFileUpload']);

photoAlbumControllers.controller('photoUploadCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'Upload', 'cloudinary',
  /* Uploading with Angular File Upload */
  function($scope, $rootScope, $routeParams, $location, $upload, cloudinary) {
    var getVideoData = function getVideoData(x, y, w, h) {
       var hiddenCanvas = document.createElement('canvas');
       hiddenCanvas.width = _video.width;
       hiddenCanvas.height = _video.height;
       var ctx = hiddenCanvas.getContext('2d');
       ctx.drawImage(_video, 0, 0, _video.width, _video.height);
       return ctx.getImageData(x, y, w, h);
   };
   var sendSnapshotToServer = function sendSnapshotToServer(imgBase64) {
       $scope.snapshotData = imgBase64;
   };

    var d = new Date();
    $scope.webcamError = false;
   $scope.onError = function (err) {
       $scope.$apply(
           function() {
               $scope.webcamError = err;
           }
       );
   };

   $scope.onSuccess = function () {
       // The video element contains the captured camera data
       _video = $scope.channel.video;
       $scope.$apply(function() {
           $scope.patOpts.w = _video.width;
           $scope.patOpts.h = _video.height;
           //$scope.showDemos = true;
       });
   };

   $scope.onStream = function (stream) {
       // You could do something manually with the stream.
   };
    $scope.title = "Image_" + d.getDate() + " - " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    //$scope.$watch('files', function() {
    var _video = null,
            patData = null;

        $scope.patOpts = {x: 0, y: 0, w: 25, h: 25};

        // Setup a channel to receive a video property
        // with a reference to the video element
        // See the HTML binding in main.html
        $scope.channel = {};
        $scope.makeSnapshot = function() {
        if (_video) {
            var patCanvas = document.querySelector('#snapshot');
            if (!patCanvas) return;

            patCanvas.width = _video.width;
            patCanvas.height = _video.height;
            var ctxPat = patCanvas.getContext('2d');

            var idata = getVideoData($scope.patOpts.x, $scope.patOpts.y, $scope.patOpts.w, $scope.patOpts.h);
            ctxPat.putImageData(idata, 0, 0);

            //sendSnapshotToServer(patCanvas.toDataURL());
            patData = idata;

                //$scope.uploadFile = function(){
                /*  var video = document.getElementById('video');
                  var canvas = document.getElementById('canvas');
                  var context = canvas.getContext('2d');
                  context.drawImage(video, 0, 0, 640, 480);
                  var x = canvas.toDataURL('image/png');
                      alert(x);*/
                      if (patData!=''){


                      var x= idata['data'];
                       alert(x);

                         var f = new File([x], $scope.title);

                               if (f &&!f.$error) {
                      f.upload = $upload.upload({
                        url: "https://api.cloudinary.com/v1_1/" + cloudinary.config().cloud_name + "/upload",
                        data: {
                          upload_preset: cloudinary.config().upload_preset,
                          tags: 'myphotoalbum',
                          context: 'photo=' + $scope.title,
                          file: f
                        }
                      }).progress(function (e) {
                        f.progress = Math.round((e.loaded * 100.0) / e.total);
                        f.status = "Uploading... " + f.progress + "%";
                      }).success(function (data, status, headers, config) {
                        $rootScope.photos = $rootScope.photos || [];
                        data.context = {custom: {photo: $scope.title}};
                        f.result = data;
                        $rootScope.photos.push(data);
                      }).error(function (data, status, headers, config) {
                        f.result = data;
                      });
                    };


          //   };
        }
      }
    };



  /*   angular.element(document).ready(function () {
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
  });*/
  }]);
