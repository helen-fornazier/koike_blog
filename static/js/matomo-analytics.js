(function () {
  var el = document.currentScript;
  var u = (el && el.getAttribute("data-matomo-base")) || "//stats.igalia.com/";
  if (u.slice(-1) !== "/") {
    u += "/";
  }
  var siteId = (el && el.getAttribute("data-matomo-site")) || "27";
  var _paq = (window._paq = window._paq || []);
  _paq.push(["setDoNotTrack", true]);
  _paq.push(["trackPageView"]);
  _paq.push(["enableLinkTracking"]);
  (function () {
    _paq.push(["setTrackerUrl", u + "matomo.php"]);
    _paq.push(["setSiteId", siteId]);
    var d = document,
      g = d.createElement("script"),
      s = d.getElementsByTagName("script")[0];
    g.async = true;
    g.src = u + "matomo.js";
    s.parentNode.insertBefore(g, s);
  })();
})();
