var gaProperty = 'UA-162970659-1';
var disableStr = 'ga-disable-' + gaProperty;

if (document.cookie.indexOf(disableStr + '=true') > -1) {
    window[disableStr] = true;
}
if (document.cookie.indexOf('allowCookies=true') > -1) {
    ga('create', 'UA-162970659-1', 'auto');
    ga('set', 'anonymizeIp', true);
    ga('send', 'pageview');
}

window.addEventListener("load", function() {
    if (document.cookie.indexOf(disableStr + '=true') > -1) {
        var banner = document.getElementById('cookie-banner');
        banner.style = "display: none;";

        if (window.location.href == "https://verewygt.github.io/privacy/") {
            var optout = document.getElementById('optout-msg');
            optout.textContent = " Opt-out cookie was set in your browser.";
        }

    } else if (document.cookie.indexOf('allowCookies=true') < 0) {
        var banner = document.getElementById('cookie-banner');
        banner.style = "display: flex;";
    } else if (document.cookie.indexOf('allowCookies=true') > -1) {
        var banner = document.getElementById('cookie-banner');
        banner.style = "display: none;";
    }
});

function gaOptout() {
  document.cookie = disableStr + '=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/;';
  window[disableStr] = true;
  var optout = document.getElementById('optout-msg');
  optout.textContent = " Opt-out cookie was set in your browser.";
}

function acceptCookies() {
  document.cookie = 'allowCookies=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/;';
  var banner = document.getElementById('cookie-banner');
  banner.style = "display: none;";

  ga('create', 'UA-162970659-1', 'auto');
  ga('set', 'anonymizeIp', true);
  ga('send', 'pageview');
}
