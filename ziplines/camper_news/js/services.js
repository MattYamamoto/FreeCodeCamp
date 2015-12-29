newsApp.service('newsService', ['$resource', function($resource) {
  var camperNewsApi = $resource('//www.freecodecamp.com/news/hot');

  this.getNews = function() {
    return camperNewsApi.query();
  };

}]);



newsApp.service('imageService', ['$q', '$http', function($q, $http) {
  var imageService = this,
      defaultImage = 'https://placeholdit.imgix.net/~text?txt=&w=280&h=280',
      imageRange = 3,
      tolerance = 150;  // min size of a dimension that is acceptible to use

  // main service function
  // Given a url, try really hard to get an image representing the page by
  // getting the first 'imageRange' number of images from the page and return
  // the src for the largest one.
  imageService.getImage = function(url) {
    var deferred = $q.defer();

    getHtml(url)
    .then(function(htmlData) {
      return getImages(htmlData, url);
    })
    .then(function(result) {
      deferred.resolve(largestImageSrc(result));
    });

    return deferred.promise;
  };

  // Get HTML as a string from the give url
  function getHtml(url) {
    var deferred = $q.defer();

    $http.get('https://crossorigin.me/' + url)
      .then(function(data) {
        deferred.resolve(data);
      });

    return deferred.promise;
  }

  // return the hostname for a given url
  function getHostName(url) {
    // get the hostname for the page.
    return $('<a>').prop('href', url).prop('hostname');
  }

  // ensure that absolute link is used.  Check 'src' url and format
  // as necessary.
  function formatAbsoluteLink(hostname, src) {
    console.log(hostname, src,/http/.test(src) );
    if (!/http/.test(src)) { //test if relative link, if so make absolute
      if (/^\//.test(src)) {
        src = 'http://' + hostname + src;
      } else if (/^\.\.\//.test(src)) {
        parentDir = url.substring(0, url.lastIndexOf("/", url.lastIndexOf("/") - 1) + 1);
        src = parentDir + src.substring(3, src.length);
      } else {
        src = 'http://' + hostname + '/' + src;
      }
    }

    return src;
  }

  // Given an HTML Str, extract the body and strip out, if present,
  // the header, any script tags, and any aside tags.  Also, change
  // the img tags to img-tag to prevent them from trying to render.
  function formatHtmlString(htmlStr) {
    htmlStr = /<body.*?>([\s\S]*)<\/body>/.exec(htmlStr)[1];
    htmlStr = htmlStr.replace(/<header.*?>[\s\S]*?<\/header>/i, "");
    htmlStr = htmlStr.replace(/<script.*?>[\s\S]*?<\/script>/i, "");
    htmlStr = htmlStr.replace(/<aside.*?>[\s\S]*?<\/aside>/i, "");
    htmlStr = htmlStr.replace(/<video.*?>[\s\S]*?<\/video>/i, "");
    htmlStr = htmlStr.replace(/<audio.*?>[\s\S]*?<\/audio>/i, "");
    htmlStr = htmlStr.replace(/<img/g, "<img-tag");

    return htmlStr;
  }

  // For a given image's url, return an array containing the
  // original url, and its width and height
  function getImageDimensions(url) {
    var deferred = $q.defer(),
        img = new Image();

    img.src = url;

    img.onload = function() {
    deferred.resolve([url, this.width, this.height]);
    };

    return deferred.promise;
  }

  // take an array containing sub-arrays formatted as
  // [url, imageWidth, imageHeight] and return the url for the
  // largest image.
  function largestImageSrc(imageArr) {
    if (imageArr.length > 1) {  // there are images, so sort and get largest
        // sort images in imageArr by size (largest to smallest)
        imageArr.sort(function(a, b) {
          return b[0] - a[0];
        });

        imageSrc = imageArr[0][0];
        imageWidth = imageArr[0][1];
        imageHeight = imageArr[0][2];

        // if the largest image height or width is smaller than the tolerance,
        // use default image
        if (imageHeight < tolerance || imageWidth < tolerance) {
          imageSrc = defaultImage;
        }
      } else {  // there are no images, go default
        imageSrc = defaultImage;
      }

      return imageSrc;
  }

  function getImages(dataObj, url) {
    var imagesAll,
        image,
        src,
        hostname,
        htmlSnippet,
        promises = [];

    // parse the data as html, but change image tags so that they don't send requests
    htmlSnippet = formatHtmlString(dataObj.data);

    // Strip out the head and header since we don't care about images there.
    // Then get all the image tags in the parsed data.
    imagesAll = $(htmlSnippet).find('img-tag');
    hostname = getHostName(url);

    // Loop through the images up to the imageRange limit
    for (var i = 0; i <= imageRange; i++) {
      image = imagesAll[i];

      if (image !== undefined) { // if there is an image
        src = formatAbsoluteLink(hostname, $(image).attr('src'));
        promises.push(getImageDimensions(src));
      }

    }

    // return all the promises from the getImageDimensions calls
    return $q.all(promises);
  }

}]);
