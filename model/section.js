angular.module('myneu').factory('Section', ['$resource', function ($resource) {
  var Section = $resource('/udcprod8/bwskfcls.P_GetCrse', {}, {
    query: {
      method: 'post',
      isArray: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: function (data) {
        var data = 'term_in=' + data.term + '&sel_subj=dummy&sel_subj=' + data.subject + '&SEL_CRSE=' + data.course + '&SEL_TITLE=&BEGIN_HH=0&BEGIN_MI=0&BEGIN_AP=a&SEL_DAY=dummy&SEL_PTRM=dummy&END_HH=0&END_MI=0&END_AP=a&SEL_CAMP=neumpind&SEL_SCHD=dummy&SEL_SESS=dummy&SEL_INSTR=dummy&SEL_INSTR=%25&SEL_ATTR=dummy&SEL_ATTR=%25&SEL_LEVL=dummy&SEL_LEVL=%25&SEL_INSM=dummy&sel_dunt_code=&sel_dunt_unit=&call_value_in=&rsts=dummy&crn=dummy&path=1&SUB_BTN=View+Sections';

        return data;
      },
      transformResponse: function (data) {
        var $doc = $(data);
        var result = [];

        $doc.find('table.datadisplaytable tr:gt(1)').each(function (i, el) {
          var $el = $(el);

          if (!isNaN(parseFloat($el.find('td:eq(6)').text()))) {
            result.push({
              available: $el.find('td:eq(0) abbr').text() !== 'C',
              id: $el.find('td:eq(1) a').text(),
              sectNum: $el.find('td:eq(4)').text(),
              campus: $el.find('td:eq(5)').text(),
              credit: parseFloat($el.find('td:eq(6)').text()),
              name: $el.find('td:eq(7)').text(),
              days: $el.find('td:eq(8)').text(),
              time: $el.find('td:eq(9)').text(),
              capacity: parseInt($el.find('td:eq(10)').text()),
              active: parseInt($el.find('td:eq(11)').text()),
              wlcapacity: parseInt($el.find('td:eq(13)').text()),
              wlactive: parseInt($el.find('td:eq(14)').text()),
              instructor: $el.find('td:eq(16)').text(),
              location: $el.find('td:eq(18)').text()
            });
          }
        });

        return result;
      }
    }
  });

  return Section;
}]);
