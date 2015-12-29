newsApp.directive('userArticle', ['imageService', function(imageService) {

  return {
    restrict: 'E',
    scope: {
      article: "="
    },
    templateUrl: 'js/directives/article.html',
    replace: true,
    controller: function($scope) {
      $scope.src = "";
      getSrc($scope.article);

      function getSrc(article) {
        var src = article.image;

        if (src === '') {
          imageService.getImage($scope.article.link)
          .then(function(data) {
            $scope.src = data;
          });
        } else {
          $scope.src = src;
        }
      }
    }
  };
}]);
