'use strict';

/* Controllers */

var addFaceController = angular.module('addFaceController', ['ngFileUpload']);

addFaceController.controller('addFaceCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'Upload', 'cloudinary',
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
       });
   };

   $scope.onStream = function (stream) {
   };
    $scope.title = "Image_" + d.getDate() + " - " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()+".jpg";
    var _video = null,
    patData = null;

        $scope.patOpts = {x: 0, y: 0, w: 25, h: 25};
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

            patData = idata;
                      if (patData!=''){

                          var f = new Image();
                          f.src = patCanvas.toDataURL();


                        if (f &&!f.$error) {
                         $scope.f=f;
                         $('#modalUpload').modal('show');
                       }

                    }
      }
    };
    $scope.uploadSnapshot=function(path){
         $('#modalUpload').modal('hide');
                            $scope.f.upload = $upload.upload({
                              url: "https://api.cloudinary.com/v1_1/" + cloudinary.config().cloud_name + "/upload",
                              data: {
                                upload_preset: cloudinary.config().upload_preset,
                                tags: 'myphotoalbum',
                                context: 'photo=' + $scope.title,
                                file: $scope.f.src
                              }
                            }).progress(function (e) {
                              $scope.f.progress = Math.round((e.loaded * 100.0) / e.total);
                              $scope.f.status = "Uploading... " + $scope.f.progress + "%";

                            }).success(function (data, status, headers, config) {
                              $rootScope.photos = $rootScope.photos || [];
                              data.context = {custom: {photo: $scope.title}};
                              $scope.f.result = data;
                              //$rootScope.photos.push(data);
                              $rootScope.url=data.url;
                              //photoUrl.set(data);
                               $location.path(path);
                            }).error(function (data, status, headers, config) {
                              $scope.f.result = data;
                              alert($scope.f.result);
                            });


    };

  }]);
