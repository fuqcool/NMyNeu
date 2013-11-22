(function ($) {

  function semisters(cb) {
    $.ajax({
      url: '/udcprod8/bwskfcls.p_sel_crse_search',
      type: 'post',
      contentType: 'application/x-www-form-urlencoded',
      dataType: 'html',
      success: function (data) {
        var $doc = $(data);
        var result = [];

        $doc.find('#term_input_id option').each(function (i, el) {
          result.push({
            name: $(el).text(),
            code: $(el).val()
          });
        });

        cb(result);
      }
    });
  }

  function majors(semi, cb) {
    $.ajax({
      url: '/udcprod8/bwckgens.p_proc_term_date',
      type: 'post',
      contentType: 'application/x-www-form-urlencoded',
      dataType: 'html',
      data: {
        p_calling_proc: 'P_CrseSearch',
        p_term: semi
      },
      success: function (data) {
        var result = [];
        var $doc = $(data);

        $doc.find('select[name="sel_subj"] option').each(function (i, el) {
          result.push({
            name: $(el).text(),
            code: $(el).val()
          });
        });

        cb(result);
      }
    });
  }

  function courses(data, cb) {
    var formbody = 'rsts=dummy&crn=dummy&term_in=' + data.term + '&sel_subj=dummy&sel_day=dummy&sel_schd=dummy&sel_insm=dummy&sel_camp=dummy&sel_levl=dummy&sel_sess=dummy&sel_instr=dummy&sel_ptrm=dummy&sel_attr=dummy&sel_subj=' + data.subject + '&sel_crse=&sel_title=&sel_from_cred=&sel_to_cred=&sel_ptrm=%25&begin_hh=0&begin_mi=0&end_hh=0&end_mi=0&begin_ap=x&end_ap=y&path=1&SUB_BTN=Course+Search';

    $.ajax({
      url: '/udcprod8/bwskfcls.P_GetCrse',
      type: 'post',
      contentType: 'application/x-www-form-urlencoded',
      dataType: 'html',
      beforeSend: function (xhr, options) {
        options.data = formbody;
      },
      success: function (html) {
        var $doc = $(html);

        var courses = [];

        $doc.find('table.datadisplaytable tr:gt(1)').each(function (i, el) {
          var $course = $(el);

          var code = $course.find('td:eq(0)').text();
          var name = $course.find('td:eq(1)').text();

          var options = [];
          $course.find('form input').each(function (i, el) {
            var $el = $(el);
            options.push({
              key: $el.attr('name'),
              value: $el.val()
            });
          });

          courses.push({
            name: name,
            code: code,
            options: options
          });
        });

        cb(courses);
      }
    });
  }

  window.myneu = window.myneu || {};

  window.myneu.models = {
    semisters: semisters,
    subjects: majors,
    courses: courses
  };
}(jQuery));