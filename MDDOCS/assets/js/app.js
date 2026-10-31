/* CITIBIG MDDOCS portal — hash router + markdown renderer */
(function () {
  'use strict';

  var DOCS = [
    { slug: '00-cover', title: 'صفحه اول — کاور و کپی‌رایت', group: 'شروع' },
    { slug: 'citibig-gateway-apisix-docs', title: 'داکیومنت جامع CITIBIG-GATEWAY', group: 'مستندات سرویس‌ها' },
    { slug: 'apiir-apisix-docs', title: 'داکیومنت سرویس api.ir', group: 'مستندات سرویس‌ها' },
    { slug: 'ehraz-apisix-docs', title: 'داکیومنت سرویس Ehraz', group: 'مستندات سرویس‌ها' },
    { slug: 'APISIX_CHEATSHEET', title: 'برگهٔ تقلب APISIX + PostgREST', group: 'راهنمای سریع' }
  ];

  var content = document.getElementById('content');
  var nav = document.getElementById('doc-nav');
  var sidebar = document.getElementById('sidebar');
  var loading = document.getElementById('loading');
  if (loading) { loading.remove(); }

  /* sidebar build */
  var lastGroup = null;
  DOCS.forEach(function (d) {
    if (d.group !== lastGroup) {
      var h = document.createElement('div');
      h.className = 'nav-group';
      h.textContent = d.group;
      nav.appendChild(h);
      lastGroup = d.group;
    }
    var a = document.createElement('a');
    a.href = '#/doc/' + d.slug;
    a.dataset.slug = d.slug;
    a.textContent = d.title;
    nav.appendChild(a);
  });

  function renderMarkdown(md) {
    var html;
    try {
      html = marked.parse(md, { gfm: true, breaks: false });
    } catch (e) {
      html = '<pre>' + md.replace(/</g, '&lt;') + '</pre>';
      return html;
    }
    return html;
  }

  function setActive(slug) {
    var links = nav.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      links[i].classList.toggle('active', links[i].dataset.slug === slug);
    }
  }

  function showError(msg) {
    content.innerHTML =
      '<div class="copyright-box"><strong>خطا در بارگذاری مستند:</strong> ' +
      msg + '</div>';
  }

  function loadDoc(slug) {
    var doc = null;
    for (var i = 0; i < DOCS.length; i++) {
      if (DOCS[i].slug === slug) { doc = DOCS[i]; break; }
    }
    if (!doc) { showError('مستند «' + slug + '» یافت نشد.'); setActive(null); return; }
    setActive(slug);
    document.title = doc.title + ' | CITIBIG Docs';
    content.innerHTML = '<div class="loading">در حال بارگذاری…</div>';
    fetch('docs/' + doc.slug + '.md')
      .then(function (r) {
        if (!r.ok) { throw new Error('HTTP ' + r.status); }
        return r.text();
      })
      .then(function (md) {
        content.innerHTML = renderMarkdown(md);
        content.scrollTop = 0;
        window.scrollTo(0, 0);
      })
      .catch(function (e) {
        showError(e.message);
      });
  }

  function route() {
    var h = location.hash || '#/';
    var m = h.match(/^#\/doc\/(.+)$/);
    if (h === '#/' || h === '#' || h === '') {
      loadDoc('00-cover');
    } else if (m) {
      loadDoc(decodeURIComponent(m[1]));
    } else {
      loadDoc('00-cover');
      showError('مسیر شناخته نشد؛ به صفحه اول بازگشت.');
    }
  }

  window.addEventListener('hashchange', route);
  route();

  /* mobile sidebar toggle */
  var menuBtn = document.getElementById('menu-btn');
  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      sidebar.classList.toggle('open');
    });
  }
})();
