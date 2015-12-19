newsApp.controller('mainController',
  ['$scope', 'newsService','imageService', function($scope, newsService,imageService) {

    $scope.hotNews = newsService.getNews();
    
}]);
