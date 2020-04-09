var gaProperty = 'UA-162970659-1';

var disableStr = 'ga-disable-' + gaProperty;
if (document.cookie.indexOf(disableStr + '=true') > -1) {
  window[disableStr] = true;
}

function displayOptOutMsg() {
    if (document.cookie.indexOf(disableStr + '=true') > -1) {
        var optout = document.getElementById('optout-msg');
        optout.textContent = " Opt-out cookie was set in your browser.";
    }
}

function hideCookieBanner() {
    if (document.cookie.indexOf('allowCookies=true') > -1) {
        var banner = document.getElementById('cookie-banner');
        banner.style = "display: none;"
    }
}

function gaOptout() {
  document.cookie = disableStr + '=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/';
  window[disableStr] = true;
  var optout = document.getElementById('optout-msg');
  optout.textContent = " Opt-out cookie was set in your browser.";
}

function acceptCookies() {
  document.cookie = 'allowCookies=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/';
  var banner = document.getElementById('cookie-banner');
  banner.style = "display: none;"
}
