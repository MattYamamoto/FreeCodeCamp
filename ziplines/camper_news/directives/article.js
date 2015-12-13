newsApp.directive('userArticle', function() {

  return {
    restrict: 'E',
    scope: {
      article: "="
    },
    templateUrl: 'js/directives/article.html',
    replace: true
  };

});
