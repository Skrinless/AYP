/* ============================================================
   Aziz Yanuar & Partners — Render engine
   Menghasilkan markup BODY yang identik dengan desain asli
   (kelas CSS & struktur DOM sama persis), hanya isinya yang
   diambil dari content.js. CSS tetap statis di index.html.
   ============================================================ */
(function () {
  "use strict";

  var ICONS = {
    rups: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="14" y="28" width="36" height="22" rx="2"/><path d="M14 28 L32 16 L50 28"/><rect x="26" y="10" width="12" height="16" rx="1" transform="rotate(-10 32 18)"/><line x1="21" y1="38" x2="43" y2="38"/><line x1="21" y1="44" x2="37" y2="44"/></svg>',
    phk: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="10" y="24" width="32" height="22" rx="2"/><path d="M23 24 v-6 a4 4 0 0 1 4-4 h4 a4 4 0 0 1 4 4 v6"/><line x1="10" y1="35" x2="42" y2="35"/><path d="M46 30 h10 M52 25 l5 5 -5 5"/></svg>',
    merek: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M32 9 L51 17 V31 C51 44 43 51 32 55 C21 51 13 44 13 31 V17 Z"/><path d="M23 32 L29 39 L42 24"/></svg>',
    kontrak: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="16" y="8" width="32" height="46" rx="2"/><line x1="23" y1="19" x2="41" y2="19"/><line x1="23" y1="26" x2="41" y2="26"/><line x1="23" y1="33" x2="35" y2="33"/><path d="M20 45 q4 -8 8 0 q4 -8 8 0 q4 -8 8 0"/></svg>',
    "hak-tanggungan": '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 32 L32 14 L52 32"/><path d="M17 29 V52 H47 V29"/><circle cx="37" cy="41" r="4.5"/><line x1="41.5" y1="41" x2="50" y2="41"/><line x1="45" y1="41" x2="45" y2="46"/><line x1="48" y1="41" x2="48" y2="45"/></svg>',
    "saksi-pidana": '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M13 15 h38 a4 4 0 0 1 4 4 v20 a4 4 0 0 1 -4 4 H31 l-11 9 v-9 h-7 a4 4 0 0 1 -4 -4 V19 a4 4 0 0 1 4 -4 Z"/><path d="M24 27 q0 -5 5 -5 v5 q0 4 -3.5 5"/><path d="M35 27 q0 -5 5 -5 v5 q0 4 -3.5 5"/></svg>'
  };

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function rich(s) { return s == null ? "" : String(s); }

  function buildNav(c) {
    var links = (c.nav.links || []).map(function (l) {
      return '<a href="' + esc(l.href) + '">' + esc(l.label) + "</a>";
    }).join("");
    return (
      '<header class="site-nav" id="siteNav">' +
      '<div class="wrap nav-inner">' +
      '<a href="#top" class="brand">' +
      '<img src="' + esc(c.brand.logoImage) + '" alt="Lambang ' + esc(c.brand.name) + '">' +
      '<span class="brand-text"><b>' + esc(c.brand.name) + "</b><span>" + esc(c.brand.tagline) + "</span></span>" +
      "</a>" +
      '<nav class="links" id="navLinks">' + links +
      '<a href="#kontak" class="cta">' + esc(c.nav.cta) + "</a>" +
      "</nav>" +
      '<button class="menu-btn" id="menuBtn" aria-label="Buka menu">&#9776;</button>' +
      "</div></header>"
    );
  }

  function buildHero(c) {
    var h = c.hero;
    var slides = (h.images || []).map(function (src, i) {
      return '<div class="hero-slide s' + (i + 1) + '" style="background-image:url(\'' + esc(src) + "');\"></div>";
    }).join("");
    return (
      '<section class="hero" id="top">' +
      '<div class="hero-media" id="heroMedia">' + slides + "</div>" +
      '<div class="hero-scrim"></div>' +
      '<div class="wrap hero-content">' +
      '<div class="hero-kicker">' + rich(h.kicker) + "</div>" +
      "<h1>" + rich(h.headlineHtml) + "</h1>" +
      '<p class="hero-sub">' + esc(h.sub) + "</p>" +
      '<div class="hero-actions">' +
      '<a href="#kontak" class="btn btn-primary">' + esc(h.ctaPrimary) + "</a>" +
      '<a href="#layanan" class="btn btn-ghost">' + esc(h.ctaSecondary) + "</a>" +
      "</div></div>" +
      '<div class="hero-scroll-cue"><span class="line"></span> Gulir ke bawah</div>' +
      "</section>"
    );
  }

  function buildAbout(c) {
    var a = c.about;
    var paras = (a.paragraphs || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
    return (
      '<section id="tentang"><div class="wrap about-grid">' +
      '<div class="about-copy reveal">' +
      '<span class="section-label"><span class="dash"></span>' + esc(a.tag) + "</span>" +
      '<h2 style="margin-bottom:26px;">' + rich(a.headingHtml) + "</h2>" +
      paras +
      '<p class="lang-en">' + esc(a.enParagraph) + "</p>" +
      '<div class="quote-block"><q>' + esc(a.quote) + "</q><cite>" + esc(a.quoteCite) + "</cite></div>" +
      "</div>" +
      '<div class="about-media reveal">' +
      '<div class="frame"><img src="' + esc(a.image) + '" alt="Patung Dewi Keadilan"></div>' +
      '<div class="stat-card"><span class="num">' + esc(a.statNum) + '</span><span class="cap">' + esc(a.statCap) + "</span></div>" +
      "</div></div></section>"
    );
  }

  function buildServices(c) {
    var s = c.services;
    var pasal = s.pasal || [];
    function pasalRow(p) {
      return (
        '<div class="pasal"><span class="num">' + esc(p.num) + "</span><div><h4>" + esc(p.title) + "</h4><p>" + esc(p.desc) + "</p></div></div>"
      );
    }
    var left = pasal.slice(0, 7);
    var rightTop = pasal.slice(7, 13);
    var bagianDua = pasal.slice(13, 15);

    var leftHtml =
      '<div class="code-part">' +
      '<div class="code-part-title">' + esc(s.bagianSatu.title) + "</div>" +
      '<p class="code-part-desc">' + esc(s.bagianSatu.desc) + "</p>" +
      left.map(pasalRow).join("") +
      "</div>";

    var rightHtml =
      '<div class="code-part" style="margin-top:0;">' +
      '<div class="code-part-title" style="opacity:0; height:0; overflow:hidden;">&nbsp;</div>' +
      '<div class="code-part-desc" style="height:0; overflow:hidden;">&nbsp;</div>' +
      rightTop.map(function (p, i) {
        return i === 0
          ? '<div class="pasal" style="border-top:1px solid var(--line);"><span class="num">' + esc(p.num) + "</span><div><h4>" + esc(p.title) + "</h4><p>" + esc(p.desc) + "</p></div></div>"
          : pasalRow(p);
      }).join("") +
      "</div>" +
      '<div class="code-part" style="margin-top:36px;">' +
      '<div class="code-part-title">' + esc(s.bagianDua.title) + "</div>" +
      '<p class="code-part-desc">' + esc(s.bagianDua.desc) + "</p>" +
      bagianDua.map(pasalRow).join("") +
      "</div>";

    return (
      '<section id="layanan" class="services-section"><div class="wrap">' +
      '<div class="section-head reveal"><div>' +
      '<span class="section-label"><span class="dash"></span>' + esc(s.tag) + "</span>" +
      "<h2>" + rich(s.headingHtml) + "</h2></div>" +
      '<p class="lede">' + esc(s.intro) + "</p></div>" +
      '<div class="code-columns"><div>' + leftHtml + "</div><div>" + rightHtml + "</div></div>" +
      "</div></section>"
    );
  }

  function buildTeam(c) {
    var t = c.team;
    var cards = (t.members || []).map(function (m) {
      return (
        '<div class="team-card"><div class="team-photo"><img src="' + esc(m.image) + '" alt="' + esc(m.name) + '"></div>' +
        '<div class="team-body"><h3>' + esc(m.name) + '</h3><span class="team-role">' + esc(m.role) + "</span>" +
        "<p>" + esc(m.bio) + "</p></div></div>"
      );
    }).join("");
    return (
      '<section id="tim"><div class="wrap"><div class="section-head reveal"><div>' +
      '<span class="section-label"><span class="dash"></span>' + esc(t.tag) + "</span>" +
      "<h2>" + rich(t.headingHtml) + "</h2></div>" +
      '<p class="lede">' + esc(t.intro) + "</p></div></div>" +
      '<div class="team-grid reveal">' + cards + "</div>" +
      "</section>"
    );
  }

  function buildInsight(c) {
    var ins = c.insight;
    var cards = (ins.articles || []).map(function (a) {
      return (
        '<div class="insight-card" data-article="' + esc(a.id) + '" tabindex="0" role="button" aria-haspopup="dialog">' +
        '<div class="insight-thumb"><img src="' + esc(a.image) + '" alt="" loading="lazy"><span class="thumb-badge" data-icon="' + esc(a.id) + '"></span></div>' +
        '<div class="insight-card-body">' +
        '<span class="insight-tag">' + esc(a.tag) + "</span>" +
        "<h3>" + esc(a.title) + "</h3>" +
        "<p>" + esc(a.excerpt) + "</p>" +
        '<div class="insight-meta"><span>' + esc(a.date) + "</span><span>" + esc(a.read) + "</span></div>" +
        '<span class="insight-read">Baca selengkapnya <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg></span>' +
        "</div></div>"
      );
    }).join("");
    return (
      '<section id="insight" class="insight-section"><div class="wrap">' +
      '<div class="section-head reveal"><div>' +
      '<span class="section-label"><span class="dash"></span>' + esc(ins.tag) + "</span>" +
      "<h2>" + rich(ins.headingHtml) + "</h2></div>" +
      '<p class="lede">' + esc(ins.intro) + "</p></div>" +
      '<div class="insight-grid reveal">' + cards + "</div>" +
      '<div class="insight-foot reveal"><p>' + esc(ins.footNote) + "</p>" +
      '<a href="#kontak" class="btn btn-ghost" style="border-color:var(--line); color:var(--ink);">' + esc(ins.footCta) + "</a>" +
      "</div></div></section>"
    );
  }

  function buildKerjasama(c) {
    var k = c.kerjasama;
    var cards = (k.models || []).map(function (m) {
      return (
        '<div class="model-card"><span class="idx">' + esc(m.idx) + "</span><h3>" + esc(m.title) + "</h3>" +
        "<p>" + esc(m.desc) + '</p><span class="fee-tag">' + esc(m.fee) + "</span></div>"
      );
    }).join("");
    return (
      '<section id="kerjasama" style="background:var(--paper-2);"><div class="wrap">' +
      '<div class="section-head reveal"><div>' +
      '<span class="section-label"><span class="dash"></span>' + esc(k.tag) + "</span>" +
      "<h2>" + rich(k.headingHtml) + "</h2></div>" +
      '<p class="lede">' + esc(k.intro) + "</p></div>" +
      '<div class="model-grid reveal">' + cards + "</div>" +
      "</div></section>"
    );
  }

  function buildKlien(c) {
    var k = c.klien;
    var tiers = (k.tiers || []).map(function (t) {
      var names = (t.names || []).map(function (n) { return "<span>" + esc(n) + "</span>"; }).join("");
      return (
        '<div class="client-tier reveal"><span class="tier-label">' + esc(t.label) + "</span>" +
        '<div class="client-list">' + names + "</div></div>"
      );
    }).join("");
    return (
      '<section id="klien" class="clients-section"><div class="wrap">' +
      '<div class="section-head reveal" style="border:none;"><div>' +
      '<span class="section-label"><span class="dash" style="background:var(--red-soft);"></span>' + esc(k.tag) + "</span>" +
      '<h2 style="color:#F7F4EC;">' + rich(k.headingHtml) + "</h2></div>" +
      '<p class="lede muted">' + esc(k.intro) + "</p></div>" +
      tiers +
      "</div></section>"
    );
  }

  function buildKontak(c) {
    var k = c.kontak;
    var options = (k.topics || []).map(function (t) { return "<option>" + esc(t) + "</option>"; }).join("");
    var waHref = "https://wa.me/" + esc(k.phone);
    return (
      '<section id="kontak" class="contact-section"><div class="wrap contact-grid">' +
      '<div class="contact-info reveal">' +
      '<span class="section-label"><span class="dash"></span>' + esc(k.tag) + "</span>" +
      "<h2>" + rich(k.headingHtml) + "</h2>" +
      '<p class="lede">' + esc(k.intro) + "</p>" +
      '<div class="contact-rows">' +
      '<div class="contact-row"><span class="k">Telepon / WhatsApp</span><span class="v"><a href="' + waHref + '">' + esc(k.phoneDisplay) + "</a></span></div>" +
      '<div class="contact-row"><span class="k">Surel</span><span class="v"><a href="mailto:' + esc(k.email) + '">' + esc(k.email) + "</a></span></div>" +
      '<div class="contact-row"><span class="k">Alamat</span><span class="v">' + esc(k.address) + "</span></div>" +
      '<div class="contact-row"><span class="k">Jam Kerja</span><span class="v">' + esc(k.hours) + "</span></div>" +
      "</div></div>" +
      '<div class="contact-card reveal">' +
      '<img src="' + esc(k.cardImage) + '" alt="" class="mark">' +
      "<h3>" + esc(k.cardTitle) + "</h3>" +
      "<p>" + esc(k.cardDesc) + "</p>" +
      '<form id="contactForm" class="contact-form">' +
      '<input type="text" name="name" placeholder="Nama lengkap" required>' +
      '<input type="email" name="email" placeholder="Alamat email" required>' +
      '<input type="tel" name="phone" placeholder="Nomor WhatsApp">' +
      '<select name="topic"><option value="">Kebutuhan hukum (opsional)</option>' + options + "</select>" +
      '<textarea name="message" placeholder="Ceritakan kebutuhan hukum Anda" rows="4" required></textarea>' +
      '<input type="text" name="_honey" class="hp-field" tabindex="-1" autocomplete="off" aria-hidden="true">' +
      '<input type="hidden" name="_subject" value="Pesan baru dari website ' + esc(c.brand.name) + '">' +
      '<input type="hidden" name="_template" value="table">' +
      '<input type="hidden" name="_captcha" value="false">' +
      '<button type="submit" class="btn btn-primary" id="formSubmitBtn" style="width:100%; justify-content:center;">Kirim Pesan</button>' +
      '<p class="form-status" id="formStatus" role="status" aria-live="polite"></p>' +
      "</form>" +
      '<a href="' + waHref + '" class="btn btn-ghost" style="width:100%; justify-content:center; margin-top:14px; border-color:var(--line-on-dark); color:var(--paper);">' + esc(k.whatsappCta) + "</a>" +
      "</div></div></section>"
    );
  }

  function buildFooter(c) {
    var f = c.footer;
    return (
      "<footer><div class=\"wrap footer-inner\">" +
      '<span>&copy; <span id="year"></span> ' + esc(f.copyrightName) + "</span>" +
      "<span>" + esc(f.address) + "</span>" +
      "</div></footer>"
    );
  }

  function buildArticleModal(c) {
    return (
      '<div class="article-modal" id="articleModal" aria-hidden="true">' +
      '<div class="article-modal-backdrop" id="articleBackdrop"></div>' +
      '<div class="article-modal-inner" role="dialog" aria-modal="true" aria-labelledby="articleModalTitle">' +
      '<div class="article-modal-head">' +
      '<span class="brand-mini"><img src="' + esc(c.brand.logoImage) + '" alt="">Insight — ' + esc(c.brand.name) + "</span>" +
      '<button class="article-close" id="articleClose" aria-label="Tutup artikel">&times;</button>' +
      "</div>" +
      '<div class="article-modal-body" id="articleModalBody"></div>' +
      "</div></div>"
    );
  }

  function renderSite(content, root) {
    var c = content;
    root.__content = c;
    root.innerHTML =
      buildNav(c) +
      buildHero(c) +
      buildAbout(c) +
      buildServices(c) +
      buildTeam(c) +
      buildInsight(c) +
      buildKerjasama(c) +
      buildKlien(c) +
      buildKontak(c) +
      buildFooter(c) +
      buildArticleModal(c);
    wireInteractions(root, c);
  }

  function wireInteractions(root, c) {
    var doc = root.ownerDocument;
    var win = doc.defaultView;

    // Build ARTICLES lookup from content for the modal
    var ARTICLES = {};
    (c.insight.articles || []).forEach(function (a) {
      ARTICLES[a.id] = {
        tag: a.tag, title: a.title, date: a.dateFull || a.date, read: a.read,
        body: a.bodyHtml, image: a.image
      };
    });

    doc.querySelectorAll(".thumb-badge").forEach(function (el) {
      var icon = ICONS[el.dataset.icon];
      if (icon) el.innerHTML = icon;
    });

    var modal = doc.getElementById("articleModal");
    var modalBody = doc.getElementById("articleModalBody");
    var backdrop = doc.getElementById("articleBackdrop");
    var closeBtn = doc.getElementById("articleClose");
    var lastFocused = null;

    function openArticle(id) {
      var a = ARTICLES[id];
      if (!a) return;
      modalBody.innerHTML =
        '<div class="a-banner"><img src="' + (a.image || "") + '" alt=""><span class="thumb-badge">' + (ICONS[id] || "") + "</span></div>" +
        '<div class="a-content"><span class="a-tag">' + a.tag + "</span>" +
        '<h1 id="articleModalTitle">' + a.title + "</h1>" +
        '<div class="a-meta">' + a.date + " &middot; " + a.read + "</div>" +
        a.body +
        '<div class="a-cta"><a href="#kontak" class="btn btn-primary" id="articleCtaClose">Konsultasikan Kasus Anda</a></div>' +
        "</div>";
      var ctaClose = doc.getElementById("articleCtaClose");
      if (ctaClose) ctaClose.addEventListener("click", closeArticle);
      lastFocused = doc.activeElement;
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      doc.body.style.overflow = "hidden";
      modalBody.scrollTop = 0;
      closeBtn.focus();
    }
    function closeArticle() {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
      doc.body.style.overflow = "";
      if (lastFocused) lastFocused.focus();
    }
    doc.querySelectorAll(".insight-card").forEach(function (card) {
      card.addEventListener("click", function () { openArticle(card.dataset.article); });
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openArticle(card.dataset.article); }
      });
    });
    closeBtn.addEventListener("click", closeArticle);
    backdrop.addEventListener("click", closeArticle);
    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("open")) closeArticle();
    });

    // Nav scroll state
    var nav = doc.getElementById("siteNav");
    function onScroll() {
      if (win.scrollY > 40) nav.classList.add("scrolled"); else nav.classList.remove("scrolled");
    }
    doc.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Mobile menu
    var menuBtn = doc.getElementById("menuBtn");
    var navLinks = doc.getElementById("navLinks");
    menuBtn.addEventListener("click", function () { navLinks.classList.toggle("open"); });
    navLinks.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { navLinks.classList.remove("open"); });
    });

    // Parallax on hero media
    var reduceMotion = win.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var heroMedia = doc.getElementById("heroMedia");
    if (!reduceMotion) {
      doc.addEventListener("scroll", function () {
        var y = win.scrollY;
        if (y < win.innerHeight * 1.1) heroMedia.style.transform = "translateY(" + (y * 0.28) + "px)";
      }, { passive: true });
    }

    // Scroll reveal
    var revealEls = doc.querySelectorAll(".reveal");
    if ("IntersectionObserver" in win && !reduceMotion) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
        });
      }, { threshold: 0.12 });
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add("in"); });
    }

    doc.getElementById("year").textContent = new Date().getFullYear();

    // Contact form submission
    var contactForm = doc.getElementById("contactForm");
    var formStatus = doc.getElementById("formStatus");
    var submitBtn = doc.getElementById("formSubmitBtn");
    var FORM_ENDPOINT = c.kontak.formEndpoint;
    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        if (contactForm._honey.value) {
          formStatus.textContent = "Pesan terkirim. Terima kasih.";
          formStatus.className = "form-status ok";
          contactForm.reset();
          return;
        }
        submitBtn.disabled = true;
        submitBtn.textContent = "Mengirim...";
        formStatus.textContent = "";
        formStatus.className = "form-status";
        fetch(FORM_ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(contactForm) })
          .then(function (res) {
            if (res.ok) {
              formStatus.textContent = "Terima kasih — pesan Anda telah terkirim. Kami akan segera menghubungi Anda.";
              formStatus.className = "form-status ok";
              contactForm.reset();
            } else { throw new Error("Request failed"); }
          })
          .catch(function () {
            formStatus.textContent = "Maaf, pesan gagal terkirim. Silakan hubungi kami langsung via WhatsApp di bawah ini.";
            formStatus.className = "form-status err";
          })
          .finally(function () {
            submitBtn.disabled = false;
            submitBtn.textContent = "Kirim Pesan";
          });
      });
    }
  }

  function loadContent() {
    var base = window.DEFAULT_CONTENT || {};
    try {
      var raw = window.localStorage.getItem("ayp_content");
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return base;
  }

  window.AYPRender = { renderSite: renderSite, loadContent: loadContent, esc: esc };
})();
