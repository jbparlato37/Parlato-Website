(function () {
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

  var hints = {
    Sell: [
      "Property details",
      "Units or square footage, year built, occupancy, whether a rent roll and T-12 are available, timing"
    ],
    "Valuation only": [
      "Property details",
      "Units or square footage, year built, occupancy, whether a rent roll and T-12 are available"
    ],
    Buy: [
      "Your buy box",
      "Asset type, unit count or SF range, price range, target submarkets, 1031 timing if any"
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
    var h = hints[v] || hints.Sell;
    var lab = document.getElementById("msg-l");
    var ta = document.getElementById("f-msg");
    if (lab) lab.textContent = h[0];
    if (ta) ta.placeholder = h[1];
  }

  function setIntent(v) {
    if (!v) return;
    document.querySelectorAll("input[name=intent]").forEach(function (r) {
      r.checked = r.value === v;
    });
    setHint(v);
  }

  document.querySelectorAll("[data-intent]").forEach(function (a) {
    a.addEventListener("click", function () {
      setIntent(a.getAttribute("data-intent"));
    });
  });

  document.querySelectorAll("input[name=intent]").forEach(function (r) {
    r.addEventListener("change", function () {
      setHint(r.value);
    });
  });

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
      if (typeof form.reportValidity === "function" && !form.reportValidity()) {
        return;
      }
      var name = nameField && form[nameField] ? (form[nameField].value.trim() || "") : "";
      msgEl.hidden = false;
      if (name) {
        msgEl.textContent =
          "Preview only, not connected. This form is not linked to monday or an email platform yet. Nothing was sent, " +
          name.split(" ")[0] +
          ". Please use the phone number or email on this page.";
      } else {
        msgEl.textContent =
          "Preview only, not connected. This form is not linked to monday or an email platform yet. Nothing was sent. Please use the phone number or email on this page.";
      }
      msgEl.focus();
    });
  }

  var inquiry = document.getElementById("inquiry");
  var inquiryMsg = document.getElementById("formMsg");
  if (inquiry && inquiryMsg) previewNotice(inquiry, inquiryMsg, "name");

  var sub = document.getElementById("subscribe");
  var subMsg = document.getElementById("subMsg");
  if (sub && subMsg) previewNotice(sub, subMsg, "email");
})();
