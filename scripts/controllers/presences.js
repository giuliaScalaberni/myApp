var presencesController = angular.module('presencesController', []);
presencesController.controller('presencesCtrl', ['$scope','$rootScope', '$http', '$route', '$location','NgTableParams', function($scope,$rootScope, $http, $route, $location,NgTableParams,IssueService) {

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


  var data =[{
           name: "Moroni",
           age: 50
       }, {
           name: "Moroni",
           age: 50
       }, {
           name: "Moroni",
           age: 50
       }];
    $scope.tableParams = new NgTableParams({page: 1, count: 10}, {data: data});
          //  self.tableParams = new NgTableParams({}, { data: data});


}]);
