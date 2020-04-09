var gaProperty = 'UA-162970659-1';

var disableStr = 'ga-disable-' + gaProperty;
if (document.cookie.indexOf(disableStr + '=true') > -1) {
  window[disableStr] = true;
  if (window.location.href == "https://verewygt.github.io/privacy/") {
      var optout = document.getElementById('optout-msg');
      optout.textContent = " Opt-out cookie was set in your browser.";
  }

}

function gaOptout() {
  document.cookie = disableStr + '=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/';
  window[disableStr] = true;
  var optout = document.getElementById('optout-msg');
  optout.textContent = " Opt-out cookie was set in your browser.";
}
