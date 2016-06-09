var handlebars = require('handlebars');
var _ = require('underscore');
var $ = require('jquery');

var url = 'https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=flasks&includes=Images,Shop&sort_on=score';


fetchJSONP(url, function(data) {
  var productList = data.results;

  var source = $('#items-images').html();
  var template = handlebars.compile(source);

  productList.forEach(function(product){
    console.log(product);
    var renderTemplate = template(product);
    $('.products-container').append(renderTemplate);
  });


});


















      /*
        (url: String, callback: Function) -> undefined

        Execute a callback function with the JSON results from the url specified.

        Examples
            var url = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=tacos&includes=Images,Shop";

            fetchJSONP(url, function(data) {
              // do something with data
            });

            // OR

            function logData(data) {
              console.log(data);
            }

            fetchJSONP(url, logData);
      */
      function fetchJSONP(url, callback) {
          var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
          var script = document.createElement('script');

          window[callbackName] = function(data) {
              delete window[callbackName];
              document.body.removeChild(script);
              callback(data);
          };

          script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
          document.body.appendChild(script);
      }
