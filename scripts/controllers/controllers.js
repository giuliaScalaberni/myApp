'use strict';

/* Controllers */

var photoAlbumControllers = angular.module('photoAlbumControllers', ['ngFileUpload']);

photoAlbumControllers.controller('photoUploadCtrl', ['$scope', '$rootScope', '$routeParams', '$location', '$http','Upload', 'cloudinary',
 /* Uploading with Angular File Upload */
  function($scope, $rootScope, $routeParams, $location,$http, $upload, cloudinary) {
    if ($rootScope.email==undefined){
      $location.path('/login');
    }
    var email = $.param({email: $rootScope.email});
    $http({
      method : "POST",
      url : 'http://localhost:80/getUserInfo.php',
      data: email,
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }

    }).then(function mySucces(ris) {
      $scope.ris=ris.data[0];
      $rootScope.userId=$scope.ris.persistedId;
      $rootScope.groupId=$scope.ris.groupId;
    });
    $scope.goBack=function(){
      window.history.back();
    };
    $scope.action="In";
    $scope.warningAlert=0;
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

          }}};
          $scope.uploadSnapshot=function(path){
            uploadSnap.upload(path);
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
                              $scope.f.progress = 0;
                              $rootScope.url=data.url;
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
                                if (response.data.length==0) {
                                  $scope.myWelcome = "Unsuccessfully operation, please verify again! Make sure your snapshot is ok";
                                  $scope.warningAlert=1;
                                  $scope.f.status = "";
                                  $scope.f.progress = 0;
                                }
                                else{
                                alert("Good snap!");
                                var id=response.data[0].faceId;

                                var obj = '{ "faceId": "'+id+'","personId": "'+$rootScope.userId+'","personGroupId": "'+$rootScope.groupId+'"}';

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
                                      $rootScope.action=$scope.action;
                                      var json = $.param({pId: $rootScope.userId, action: $rootScope.action});

                                      $http({
                                        method : "POST",
                                        url : 'http://localhost:80/putPresent.php',
                                        data: json,
                                        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
                                      }).then(function mySucces(response) {
                                      //  alert(response);
                                        $location.path('/welcome');
                                        })
                                  }
                                    else {
                                      $scope.myWelcome="User not identical. Please try again";
                                      $scope.warningAlert=1;
                                      $scope.f.status = "";
                                      $scope.f.progress = 0;
                                    }
                                    //alert($scope.myWelcome = result.data["isIdentical"]);


                                  }, function myError(result) {
                                    $scope.myWelcome = result.data.error.code+": "+result.data.error.message;
                                      $scope.warningAlert=1;
                                      $scope.f.status = "";
                                      $scope.f.progress = 0;
                                  });


                                }}, function myError(response) {
                                  $scope.myWelcome = response.statusText;
                                  $scope.warningAlert=1;
                                  $scope.f.status = "";
                                  $scope.f.progress = 0;

                                });




                               //$location.path(path);
                            }).error(function (data, status, headers, config) {
                              //$scope.f.result = data;
                              $scope.myWelcome = $scope.f.result;
                              $scope.warningAlert=1;

                              $scope.f.progress = 0;

                            });


    };

  }]);
