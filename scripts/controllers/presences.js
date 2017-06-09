var presencesController = angular.module('presencesController', []);
presencesController.controller('presencesCtrl', ['$scope','$rootScope', '$http', '$route', '$location','$filter', function($scope,$rootScope, $http, $route, $location,$filter) {

  if ( $rootScope.groupId == undefined || $rootScope.userId == undefined)
  {

    $location.path("/");
  }
  $scope.goBack=function(){
    window.history.back();
  };
  $scope.sortType     = 'data_ora';
  $scope.sortReverse  = false;
  $scope.searchData   = '';
  var self = this;
    var json = $.param({personId: $rootScope.userId});
  $http({
    method : "POST",
    url : 'http://localhost:80/getPresence.php',
    data: json,
    headers : { 'Content-Type': 'application/x-www-form-urlencoded' }

  }).then(function mySucces(ris) {


  $scope.users=ris.data;


  }), function myError(r) {
      alert("Error: "+r);
  };


    /*$scope.tableParams = new NgTableParams({page: 1, sorting: {
      Nome: 'asc'
    },
    count: 10

  }, {
    //total: $scope.data.length,
    getData: function(params) {

    alert($rootScope.people);
      var data = $rootScope.people;
      alert (data);
      data = params.filter() ? $filter('filter')(data, params.filter()) : data;
      data = params.orderBy() ? $filter('orderBy')(data, params.orderBy()) : data;
      params.total(data.length);
      data = data.slice((params.page() - 1) * params.count(), params.page() * params.count());
      return data;
    }

  });

  var sort = function(data, sort) {
    var defer = $q.defer();
    if (sort) {

    }
    defer.resolve(data);
    return defer.promise;
  };*/
          //  self.tableParams = new NgTableParams({}, { data: data});


}]);
