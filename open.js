(function ($) {
  var url = 'http://myneu.neu.edu/cp/ip/login?sys=sctssb&url=https://wl11gp.neu.edu/udcprod8/twbkwbis.P_GenMenu?name=bmenu.P_RegMnu';
  var $reg = $('#p_chan_text a');

  $reg.click(function (evt) {
    evt.preventDefault();
    window.open(url);
  });

}(jQuery));
