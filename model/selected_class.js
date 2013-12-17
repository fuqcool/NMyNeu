angular.module('myneu').factory('SelectedClass', ['$resource', function ($resource) {
  var SelectedClass = $resource('/udcprod8/bwskfreg.P_AltPin', {}, {
    query: {
      method: 'post',
      isArray: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: function (data) {
        return 'term_in=' + data.term;
      },
      transformResponse: function (data) {
        var $doc = $(data);
        var result = [];

        $doc.find('table.datadisplaytable tr:gt(0)').each(function (i, el) {
          var $el = $(el);

          if ($el.find('td:eq(2)').text().trim()) {
            result.push({
              id: $el.find('td:eq(2)').text(),
              course: $el.find('td:eq(4)').text(),
              section: $el.find('td:eq(5)').text(),
              name: $el.find('td:eq(11)').text(),
              credit: parseFloat($el.find('td:eq(7)').text())
            });
          }
        });

        return result;
      }
    }
  });

  return SelectedClass;
}]);
