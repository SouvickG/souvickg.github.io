/* =====================================================================
   labs.js — shared behavior for the lab pages.
   1. Footer year.
   2. Mobile lab switcher on labs.html (tabs on small screens, both
      columns side by side on desktop). Progressive: with JS disabled
      the switcher never appears and both labs render stacked in full.
   ===================================================================== */

(function () {
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

(function () {
  var tabbar = document.getElementById('tabbar');
  if (!tabbar) return;

  var tabs = Array.prototype.slice.call(tabbar.querySelectorAll('[role="tab"]'));
  var panels = tabs.map(function (t) { return document.getElementById(t.getAttribute('aria-controls')); });
  if (!tabs.length || panels.indexOf(null) > -1) return;

  var mq = window.matchMedia('(max-width: 1023px)');
  var current = 0;

  tabbar.hidden = false;

  function tabMode() {
    tabs.forEach(function (t, i) {
      t.setAttribute('aria-selected', i === current ? 'true' : 'false');
      t.tabIndex = i === current ? 0 : -1;
      panels[i].setAttribute('role', 'tabpanel');
      panels[i].setAttribute('aria-labelledby', t.id);
      panels[i].tabIndex = 0;
      panels[i].hidden = i !== current;
    });
  }

  function splitMode() {
    panels.forEach(function (p) {
      p.removeAttribute('role');
      p.setAttribute('aria-labelledby', p.id + '-h');
      p.removeAttribute('tabindex');
      p.hidden = false;
    });
  }

  function sync() { if (mq.matches) { tabMode(); } else { splitMode(); } }

  function select(i, moveFocus) {
    current = i;
    if (!mq.matches) return;
    tabMode();
    if (moveFocus !== false) tabs[i].focus();
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { select(i); });
    tab.addEventListener('keydown', function (e) {
      var next = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % tabs.length;
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = tabs.length - 1;
      if (next !== null) { e.preventDefault(); select(next); }
    });
  });

  // In tab mode, an in-page link pointing at a hidden lab reveals it first.
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (!a || !mq.matches) return;
    var id = a.getAttribute('href').slice(1);
    for (var i = 0; i < panels.length; i++) {
      if (panels[i].id === id) { select(i, false); return; }
    }
  });

  if (mq.addEventListener) { mq.addEventListener('change', sync); } else { mq.addListener(sync); }
  sync();
})();
