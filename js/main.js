(function () {
  var head = document.querySelector(".site-head");
  var first = document.querySelector("main > section, main > .hero-photo");
  if (head && first && (first.classList.contains("hero-photo") || first.classList.contains("page-hero"))) {
    document.body.classList.add("has-hero");
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function paintHead() {
      head.classList.toggle("is-solid", window.scrollY > 24);
    }
    paintHead();
    window.addEventListener("scroll", paintHead, { passive: true });
    if (reduce) head.classList.add("is-solid");
  }

  var revealReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!revealReduce && "IntersectionObserver" in window) {
    var revealNodes = document.querySelectorAll("main .band, main .photo-band, main .strip-band");
    revealNodes.forEach(function (node, index) {
      if (index === 0) return;
      node.classList.add("reveal");
    });
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(function (node) { revealObserver.observe(node); });
  }

  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");

  function closeNav() {
    if (!nav || !toggle) return;
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeNav);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  var INTERESTS = [
    "Sell a property",
    "Buy a property",
    "Lease space",
    "Find tenants",
    "What's my property worth?",
    "Get notified of new offerings",
    "General inquiry"
  ];
  var INTEREST_ALIASES = {
    sell: "Sell a property",
    buy: "Buy a property",
    lease: "Lease space",
    tenants: "Find tenants",
    worth: "What's my property worth?",
    notify: "Get notified of new offerings",
    general: "General inquiry"
  };

  function interestFromQuery() {
    var params = new URLSearchParams(window.location.search);
    var raw = params.get("interest");
    if (!raw) return "";
    if (INTEREST_ALIASES[raw]) return INTEREST_ALIASES[raw];
    if (INTERESTS.indexOf(raw) !== -1) return raw;
    return "";
  }

  var hints = {
    "Sell a property": [
      "Property details",
      "Units or square footage, year built, occupancy, whether a rent roll and T-12 are available, timing"
    ],
    "What's my property worth?": [
      "Property details",
      "Units or square footage, year built, occupancy, whether a rent roll and T-12 are available"
    ],
    "Buy a property": [
      "What you want to buy",
      "Asset type, unit count or square footage, price range, target markets"
    ],
    "Get notified of new offerings": [
      "What you want to be notified about",
      "Asset type, unit count or square footage, price range, target markets"
    ],
    "Lease space": [
      "Space requirements",
      "Square footage, use, target area, move-in date"
    ],
    "Find tenants": [
      "Space available",
      "Suite sizes, asking rent, date available"
    ],
    "General inquiry": [
      "Message",
      "How can we help?"
    ]
  };

  function setHint(v) {
    var h = hints[v] || hints["Sell a property"];
    var lab = document.getElementById("msg-l");
    var ta = document.getElementById("f-msg");
    if (lab) lab.textContent = h[0];
    if (ta && document.activeElement !== ta) ta.placeholder = h[1];
  }

  var interestSelect = document.getElementById("f-interest");
  if (interestSelect) {
    var chosen = interestFromQuery();
    if (chosen) interestSelect.value = chosen;
    setHint(interestSelect.value);
    interestSelect.addEventListener("change", function () {
      setHint(interestSelect.value);
    });
    if (window.location.hash === "#valuation" || chosen === "What's my property worth?") {
      var formTop = document.getElementById("valuation");
      if (formTop) formTop.scrollIntoView();
    }
  }

  var inquiry = document.getElementById("inquiry");
  var inquiryMsg = document.getElementById("formMsg");
  var preview = document.getElementById("formPreview");
  var turnstileBox = document.getElementById("turnstile");
  var formReady = false;
  var turnstileWidget = null;

  function showFormMessage(text, ok) {
    if (!inquiryMsg) return;
    inquiryMsg.hidden = false;
    inquiryMsg.textContent = text;
    inquiryMsg.classList.toggle("ok", !!ok);
    inquiryMsg.focus();
  }

  function loadTurnstile(siteKey) {
    if (!turnstileBox || !siteKey) return;
    function render() {
      if (!window.turnstile) return;
      turnstileWidget = window.turnstile.render(turnstileBox, {
        sitekey: siteKey,
        theme: "dark"
      });
    }
    if (window.turnstile) {
      render();
      return;
    }
    var script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onload = render;
    document.head.appendChild(script);
  }

  if (inquiry) {
    fetch("/api/contact", { headers: { Accept: "application/json" } })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data && data.configured) {
          formReady = true;
          if (preview) preview.hidden = true;
          loadTurnstile(data.turnstileSiteKey);
        }
      })
      .catch(function () {
        formReady = false;
      });

    inquiry.addEventListener("submit", function (e) {
      e.preventDefault();
      if (typeof inquiry.reportValidity === "function" && !inquiry.reportValidity()) return;
      if (!formReady) {
        showFormMessage("Preview only, not connected. This form is not linked to an inbox yet. Nothing was sent.", false);
        return;
      }
      var payload = {
        name: inquiry.name.value,
        email: inquiry.email.value,
        phone: inquiry.phone.value,
        interest: inquiry.interest.value,
        address: inquiry.address.value,
        message: inquiry.message.value,
        consent: inquiry.consent.checked,
        company_website: inquiry.company_website ? inquiry.company_website.value : "",
        turnstileToken: ""
      };
      if (window.turnstile && turnstileWidget !== null) {
        payload.turnstileToken = window.turnstile.getResponse(turnstileWidget) || "";
      }
      var submitBtn = inquiry.querySelector("[type=submit]");
      if (submitBtn) submitBtn.disabled = true;
      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          return res.json().then(function (data) {
            return { status: res.status, data: data };
          });
        })
        .then(function (result) {
          var data = result.data || {};
          if (data.ok) {
            showFormMessage("Thank you. Your message is in. You will hear back from Justin directly.", true);
            inquiry.reset();
            if (chosen) interestSelect.value = chosen;
            setHint(interestSelect.value);
            if (window.turnstile && turnstileWidget !== null) window.turnstile.reset(turnstileWidget);
          } else if (data.error === "not configured" || data.configured === false) {
            formReady = false;
            if (preview) preview.hidden = false;
            showFormMessage("Preview only, not connected. This form is not linked to an inbox yet. Nothing was sent.", false);
          } else {
            showFormMessage(data.error || "The message could not be sent. Please try again, or use the email on this page.", false);
            if (window.turnstile && turnstileWidget !== null) window.turnstile.reset(turnstileWidget);
          }
        })
        .catch(function () {
          showFormMessage("Preview only, not connected. This form is not linked to an inbox yet. Nothing was sent.", false);
        })
        .then(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  }

  /* LinkedIn posts: add the newest first. Each needs a confirmed date, title, summary, and the post's LinkedIn URL.
     Do not invent posts. Leave this array empty until Joseph or Justin supplies real, approved items. */
  var POSTS = [
    /* {date:"Nov 2026", title:"Post title", summary:"One line on what the post covers.", url:"https://www.linkedin.com/posts/..."} */
  ];
  var pw = document.getElementById("posts");
  if (pw) {
    if (!POSTS.length) {
      pw.innerHTML = '<p class="empty">Market reports and posts from LinkedIn will appear here.</p>';
    } else {
      POSTS.slice(0, 3).forEach(function (p) {
        var a = document.createElement("a");
        a.className = "post";
        a.href = p.url;
        a.target = "_blank";
        a.rel = "noopener";
        a.innerHTML = '<span class="d"></span><h4></h4><p></p><span class="go">Read on LinkedIn <span class="arrow" aria-hidden="true"></span></span>';
        a.querySelector(".d").textContent = p.date;
        a.querySelector("h4").textContent = p.title;
        a.querySelector("p").textContent = p.summary;
        pw.appendChild(a);
      });
    }
  }

  function previewNotice(form, msgEl, nameField) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (typeof form.reportValidity === "function" && !form.reportValidity()) return;
      var name = nameField && form[nameField] ? (form[nameField].value.trim() || "") : "";
      msgEl.hidden = false;
      if (name) {
        msgEl.textContent =
          "Preview only, not connected. This form is not linked to an email platform yet. Nothing was sent, " +
          name.split(" ")[0] +
          ".";
      } else {
        msgEl.textContent =
          "Preview only, not connected. This form is not linked to an email platform yet. Nothing was sent.";
      }
      msgEl.focus();
    });
  }

  var sub = document.getElementById("subscribe");
  var subMsg = document.getElementById("subMsg");
  if (sub && subMsg) previewNotice(sub, subMsg, "email");

  var market = document.getElementById("market");
  if (market) initMarket(market);

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function hasDealRoom(item) {
    return !!(item.dealRoomUrl && item.dealRoomUrl !== "#");
  }

  function initMarket(root) {
    var source = root.getAttribute("data-source");
    var mode = root.getAttribute("data-mode") || "listings";
    var emptyCopy = root.getAttribute("data-empty") || "Nothing to show yet.";
    fetch(source)
      .then(function (res) {
        if (!res.ok) throw new Error("missing");
        return res.json();
      })
      .then(function (items) {
        if (!Array.isArray(items)) throw new Error("bad");
        renderMarket(root, items, mode, emptyCopy);
      })
      .catch(function () {
        root.innerHTML = '<p class="note">The listing data could not be loaded.</p>';
      });
  }

  function renderMarket(root, items, mode, emptyCopy) {
    root.innerHTML = "";
    var layout = document.createElement("div");
    layout.className = "market-layout";
    var mapEl = document.createElement("div");
    mapEl.className = "market-map";
    mapEl.setAttribute("role", "region");
    mapEl.setAttribute("aria-label", mode === "sold" ? "Map of closed transactions" : "Map of listings");
    var side = document.createElement("div");
    side.className = "market-side";
    layout.appendChild(mapEl);
    layout.appendChild(side);
    root.appendChild(layout);

    if (!items.length) {
      var empty = document.createElement("p");
      empty.className = "empty";
      empty.textContent = emptyCopy;
      side.appendChild(empty);
      observeMap(mapEl, [], function () {});
      return;
    }

    var filters = document.createElement("div");
    filters.className = "filters";
    var typeLabel = document.createElement("label");
    typeLabel.textContent = "Asset type";
    var typeSelect = document.createElement("select");
    typeSelect.id = "filter-type";
    typeLabel.setAttribute("for", "filter-type");
    var statusLabel = document.createElement("label");
    statusLabel.textContent = "Status";
    var statusSelect = document.createElement("select");
    statusSelect.id = "filter-status";
    statusLabel.setAttribute("for", "filter-status");
    fillSelect(typeSelect, unique(items, "assetType"));
    fillSelect(statusSelect, unique(items, "status"));
    typeLabel.appendChild(typeSelect);
    statusLabel.appendChild(statusSelect);
    filters.appendChild(typeLabel);
    filters.appendChild(statusLabel);
    side.appendChild(filters);

    var list = document.createElement("div");
    list.className = "deal-list";
    side.appendChild(list);

    var cards = items.map(function (item) {
      var card = document.createElement("article");
      card.className = "deal";
      card.dataset.type = item.assetType || "";
      card.dataset.status = item.status || "";
      var price = item.price || "Call for offers";
      var room = hasDealRoom(item)
        ? '<a class="btn" href="' + esc(item.dealRoomUrl) + '">View deal room</a>'
        : '<button class="btn" type="button" disabled>Deal room coming soon</button>';
      var note = item.illustrative
        ? '<p class="note">Illustrative sample. Not a live listing.</p>'
        : (item.note ? '<p class="note"></p>' : "");
      card.innerHTML =
        '<div class="shot"><img alt="" width="900" height="341" loading="lazy" decoding="async"></div>' +
        '<div class="body">' +
          '<span class="chip"></span>' +
          '<h3></h3>' +
          '<p class="meta"></p>' +
          '<p class="stats"><span class="size"></span><span class="price"></span></p>' +
          note +
          room +
        '</div>';
      var img = card.querySelector("img");
      var shot = card.querySelector(".shot");
      if (item.photo) {
        img.src = item.photo;
        img.alt = item.illustrative
          ? "Illustration for the " + item.name + " sample, not a live listing"
          : "Photo of " + item.name + " in " + item.city;
      } else if (shot) {
        shot.innerHTML = '<div class="photo-slot tile" role="img"><span class="photo-chip">PHOTO: ' + esc(item.name || "Listing") + ' exterior, 4:3, card</span></div>';
      }
      card.querySelector(".chip").textContent = item.status || "";
      card.querySelector("h3").textContent = item.name || "";
      card.querySelector(".meta").textContent = [item.city, item.assetType].filter(Boolean).join(" · ");
      card.querySelector(".size").textContent = item.size || "";
      card.querySelector(".price").textContent = price;
      if (item.note && !item.illustrative) card.querySelector(".note").textContent = item.note;
      list.appendChild(card);
      return { item: item, card: card, marker: null };
    });

    function applyFilter() {
      var type = typeSelect.value;
      var status = statusSelect.value;
      cards.forEach(function (row) {
        row.card.hidden = !((type === "all" || row.item.assetType === type) && (status === "all" || row.item.status === status));
      });
      if (cards._render) cards._render(true);
    }
    typeSelect.addEventListener("change", applyFilter);
    statusSelect.addEventListener("change", applyFilter);

    observeMap(mapEl, cards, function (map) {
      window.__parlatoMap = map;
      syncMarkers(map, cards, typeSelect.value, statusSelect.value);
    });
  }

  function fillSelect(select, values) {
    var all = document.createElement("option");
    all.value = "all";
    all.textContent = "All";
    select.appendChild(all);
    values.forEach(function (value) {
      var opt = document.createElement("option");
      opt.value = value;
      opt.textContent = value;
      select.appendChild(opt);
    });
  }

  function unique(items, key) {
    var seen = [];
    items.forEach(function (item) {
      if (item[key] && seen.indexOf(item[key]) === -1) seen.push(item[key]);
    });
    return seen;
  }

  function visible(item, type, status) {
    return (type === "all" || item.assetType === type) && (status === "all" || item.status === status);
  }

  function syncMarkers(map, cards) {
    if (cards._render) cards._render(true);
  }

  function popupHtml(item) {
    var room = hasDealRoom(item)
      ? '<p><a class="popup-link" href="' + esc(item.dealRoomUrl) + '">View deal room</a></p>'
      : "<p>Deal room coming soon</p>";
    return "<h3>" + esc(item.name) + "</h3><p>" + esc(item.city) + "</p><p>" + esc(item.assetType) + "</p>" + room;
  }

  function clusterGroups(map, rows) {
    var radius = 48;
    var used = {};
    var groups = [];
    rows.forEach(function (row, i) {
      if (used[i]) return;
      var p = map.project([row.item.lng, row.item.lat]);
      var group = [row];
      used[i] = true;
      rows.forEach(function (other, j) {
        if (used[j]) return;
        var q = map.project([other.item.lng, other.item.lat]);
        var dx = p.x - q.x;
        var dy = p.y - q.y;
        if (dx * dx + dy * dy < radius * radius) {
          group.push(other);
          used[j] = true;
        }
      });
      groups.push(group);
    });
    return groups;
  }

  function observeMap(mapEl, cards, onReady) {
    var started = false;
    function start() {
      if (started) return;
      started = true;
      loadMapLibre()
        .then(function () { return drawMap(mapEl, cards, onReady); })
        .catch(function () {
          mapEl.textContent = "The map could not be loaded.";
        });
    }
    if (!("IntersectionObserver" in window)) {
      start();
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          observer.disconnect();
          start();
        }
      });
    }, { rootMargin: "200px" });
    observer.observe(mapEl);
  }

  function loadMapLibre() {
    if (window.maplibregl) return Promise.resolve();
    return new Promise(function (resolve, reject) {
      var css = document.createElement("link");
      css.rel = "stylesheet";
      css.href = "js/vendor/maplibre/maplibre-gl.css";
      document.head.appendChild(css);
      var script = document.createElement("script");
      script.src = "js/vendor/maplibre/maplibre-gl.js";
      script.onload = function () { resolve(); };
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }

  function drawMap(mapEl, cards, onReady) {
    var points = cards.filter(function (row) {
      return typeof row.item.lat === "number" && typeof row.item.lng === "number";
    });
    var center = points.length ? [points[0].item.lng, points[0].item.lat] : [-86.1581, 39.7684];
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var map = new window.maplibregl.Map({
      container: mapEl,
      style: "https://tiles.openfreemap.org/styles/positron",
      center: center,
      zoom: points.length ? 11 : 8,
      attributionControl: true,
      fadeDuration: reduce ? 0 : 300
    });
    map.addControl(new window.maplibregl.NavigationControl({ showCompass: false }), "top-left");
    map.scrollZoom.disable();
    var bag = [];
    var lastZoom = null;
    function clearBag() {
      bag.forEach(function (marker) { marker.remove(); });
      bag = [];
      points.forEach(function (row) { row.marker = null; });
    }
    function render(force) {
      if (!map.loaded()) return;
      var zoom = Math.round(map.getZoom() * 2) / 2;
      if (!force && lastZoom === zoom) return;
      lastZoom = zoom;
      clearBag();
      var shown = points.filter(function (row) { return !row.card.hidden; });
      clusterGroups(map, shown).forEach(function (group) {
        if (group.length === 1) {
          var row = group[0];
          var el = document.createElement("button");
          el.type = "button";
          el.className = "pin";
          el.setAttribute("aria-label", row.item.name || "Listing");
          row.marker = new window.maplibregl.Marker({ element: el })
            .setLngLat([row.item.lng, row.item.lat])
            .setPopup(new window.maplibregl.Popup({ offset: 16, maxWidth: "260px", focusAfterOpen: false }).setHTML(popupHtml(row.item)))
            .addTo(map);
          bag.push(row.marker);
        } else {
          var elc = document.createElement("button");
          elc.type = "button";
          elc.className = "cluster";
          elc.textContent = String(group.length);
          elc.setAttribute("aria-label", group.length + " listings in this area");
          var lng = 0;
          var lat = 0;
          group.forEach(function (row) { lng += row.item.lng; lat += row.item.lat; });
          lng /= group.length;
          lat /= group.length;
          elc.addEventListener("click", function () {
            var bounds = new window.maplibregl.LngLatBounds();
            group.forEach(function (row) { bounds.extend([row.item.lng, row.item.lat]); });
            var opts = { padding: 64, maxZoom: map.getZoom() + 2 };
            if (reduce) map.fitBounds(bounds, opts);
            else map.fitBounds(bounds, opts);
          });
          bag.push(new window.maplibregl.Marker({ element: elc }).setLngLat([lng, lat]).addTo(map));
        }
      });
    }
    cards._render = render;
    map.on("load", function () {
      map.resize();
      if (points.length > 1) {
        var bounds = new window.maplibregl.LngLatBounds();
        points.forEach(function (row) { bounds.extend([row.item.lng, row.item.lat]); });
        map.fitBounds(bounds, { padding: 48, maxZoom: 12, duration: reduce ? 0 : 600 });
      }
      render(true);
    });
    map.on("zoomend", function () { render(true); });
    cards.forEach(function (row) {
      if (typeof row.item.lng !== "number") return;
      function focusPin() {
        var motion = reduce ? { duration: 0 } : {};
        map.flyTo(Object.assign({ center: [row.item.lng, row.item.lat], zoom: Math.max(map.getZoom(), 12), essential: true }, motion));
        mapEl.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest" });
        window.setTimeout(function () {
          if (row.marker) row.marker.togglePopup();
        }, reduce ? 0 : 450);
      }
      row.card.addEventListener("click", function (event) {
        if (event.target.closest("a, button")) return;
        focusPin();
      });
      row.card.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          focusPin();
        }
      });
      row.card.tabIndex = 0;
    });
    onReady(map);
  }
})();
