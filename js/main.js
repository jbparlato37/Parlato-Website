(function () {
  var head = document.querySelector(".site-head");
  if (head) {
    var heroBand = document.querySelector("main > section.hero-photo, main > section.page-hero");
    function paintHead() {
      var past = heroBand ? heroBand.offsetTop + heroBand.offsetHeight - head.offsetHeight : 0;
      head.classList.toggle("is-busy", past > 0 && window.scrollY > past);
    }
    paintHead();
    window.addEventListener("scroll", paintHead, { passive: true });
    window.addEventListener("resize", paintHead);
  }

  document.documentElement.classList.add("js");
  var revealReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!revealReduce && "IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll("main .band, main .photo-band, main .strip-band").forEach(function (node, index) {
      if (index === 0) return;
      var rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.96) return;
      node.classList.add("reveal");
      revealObserver.observe(node);
    });
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
    "Get notified of new offerings",
    "General inquiry"
  ];
  var INTEREST_ALIASES = {
    sell: "Sell a property",
    buy: "Buy a property",
    lease: "Lease space",
    tenants: "Find tenants",
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
    "Buy a property": [
      "Your buy box",
      "Asset type, unit count or SF range, price range, target submarkets, return target, cash or financed, 1031 timing if any"
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
  }

  /* Lead and valuation forms: preview only. Nothing is sent anywhere until Joseph approves a live connection
     (monday WorkForms or a webhook, per CLAUDE.md). The "Preview only, not connected" notice must stay visible.
     A Cloudflare Pages Functions email version was drafted on the cursor/multipage-site-f9be branch; it is not
     part of this site. */
  var inquiry = document.getElementById("inquiry");
  if (inquiry) previewNotice(inquiry, document.getElementById("formMsg"), "name");
  var valuationForm = document.getElementById("valuation-form");
  if (valuationForm) previewNotice(valuationForm, document.getElementById("formMsg"), "name");

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
          "Preview only, not connected. Nothing was sent, " +
          name.split(" ")[0] +
          ". Please call 317-981-9115.";
      } else {
        msgEl.textContent =
          "Preview only, not connected. Nothing was sent. Please call 317-981-9115.";
      }
      msgEl.focus();
    });
  }

  var sub = document.getElementById("subscribe");
  var subMsg = document.getElementById("subMsg");
  if (sub && subMsg) previewNotice(sub, subMsg, "email");


  /* ------------------------------------------------------------------
     Growth sections. The site grows from the files in data/:
       sold.json, listings.json, market-sales.json, reports.json, metrics.json, testimonials.json
     Anything marked data-show-when="KEY" stays hidden until data/KEY.json has real entries.
     Entries flagged "illustrative" or "placeholder" never count as real. See README, "How the site grows".
     ------------------------------------------------------------------ */
  var DATA_CACHE = {};
  function loadData(key) {
    if (!DATA_CACHE[key]) {
      DATA_CACHE[key] = fetch("data/" + key + ".json")
        .then(function (res) { if (!res.ok) throw new Error("missing"); return res.json(); })
        .then(function (raw) {
          var items = Array.isArray(raw) ? raw : (raw && Array.isArray(raw.items) ? raw.items : []);
          return {
            meta: Array.isArray(raw) ? {} : (raw || {}),
            items: items.filter(function (i) { return i && !i.illustrative && !i.placeholder; })
          };
        })
        .catch(function () { return { meta: {}, items: [] }; });
    }
    return DATA_CACHE[key];
  }

  var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  function fmtMonth(v) {
    var m = /^(\d{4})-(\d{2})/.exec(v || "");
    return m ? MONTHS[parseInt(m[2], 10) - 1] + " " + m[1] : (v || "");
  }
  function fmtMoney(v) {
    if (typeof v !== "number") return v || "Confidential";
    if (v >= 1e9) return "$" + (v / 1e9).toFixed(2).replace(/\.?0+$/, "") + "B";
    if (v >= 1e6) return "$" + (v / 1e6).toFixed(2).replace(/0$/, "") + "M";
    return "$" + Math.round(v).toLocaleString("en-US");
  }
  function fmtSize(item) {
    if (item.size) return item.size;
    if (typeof item.units === "number") return item.units.toLocaleString("en-US") + " units";
    if (typeof item.sf === "number") return item.sf.toLocaleString("en-US") + " SF";
    return "";
  }
  function perUnit(item) {
    if (typeof item.price !== "number") return "";
    if (typeof item.units === "number" && item.units > 0) return "$" + Math.round(item.price / item.units).toLocaleString("en-US") + " per unit";
    if (typeof item.sf === "number" && item.sf > 0) return "$" + Math.round(item.price / item.sf).toLocaleString("en-US") + " per SF";
    return "";
  }
  function byNewest(a, b) { return String(b.closed || "").localeCompare(String(a.closed || "")); }

  function table(el, heads, rows, emptyCopy) {
    if (!rows.length) {
      el.innerHTML = emptyCopy ? '<table><tbody><tr class="none"><td>' + esc(emptyCopy) + "</td></tr></tbody></table>" : "";
      return;
    }
    el.innerHTML = "<table><thead><tr>" + heads.map(function (h) { return "<th>" + esc(h) + "</th>"; }).join("") +
      "</tr></thead><tbody>" + rows.map(function (r) {
        return "<tr>" + r.map(function (c) { return "<td>" + esc(c) + "</td>"; }).join("") + "</tr>";
      }).join("") + "</tbody></table>";
  }

  var RENDER = {
    "sold-table": function (el) {
      loadData("sold").then(function (d) {
        var items = d.items.slice().sort(byNewest);
        var limit = parseInt(el.getAttribute("data-limit") || "0", 10);
        if (limit) items = items.slice(0, limit);
        table(el, ["Property", "Type", "Size", "Market", "Price", "Closed", "Represented"], items.map(function (i) {
          return [i.name, i.type, fmtSize(i), i.market, fmtMoney(i.price), fmtMonth(i.closed), i.represented];
        }), el.getAttribute("data-empty"));
      });
    },
    "sold-totals": function (el) {
      loadData("sold").then(function (d) {
        if (d.items.length < 3) return;
        var units = 0, volume = 0;
        d.items.forEach(function (i) {
          if (typeof i.units === "number") units += i.units;
          if (typeof i.price === "number") volume += i.price;
        });
        var cells = [[String(d.items.length), "Closed transactions"]];
        if (units) cells.push([units.toLocaleString("en-US"), "Units sold"]);
        if (volume) cells.push([fmtMoney(volume), "Sales volume, disclosed prices"]);
        el.innerHTML = cells.map(function (c) { return "<div><dd>" + esc(c[0]) + "</dd><dt>" + esc(c[1]) + "</dt></div>"; }).join("");
        el.hidden = false;
      });
    },
    "market-sales-table": function (el) {
      loadData("market-sales").then(function (d) {
        var items = d.items.slice().sort(byNewest);
        table(el, ["Property", "Type", "Size", "Market", "Price", "Per unit or SF", "Closed"], items.map(function (i) {
          return [i.name, i.type, fmtSize(i), i.market, fmtMoney(i.price), perUnit(i), fmtMonth(i.closed)];
        }), el.getAttribute("data-empty"));
      });
    },
    "market-sales-meta": function (el) {
      loadData("market-sales").then(function (d) {
        var parts = [];
        if (d.meta.source) parts.push("Source: " + d.meta.source + ".");
        if (d.meta.updated) parts.push("Updated " + d.meta.updated + ".");
        el.textContent = parts.join(" ");
        el.hidden = !parts.length;
      });
    },
    reports: function (el) {
      loadData("reports").then(function (d) {
        el.innerHTML = d.items.map(function (r) {
          return '<li><a class="entry" href="' + esc(r.url) + '"><span class="d">' + esc(r.date) + "</span><h3>" +
            esc(r.title) + "</h3><p>" + esc(r.summary) + "</p></a></li>";
        }).join("");
        if (d.items.length) {
          var h = document.getElementById("rep-h");
          if (h) {
            h.textContent = "Reports.";
            var lede = h.parentNode.querySelector(".lede");
            if (lede) lede.textContent = "Each report states its date, data source and author.";
          }
        }
      });
    },
    metrics: function (el) {
      loadData("metrics").then(function (d) {
        el.innerHTML = d.items.map(function (m) {
          return "<div><dd>" + esc(m.value) + "</dd><dt>" + esc(m.label) + "</dt></div>";
        }).join("");
      });
    },
    testimonials: function (el) {
      loadData("testimonials").then(function (d) {
        el.innerHTML = d.items.map(function (t) {
          return '<figure class="quote"><blockquote><p>' + esc(t.quote) + "</p></blockquote><figcaption><b>" + esc(t.name) +
            "</b>" + esc([t.title, t.company].filter(Boolean).join(", ")) +
            (t.deal ? '<span class="deal">' + esc(t.deal) + "</span>" : "") + "</figcaption></figure>";
        }).join("");
      });
    }
  };
  document.querySelectorAll("[data-render]").forEach(function (el) {
    var fn = RENDER[el.getAttribute("data-render")];
    if (fn) fn(el);
  });
  document.querySelectorAll("[data-show-when]").forEach(function (el) {
    loadData(el.getAttribute("data-show-when")).then(function (d) {
      if (d.items.length) el.hidden = false;
    });
  });

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
        items = items.filter(function (i) { return i && !i.illustrative && !i.placeholder; });
        if (!items.length && mode === "listings") {
          root.innerHTML = "";
          var none = document.createElement("p");
          none.className = "lede";
          none.textContent = emptyCopy;
          root.appendChild(none);
          return;
        }
        renderMarket(root, items, mode, emptyCopy);
      })
      .catch(function () {
        root.innerHTML = '<p class="note">The listing data could not be loaded.</p>';
      });
  }

  function renderMarket(root, items, mode, emptyCopy) {
    root.innerHTML = "";
    var filters = document.createElement("div");
    filters.className = "filters";
    var note = null;
    if (mode === "listings") {
      note = document.createElement("p");
      note.className = "market-note";
      note.textContent = "[CONFIRM: map coordinates are placeholders, not a surveyed location.] [CONFIRM: deal room URL for each listing.]";
    }
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

    if (!items.length) {
      root.innerHTML = "";
      if (mode === "sold") {
        root.hidden = true;
        return;
      }
      if (note) root.appendChild(note);
      root.appendChild(layout);
      var empty = document.createElement("p");
      empty.className = "empty";
      empty.textContent = emptyCopy;
      side.appendChild(empty);
      observeMap(mapEl, [], function () {});
      return;
    }

    root.appendChild(filters);
    if (note) root.appendChild(note);
    root.appendChild(layout);
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

    var list = document.createElement("div");
    list.className = "deal-list";
    side.appendChild(list);

    var cards = items.map(function (item) {
      var card = document.createElement("article");
      card.className = "deal";
      card.dataset.type = item.assetType || "";
      card.dataset.status = item.status || "";
      var price = item.illustrative ? "Price: placeholder" : (item.price || "Call for offers");
      var room = hasDealRoom(item)
        ? '<a class="btn" href="' + esc(item.dealRoomUrl) + '">View deal room</a>'
        : '<button class="btn" type="button" disabled>Deal room coming soon</button>';
      var note = item.illustrative
        ? '<p class="note">Placeholder. Not a real property or a live listing.</p>'
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
          ? "Placeholder image, not a live listing"
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

  function observeMap(mapEl, cards, onReady) {
    var started = false;
    function start() {
      if (started) return;
      started = true;
      loadLeaflet()
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
    }, { rootMargin: "240px" });
    observer.observe(mapEl);
  }

  function loadLeaflet() {
    if (window.L && window.L.markerClusterGroup) return Promise.resolve();
    function style(href) {
      var link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
      return Promise.resolve();
    }
    function script(src) {
      return new Promise(function (resolve, reject) {
        var el = document.createElement("script");
        el.src = src;
        el.onload = resolve;
        el.onerror = reject;
        document.body.appendChild(el);
      });
    }
    return style("js/vendor/leaflet/leaflet.css")
      .then(function () { return script("js/vendor/leaflet/leaflet.js"); })
      .then(function () { return script("js/vendor/leaflet/leaflet.markercluster.js"); });
  }

  function drawMap(mapEl, cards, onReady) {
    var points = cards.filter(function (row) {
      return typeof row.item.lat === "number" && typeof row.item.lng === "number";
    });
    var center = points.length ? [points[0].item.lat, points[0].item.lng] : [39.7684, -86.1581];
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var map = window.L.map(mapEl, {
      scrollWheelZoom: false,
      zoomControl: true,
      attributionControl: true
    }).setView(center, points.length ? 12 : 8);
    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      subdomains: "abc",
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    var group = window.L.markerClusterGroup({
      showCoverageOnHover: false,
      spiderfyOnMaxZoom: true,
      iconCreateFunction: function (cluster) {
        return window.L.divIcon({
          html: "<span>" + cluster.getChildCount() + "</span>",
          className: "cluster",
          iconSize: [36, 36]
        });
      }
    });
    map.addLayer(group);

    function markerEl(marker) {
      var el = marker.getElement && marker.getElement();
      return el ? (el.querySelector(".pin") || el) : null;
    }
    function paint(row, className, on) {
      row.card.classList.toggle(className, on);
      var el = row.marker ? markerEl(row.marker) : null;
      if (el) el.classList.toggle(className, on);
    }
    function activate(row) {
      points.forEach(function (other) { paint(other, "is-active", other === row); });
    }

    points.forEach(function (row) {
      var icon = window.L.divIcon({
        className: "pin-wrap",
        html: '<button type="button" class="pin" aria-label="' + esc(row.item.name || "Listing") + '"></button>',
        iconSize: [16, 16],
        iconAnchor: [8, 8],
        popupAnchor: [0, -12]
      });
      var marker = window.L.marker([row.item.lat, row.item.lng], { icon: icon, title: row.item.name || "", keyboard: true });
      marker.bindPopup(popupHtml(row.item), { maxWidth: 260, autoPan: true });
      marker.on("add", function () {
        var el = markerEl(marker);
        if (!el || el._parlatoBound) return;
        el._parlatoBound = true;
        el.addEventListener("mouseenter", function () { paint(row, "is-hot", true); });
        el.addEventListener("mouseleave", function () { paint(row, "is-hot", false); });
      });
      row.marker = marker;
      group.addLayer(marker);
    });

    function render() {
      points.forEach(function (row) {
        var show = !row.card.hidden;
        var present = group.hasLayer(row.marker);
        if (show && !present) group.addLayer(row.marker);
        if (!show && present) group.removeLayer(row.marker);
      });
    }
    cards._render = render;

    if (points.length > 1) {
      var bounds = window.L.latLngBounds(points.map(function (row) {
        return [row.item.lat, row.item.lng];
      }));
      map.fitBounds(bounds, { padding: [36, 36], maxZoom: 12, animate: !reduce });
    }

    points.forEach(function (row) {
      function focusPin() {
        activate(row);
        var open = function () { row.marker.openPopup(); };
        if (group.zoomToShowLayer) group.zoomToShowLayer(row.marker, open);
        else open();
        mapEl.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest" });
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

    window.setTimeout(function () { map.invalidateSize(); }, 60);
    onReady(map);
  }
})();
