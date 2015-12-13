newsApp.directive('userArticle', function() {

  return {
    restrict: 'E',
    scope: {
      article: "="
    },
    templateUrl: 'directives/article.html',
    replace: true
  };

});
