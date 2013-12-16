angular.module('myneu').factory('Term', ['$resource', function ($resource) {
  var Term = $resource('/udcprod8/bwskfcls.p_sel_crse_search', {}, {
    query: {
      method: 'post',
      isArray: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: function (data) {
        return '';
      },
      transformResponse: function (data) {
        var $doc = $(data);
        var result = [];

        $doc.find('#term_input_id option').each(function (i, el) {
          var $el = $(el);

          if ($el.val()) {
            result.push({
              id: $el.val(),
              name: $el.text()
            });
          }
        });

        return result;
      }
    }
  });

  return Term;
}]);
