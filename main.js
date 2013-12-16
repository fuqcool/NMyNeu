(function ($) {
  $('body').prop('id', 'myneu');

  var $oldDom = $($('body > div').slice(1));
  var $newDom = $('#myneu-container');

  $('.pageheaderlinks').prepend('<a href="#" id="goto-new-version" style="color: #990000">NEW VERSION</a>');
  $('#goto-new-version').click(switchToNew);
  $('#goto-old-version').click(switchToOld);

  function switchToNew() {
    $oldDom.hide();
    $newDom.show();
  }

  function switchToOld() {
    $newDom.hide();
    $oldDom.show();
  }
}(jQuery));
