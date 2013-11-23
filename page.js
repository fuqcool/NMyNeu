(function () {
  var html = '' +
    '<div class="container">' +
    '  <div class="row">' +
    '    <div class="col-md-4">' +
    '    <label>Term</label>' +
    '    <select class="form-control" id="terms"></select>' +
    '    </div>' +
    '    <div class="col-md-4">' +
    '    <label>Subject</label>' +
    '    <select class="form-control" id="subjects"></select>' +
    '    </div>' +
    '    <div class="col-md-2">' +
    '    <button id="search" class="btn" style="margin-top: 25px;">Search</button>' +
    '    </div>' +
    '  </div>' +
    '  <div class="row" style="margin-top: 20px;">' +
    '    <div class="col-md-3">' +
    '      <label>Course</label>' +
    '      <div class="list-group" id="courses" style="height: 500px; overflow-y: auto;">' +
    '      </div>' +
    '    </div>' +
    '  </div>' +
    '<div>';

  window.myneu = window.myneu || {};
  window.myneu.html = html;
}());