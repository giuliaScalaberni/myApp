documentsApp.factory("uploadSnap", function uploadSnap(path) {
  
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

        $scope.f.progress = 0;
        $scope.f.status = "";
     $location.path(path);
  }).error(function (data, status, headers, config) {

    $scope.f.progress = 0;
    $scope.f.status = "";
    $scope.f.result = data;
    alert($scope.f.result);
  });
});
