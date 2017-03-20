'use strict';

/**
 * @ngdoc function
 * @name documentsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the documentsApp
 */
angular.module('documentsApp')
  .controller('MainCtrl', function () {



       // Application Constructor


       // deviceready Event Handler
       //
       // Bind any cordova events here. Common events are:
       // 'pause', 'resume', etc.
       angular.element(document).ready(function () {

     //Grab elements, create settings, etc.
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

   document.getElementById("snap").addEventListener("click", function() {

   	context.drawImage(video, 0, 0, 640, 480);
     canvas.toBlob(function(blob) {
       var x=saveAs(blob, "image.jpg");


       var data = canvas.toDataURL("image/octet-stream");


       //var mybinarydata = binEncode(data);
       alert(data);
       window.location.href = data;


     });
     //window.open(canvas.toDataURL("image/jpg"));
   });

 }); });
