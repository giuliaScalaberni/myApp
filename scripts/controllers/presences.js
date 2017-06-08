var presencesController = angular.module('presencesController', []);
presencesController.controller('presencesCtrl', ['$scope','$rootScope', '$http', '$route', '$location','$filter','NgTableParams', function($scope,$rootScope, $http, $route, $location,$filter,NgTableParams,IssueService) {

  if ( $rootScope.groupId == undefined || $rootScope.userId == undefined)
  {

    $location.path("/");
  }
  $scope.goBack=function(){
    window.history.back();
  };
  var self = this;
    var json = $.param({personId: $rootScope.userId});
  $http({
    method : "POST",
    url : 'http://localhost:80/getPresence.php',
    data: json,
    headers : { 'Content-Type': 'application/x-www-form-urlencoded' }

  }).then(function mySucces(ris) {


  $scope.users=ris.data;
  $scope.usersTable = new NgTableParams({

  page: 1,
  count: 5
  }, {
  total: $scope.users.length,
  getData: function ($defer, params) {
  $scope.data = params.sorting() ? $filter('orderBy')($scope.users, params.orderBy()) : $scope.users;
  $scope.data = params.filter() ? $filter('filter')($scope.users, params.filter()) : $scope.users;
  $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
  $defer.resolve($scope.data);
  }
  });
  $scope.params.settings().$scope = $scope;

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
