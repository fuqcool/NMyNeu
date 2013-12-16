angular.module('myneu').factory('Course', ['$resource', function ($resource) {
  var Course = $resource('/udcprod8/bwskfcls.P_GetCrse', {}, {
    query: {
      method: 'post',
      isArray: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: function (data) {
        var data = 'rsts=dummy&crn=dummy&term_in=' + data.term + '&sel_subj=dummy&sel_day=dummy&sel_schd=dummy&sel_insm=dummy&sel_camp=dummy&sel_levl=dummy&sel_sess=dummy&sel_instr=dummy&sel_ptrm=dummy&sel_attr=dummy&sel_subj=' + data.subject + '&sel_crse=&sel_title=&sel_from_cred=&sel_to_cred=&sel_ptrm=%25&begin_hh=0&begin_mi=0&end_hh=0&end_mi=0&begin_ap=x&end_ap=y&path=1&SUB_BTN=Course+Search';

        return data;
      },
      transformResponse: function (data) {
        var $doc = $(data);

        var result = [];

        $doc.find('table.datadisplaytable tr:gt(1)').each(function (i, el) {
          var $course = $(el);

          var code = $course.find('td:eq(0)').text();
          var name = $course.find('td:eq(1)').text();

          result.push({
            id: code,
            name: name,
          });
        });

        return result;
      }
    }
  });

  return Course;
}]);
