var presencesController = angular.module('presencesController', []);
presencesController.controller('presencesCtrl', ['$scope','$rootScope', '$http', '$route', '$location','$filter','NgTableParams', function($scope,$rootScope, $http, $route, $location,$filter,NgTableParams,IssueService) {

  if ( $rootScope.groupId == undefined || $rootScope.userId == undefined)
  {

    $location.path("/");
  }
  $scope.goBack=function(){
    window.history.back();
  };
  /*function demoController(NgTableParams, IssueService) {
    this.tableParams = new NgTableParams({}, {
      getData: function(params) {
        return IssueService.query({
          page: params.page(),
          per_page: params.count(),

          state: 'all',
          username: 'esvit',
          repo: 'ng-table'
        }, function(data, headersGetter) {
          var headers = headersGetter(),
            pages = headers['link'].split(', '),
            totalPages = 1;

          // get total pages count
          angular.forEach(pages, function(page) {
            var parts = page.split(' rel=');
            if (parts[1] == '"last"') {
              totalPages = parseInt(parts[0].match(/page=(\d+)/)[1], 10);
            }
            if (totalPages == 1 && parts[1] == '"prev"') { // if last page
              totalPages = parseInt(parts[0].match(/page=(\d+)/)[1], 10) + 1;
            }
          });
          params.total(totalPages * params.count());
          return data;
        }).$promise;
      }
    });
  };

(function() {
  "use strict";

  angular.module("documentsApp").factory("IssueService", ["$resource", function($resource) {
    return $resource("https://api.github.com/repos/:username/:repo/issues", {
      state: "open"
    }, {
      query: {
        method: "GET",
        isArray: true
      }
    });
  }]);
});
}]);*/
//var data = [{name: "Moroni", age: 50} /*,*/];
  var self = this;
    var json = $.param({personId: $rootScope.userId});
  $http({
    method : "POST",
    url : 'http://localhost:80/getPresence.php',
    data: json,
    headers : { 'Content-Type': 'application/x-www-form-urlencoded' }

  }).then(function mySucces(ris) {

    $rootScope.people=ris.data;
  $scope.tableParams = new NgTableParams({page: 1, sorting: {
    Nome: 'asc'
  },
  count: 10

}, {
  //total: $scope.data.length,
  getData: function(params) {

    var data = $rootScope.people;
    data = params.filter() ? $filter('filter')(data, params.filter()) : data;
    data = params.orderBy() ? $filter('orderBy')(data, params.orderBy()) : data;
    params.total(data.length);
    data = data.slice((params.page() - 1) * params.count(), params.page() * params.count());
    return data;
  }

});

  }), function myError(r) {
      alert("Error "+r);
  };


  /*$scope.people =[{
           name: "Moroni",
           age: 44
       }, {
           name: "AAAA",
           age: 23
       }, {
           name: "BBBBB",
           age: 50
       }];*/


  var sort = function(data, sort) {
    var defer = $q.defer();
    if (sort) {

    }
    defer.resolve(data);
    return defer.promise;
  };
          //  self.tableParams = new NgTableParams({}, { data: data});


}]);
