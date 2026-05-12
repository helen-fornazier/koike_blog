---
title: "Privacy Policy"
date: 2026-05-12
layout: single
hideReadingTime: true
hideShareButtons: true
disableComments: true
description: "How this site handles analytics (Matomo) and how to opt out."
---

## Analytics

This site uses [Matomo](https://matomo.org/) for visitor analytics, hosted on Igalia's own servers (`stats.igalia.com`). No data is shared with third parties.

To protect your privacy:

- Your IP address is **anonymized** before being stored.
- **No precise location** data is collected.
- Matomo is configured to respect the [Do Not Track](https://www.mozilla.org/en-US/firefox/dnt/) browser setting.

## Opt out

You can opt out of analytics tracking below. Your preference is stored in a cookie in your browser.

<iframe
  id="matomo-optout"
  src="https://stats.igalia.com/index.php?module=CoreAdminHome&action=optOut&language=en"
  style="border: none; width: 100%;"
  title="Matomo opt-out">
</iframe>
<script>
(function () {
  var base = 'https://stats.igalia.com/index.php?module=CoreAdminHome&action=optOut&language=en';
  var darkSrc = base + '&backgroundColor=0f172a&fontColor=e2e8f0';
  var mq = window.matchMedia('(prefers-color-scheme: dark)');
  function update() {
    var el = document.getElementById('matomo-optout');
    if (el) el.src = mq.matches ? darkSrc : base;
  }
  document.addEventListener('DOMContentLoaded', update);
  mq.addEventListener('change', update);
})();
</script>
