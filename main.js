(function ($) {
  var models = window.myneu.models;
  var html = window.myneu.html;

  $('body').empty().html(html);
  var $doc = $('body');

  // dom objects
  var $terms = $doc.find('#terms');
  var $subjects = $doc.find('#subjects');
  var $search = $doc.find('#search');
  var $courses = $doc.find('#courses');

  $terms.empty();
  models.semisters(function (terms) {
    $.each(terms, function (i, term) {
      $terms.append('<option value="' + term.code + '">' + term.name + '</option>');
    });
  });

  $terms.change(function () {
    var code = $terms.val();

    $subjects.empty();
    models.subjects(code, function (subjects) {
      $.each(subjects, function (i, subject) {
        $subjects.append('<option value="' + subject.code + '">' + subject.name + '</option>');
      });
    });
  });

  function getTerm() {
    return $terms.val();
  }

  function getSubject() {
    return $subjects.val();
  }

  $search.click(function () {
    var term = $terms.val();
    var subject = $subjects.val();

    models.courses({
      term: getTerm(),
      subject: getSubject()
    }, function (courses) {
      $courses.empty();
      var html = '';
      $.each(courses, function (i, course) {
        html += '<a href="#" class="course list-group-item" course="' + course.code + '">' + course.name + '</a>';
      });

      $courses.html(html);
    });
  });

  $doc.on('click', 'a.course', function (evt) {
    var $el = $(this);

    models.sections({
      term: getTerm(),
      subject: getSubject(),
      course: $el.attr('course')
    });
  });

}(jQuery));

/*
  course info

  term_in:201430
  sel_subj:dummy
  sel_subj:CS
  SEL_CRSE:1100
  SEL_TITLE:
  BEGIN_HH:0
  BEGIN_MI:0
  BEGIN_AP:a
  SEL_DAY:dummy
  SEL_PTRM:dummy
  END_HH:0
  END_MI:0
  END_AP:a
  SEL_CAMP:neumpind
  SEL_SCHD:dummy
  SEL_SESS:dummy
  SEL_INSTR:dummy
  SEL_INSTR:%
  SEL_ATTR:dummy
  SEL_ATTR:%
  SEL_LEVL:dummy
  SEL_LEVL:%
  SEL_INSM:dummy
  sel_dunt_code:
  sel_dunt_unit:
  call_value_in:
  rsts:dummy
  crn:dummy
  path:1
  SUB_BTN:View Sections


  section info
  https://wl11gp.neu.edu/udcprod8/bwckschd.p_disp_listcrse?term_in=201430&subj_in=CS&crse_in=1100&crn_in=32035*/
