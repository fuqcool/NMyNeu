(function ($) {
  $('body').prop('id', 'myneu');

  var $oldDom = $('body > div');

  $('.pageheaderlinks').prepend('<a href="#" id="goto-new-version" style="color: #990000">NEW VERSION</a>');
  $('#goto-new-version').click(switchToNew);

  function switchToNew() {
    $oldDom.hide();
    $('#myneu-container').show();
  }

  $.get(chrome.extension.getURL('page.html'), function (data) {
    $('body').prepend(data);
    angular.bootstrap(document.getElementById('myneu-container'), ['myneu']);
  });
}(jQuery));
