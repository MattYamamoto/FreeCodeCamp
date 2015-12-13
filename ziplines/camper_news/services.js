newsApp.service('newsService', ['$resource', function($resource) {
  var camperNewsApi = $resource('//www.freecodecamp.com/news/hot');

  this.getNews = function() {
    return camperNewsApi.query();
  };

}]);
