newsApp.controller('mainController',
  ['$scope', 'newsService', function($scope, newsService) {

  $scope.hotNews = newsService.getNews();

}]);
