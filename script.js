// ---- Load artworks from HTML data, fallback to defaults ----
function loadArtworks() {
  var script = document.getElementById("artworks-data");
  if (script) {
    try { return JSON.parse(script.textContent); } catch (e) {}
  }
  return [
  {
    "id": "01",
    "source": "assets/photos/01.svg",
    "title": "晨光",
    "caption": "清晨，房间还没有完全醒来。",
    "layout": "tall",
    "colors": [
      "#9a6251",
      "#e3b891",
      "#f0dfca"
    ]
  },
  {
    "id": "02",
    "source": "assets/photos/02.svg",
    "title": "窗边",
    "caption": "把没有说出口的话，留给光线。",
    "layout": "landscape",
    "colors": [
      "#7f756a",
      "#d8af8d",
      "#f1ddca"
    ]
  },
  {
    "id": "03",
    "source": "assets/photos/03.svg",
    "title": "午后",
    "caption": "阳光慢下来，影子也有了形状。",
    "layout": "square",
    "colors": [
      "#b87b62",
      "#e5b98e",
      "#f4e3cd"
    ]
  },
  {
    "id": "04",
    "source": "assets/photos/04.svg",
    "title": "走出去",
    "caption": "出门前，先确认自己正以怎样的表情面对世界。",
    "layout": "tall",
    "colors": [
      "#79504b",
      "#bf9176",
      "#ead0b8"
    ]
  },
  {
    "id": "05",
    "source": "assets/photos/05.svg",
    "title": "停留",
    "caption": "在一段空白里，练习不着急成为谁。",
    "layout": "square",
    "colors": [
      "#8c7764",
      "#cba885",
      "#eee1d1"
    ]
  },
  {
    "id": "06",
    "source": "assets/photos/06.svg",
    "title": "傍晚的镜子",
    "caption": "镜子不是答案，只是一场安静的相遇。",
    "layout": "wide",
    "colors": [
      "#71464b",
      "#b77c72",
      "#e8c0a4"
    ]
  },
  {
    "id": "07",
    "source": "assets/photos/07.svg",
    "title": "回声",
    "caption": "那些平凡的念头，仍在心里轻轻回响。",
    "layout": "tall",
    "colors": [
      "#657070",
      "#a7a18b",
      "#ddd2bc"
    ]
  },
  {
    "id": "08",
    "source": "assets/photos/08.svg",
    "title": "小小的风",
    "caption": "风经过的时候，刚好把今天吹得松一点。",
    "layout": "square",
    "colors": [
      "#8a6e5b",
      "#cc9476",
      "#edd3b8"
    ]
  },
  {
    "id": "09",
    "source": "assets/photos/09.svg",
    "title": "路过",
    "caption": "走过熟悉的地方，也像第一次认识自己。",
    "layout": "landscape",
    "colors": [
      "#56635c",
      "#a79877",
      "#ded3ba"
    ]
  },
  {
    "id": "10",
    "source": "assets/photos/10.svg",
    "title": "沉静",
    "caption": "把注意力交还给呼吸和眼前的这一刻。",
    "layout": "square",
    "colors": [
      "#5d4c4a",
      "#ad7f75",
      "#e6c4ae"
    ]
  },
  {
    "id": "11",
    "source": "assets/photos/11.svg",
    "title": "夜色之前",
    "caption": "天黑以前，仍有一些温柔值得被看见。",
    "layout": "tall",
    "colors": [
      "#594552",
      "#9c7a84",
      "#d7c0bb"
    ]
  },
  {
    "id": "12",
    "source": "assets/photos/12.svg",
    "title": "回到日常",
    "caption": "所有故事最后，都回到平静而真实的自己。",
    "layout": "wide",
    "colors": [
      "#776559",
      "#c49b78",
      "#ebd5bc"
    ]
  }
];

}

var artworks = loadArtworks();
const gallery = document.querySelector("#gallery-grid");
const heroImage = document.querySelector("#hero-image");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxIndex = document.querySelector("#lightbox-index");
const lightboxTitle = document.querySelector("#lightbox-title");
const lightboxCaption = document.querySelector("#lightbox-caption");
const closeLightboxButton = document.querySelector("#close-lightbox");
const previousArtworkButton = document.querySelector("#previous-artwork");
const nextArtworkButton = document.querySelector("#next-artwork");

let activeIndex = 0;
let lastTrigger = null;

function createPlaceholder(artwork, isWide) {
  isWide = isWide || false;
  var width = isWide ? 1500 : 900;
  var height = 1200;
  var dark = artwork.colors[0], mid = artwork.colors[1], light = artwork.colors[2];
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + width + ' ' + height + '" role="img" aria-label="PHOTO PLACEHOLDER ' + artwork.id + '"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="' + dark + '"/><stop offset="52%" stop-color="' + mid + '"/><stop offset="100%" stop-color="' + light + '"/></linearGradient><filter id="b"><feGaussianBlur stdDeviation="42"/></filter></defs><rect width="100%" height="100%" fill="url(#bg)"/><circle cx="' + (width*0.75) + '" cy="' + (height*0.22) + '" r="' + (height*0.28) + '" fill="#fff4e9" opacity=".34" filter="url(#b)"/><ellipse cx="' + (width*0.28) + '" cy="' + (height*0.75) + '" rx="' + (width*0.42) + '" ry="' + (height*0.23) + '" fill="#2a1c1a" opacity=".18" filter="url(#b)"/><rect x="' + (width*0.08) + '" y="' + (height*0.08) + '" width="' + (width*0.84) + '" height="' + (height*0.84) + '" fill="none" stroke="#fff8f1" stroke-opacity=".55" stroke-width="1.5"/><text x="50%" y="50%" text-anchor="middle" dy="0.35em" fill="rgba(255,248,241,0.82)" font-size="' + Math.round(width/22) + '" font-weight="300" letter-spacing=".12em">PHOTO PLACEHOLDER ' + artwork.id + '</text></svg>';
}

function applyArtworkImage(img, artwork, opts) {
  opts = opts || {};
  var src = artwork.source;
  if (!src || src === "") return;
  var isWide = opts.isWide || false;
  // If source is an SVG file, render it as an inline placeholder immediately
  // (no waiting for HTTP request that will fail slowly)
  if (src.indexOf(".svg") > 0) {
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(createPlaceholder(artwork, isWide));
    img.alt = artwork.title;
    return;
  }
  // For real image files, try to load them
  img.src = src;
  img.alt = artwork.title + ' - ' + artwork.caption;
  img.onerror = function () {
    if (img.src === src) {
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(createPlaceholder(artwork, isWide));
      img.alt = artwork.title;
    }
  };
}

function renderGallery() {
  if (!gallery) return;
  var fragment = document.createDocumentFragment();
  artworks.forEach(function (artwork, index) {
    var item = document.createElement("li");
    item.className = "gallery-card gallery-card--" + (artwork.layout || "square");
    var button = document.createElement("button");
    button.className = "gallery-card__button";
    button.type = "button";
    var image = document.createElement("img");
    image.loading = "lazy";
    applyArtworkImage(image, artwork);
    var meta = document.createElement("span");
    meta.className = "gallery-card__meta";
    meta.innerHTML = '<span class="gallery-card__number">' + artwork.id + ' / 12</span><span class="gallery-card__title">' + artwork.title + '</span>';
    var hint = document.createElement("span");
    hint.className = "gallery-card__hint";
    hint.setAttribute("aria-hidden", "true");
    hint.textContent = "+";
    button.append(image, meta, hint);
    button.addEventListener("click", (function(idx) { return function() { openLightbox(idx, button); }; })(index));
    item.append(button);
    fragment.append(item);
  });
  gallery.innerHTML = "";
  gallery.append(fragment);
}

function renderLightbox(index) {
  var artwork = artworks[index];
  if (!artwork) return;
  activeIndex = index;
  lightboxIndex.textContent = artwork.id + ' / 12';
  lightboxTitle.textContent = artwork.title;
  lightboxCaption.textContent = artwork.caption;
  applyArtworkImage(lightboxImage, artwork);
}

function openLightbox(index, trigger) {
  if (!lightbox) return;
  renderLightbox(index);
  lastTrigger = trigger || null;
  if (!lightbox.open) lightbox.showModal();
  closeLightboxButton.focus();
}

function closeLightbox() { if (lightbox && lightbox.open) lightbox.close(); }

function showRelativeArtwork(direction) {
  var nextIndex = (activeIndex + direction + artworks.length) % artworks.length;
  renderLightbox(nextIndex);
}

applyArtworkImage(heroImage, artworks[0], { isWide: false });
renderGallery();

closeLightboxButton.addEventListener("click", closeLightbox);
previousArtworkButton.addEventListener("click", function() { showRelativeArtwork(-1); });
nextArtworkButton.addEventListener("click", function() { showRelativeArtwork(1); });

lightbox.addEventListener("click", function(event) {
  if (event.target === lightbox) closeLightbox();
});

lightbox.addEventListener("close", function() {
  document.body.classList.remove("has-dialog");
  if (lastTrigger) lastTrigger.focus();
});

document.addEventListener("keydown", function(e) {
  if (!lightbox || !lightbox.open) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") showRelativeArtwork(-1);
  if (e.key === "ArrowRight") showRelativeArtwork(1);
});

// =============================================
// ADMIN MODE - Login, Edit & Auto-Deploy
// =============================================
(function () {
  "use strict";

  var ADMIN_USER = "admin";
  var ADMIN_PASS = "admin2026";

  var NF_TOKEN  = "nfp_ZihhcB4Yegg3MHXPY2ZMJiLKWdT6QNWff58b";
  var NF_SITE   = "aa80fdc1-ee5f-4ca5-905a-b52080907d60";
  var NF_SITE_URL = "https://tamen-derichang.netlify.app";

  // GitHub API credentials for deploying to GitHub Pages
  var GH_TOKEN  = "";  // 留空使用本地部署服务器（运行 node deploy-server.js）
  var GH_OWNER  = "kin-007";
  var GH_REPO   = "tamen-derichang";
  var GH_BRANCH = "main";
  var GH_API    = "https://api.github.com";

  var isAdmin = false;
  var textChanges = new Map();
  var imageChanges = new Map();
  var deployInProgress = false;

  var loginDlg  = document.getElementById("admin-login");
  var loginForm = document.getElementById("admin-login-form");
  var userInp   = document.getElementById("admin-user");
  var passInp   = document.getElementById("admin-pass");
  var errEl     = document.getElementById("admin-login-error");
  var cancelBtn = document.getElementById("admin-login-cancel");
  var loginBtn  = document.getElementById("admin-login-btn");
  var adminBar  = document.getElementById("admin-bar");
  var saveBtn   = document.getElementById("admin-save");
  var logoutBtn = document.getElementById("admin-logout");
  var statusEl  = document.getElementById("admin-status");

  // ---- Login form submit ----
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      errEl.textContent = "";
      if (userInp.value === ADMIN_USER && passInp.value === ADMIN_PASS) {
        isAdmin = true;
        loginDlg.close();
        enterAdminMode();
      } else {
        errEl.textContent = "账号或密码错误";
        passInp.value = "";
        passInp.focus();
      }
    });
  }

  // ---- Cancel button ----
  if (cancelBtn) {
    cancelBtn.addEventListener("click", function () { loginDlg.close(); });
  }

  // ---- Nav login button ----
  if (loginBtn) {
    loginBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (!isAdmin) {
        userInp.value = ""; passInp.value = ""; errEl.textContent = "";
        loginDlg.showModal(); userInp.focus();
      } else {
        leaveAdminMode();
      }
    });
  }

  // ---- Wordmark click ----
  var wm = document.querySelector(".wordmark");
  if (wm) {
    wm.addEventListener("click", function (e) {
      if (!isAdmin) {
        e.preventDefault();
        userInp.value = ""; passInp.value = ""; errEl.textContent = "";
        loginDlg.showModal(); userInp.focus();
      } else {
        leaveAdminMode();
      }
    });
  }

  // ---- Keyboard shortcut: Ctrl+Shift+A ----
  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.shiftKey && (e.key === "A" || e.key === "a")) {
      e.preventDefault();
      if (isAdmin) leaveAdminMode();
      else { userInp.value = ""; passInp.value = ""; errEl.textContent = "";
             loginDlg.showModal(); userInp.focus(); }
    }
  });

  // ---- enterAdminMode ----
  function enterAdminMode() {
    adminBar.hidden = false;
    setStatus("就绪", "idle");
    enableTextEditing();
    enableImageEditing();
    if (loginBtn) { loginBtn.textContent = "退出"; }
  }

  // ---- leaveAdminMode ----
  function leaveAdminMode() {
    isAdmin = false;
    adminBar.hidden = true;
    textChanges.clear();
    imageChanges.clear();
    disableTextEditing();
    disableImageEditing();
    if (loginBtn) { loginBtn.textContent = "登录"; }
  }

  // ---- openImageDB ----
  function openImageDB() {
    return new Promise(function (resolve, reject) {
      var req = indexedDB.open("AdminGalleryImages", 2);
      req.onupgradeneeded = function (e) {
        var db = e.target.result;
        if (!db.objectStoreNames.contains("images")) {
          db.createObjectStore("images");
        }
      };
      req.onsuccess = function (e) { resolve(e.target.result); };
      req.onerror = function () { reject(new Error("IndexedDB open failed")); };
    });
  }

  // ---- saveImageToDB ----
  function saveImageToDB(key, dataUrl) {
    return openImageDB().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx = db.transaction("images", "readwrite");
        var store = tx.objectStore("images");
        store.put(dataUrl, key);
        tx.oncomplete = function () { resolve(); };
        tx.onerror = function () { reject(new Error("Save to DB failed")); };
      });
    });
  }

  // ---- saveChangesToLocal (shared helper) ----
  function saveChangesToLocal() {
    // Save text-only data (small, always fits in localStorage)
    var textData = {
      text: [],
      artworks: artworks
    };
    textChanges.forEach(function (val, key) {
      textData.text.push({ key: key, value: val });
    });
    try {
      localStorage.setItem("admin-text-changes", JSON.stringify(textData));
    } catch (e) {
      // Even text failed - localStorage might be full or unavailable
      return;
    }

    // Save image data URLs to IndexedDB (much larger capacity)
    if (imageChanges.size > 0) {
      var keys = [];
      var dataUrls = [];
      imageChanges.forEach(function (val, key) {
        keys.push(key);
        dataUrls.push({ key: key, dataUrl: val.dataUrl, newPath: val.newPath, fileName: val.file });
        // Also update artworks source
        if (val.newPath) {
          if (key === "hero-image" && artworks[0]) {
            artworks[0].source = val.newPath;
          } else if (key.startsWith("gallery-")) {
            var idx = parseInt(key.replace("gallery-", ""), 10);
            if (artworks[idx]) artworks[idx].source = val.newPath;
          }
        }
      });
      // Also save a lightweight index of what images are stored
      try {
        localStorage.setItem("admin-image-index", JSON.stringify(dataUrls.map(function (d) {
          return { key: d.key, newPath: d.newPath, fileName: d.file };
        })));
      } catch (e) {}

      // Save each image dataUrl to IndexedDB
      openImageDB().then(function (db) {
        var promises = dataUrls.map(function (item) {
          return saveImageToDB("img_" + item.key, item.dataUrl).catch(function () {});
        });
        Promise.all(promises).catch(function () {});
      }).catch(function () {});
    } else {
      // No image changes - clear old data
      try { localStorage.removeItem("admin-image-index"); } catch (ex) {}
      openImageDB().then(function (db) {
        var tx = db.transaction("images", "readwrite");
        var store = tx.objectStore("images");
        store.clear();
      }).catch(function () {});
    }
  }

  // ---- saveAndExit ----
  function saveAndExit() {
    var hasChanges = textChanges.size > 0 || imageChanges.size > 0;
    if (!hasChanges) {
      leaveAdminMode();
      return;
    }
    saveChangesToLocal();
    setStatus("已保存到本地缓存", "done");
    setTimeout(function () {
      leaveAdminMode();
    }, 600);
  }

  // ---- Logout button ----
  if (logoutBtn) {
    logoutBtn.addEventListener("click", leaveAdminMode);
  }

  // ---- setStatus ----
  function setStatus(msg, type) {
    if (statusEl) {
      statusEl.textContent = msg;
      statusEl.className = "admin-bar__status admin-bar__status--" + (type || "idle");
    }
  }

  // ---- TEXT_FIELDS ----
  var TEXT_FIELDS = [
    { sel: ".hero__copy .eyebrow",            label: "副标题" },
    { sel: "#site-title",                     label: "主标题" },
    { sel: ".hero__intro",                    label: "简介" },
    { sel: ".hero__signature",                label: "签名" },
    { sel: "#gallery-title",                  label: "画廊标题" },
    { sel: ".section-description",            label: "画廊描述" },
    { sel: "#statement-title",                label: "自述标题" },
    { sel: ".statement__body > p:nth-of-type(2)", label: "自述正文1" },
    { sel: ".statement__body > p:nth-of-type(3)", label: "自述正文2" },
    { sel: ".statement__signature",           label: "自述签名" },
    { sel: ".site-footer span:first-child",   label: "页脚标题" },
  ];

  // ---- enableTextEditing ----
  function enableTextEditing() {
    TEXT_FIELDS.forEach(function (item) {
      var el = document.querySelector(item.sel);
      if (!el) return;
      el.contentEditable = "true";
      el.classList.add("admin-editable");
      el.title = "点击编辑 " + item.label;
      if (textChanges.has(item.sel)) el.innerHTML = textChanges.get(item.sel);
      el.addEventListener("input", function () {
        textChanges.set(item.sel, el.innerHTML);
      });
    });
    document.querySelectorAll(".gallery-card__title").forEach(function (el, i) {
      if (el.closest(".admin-editable")) return;
      el.contentEditable = "true";
      el.classList.add("admin-editable");
      el.title = "点击编辑作品标题";
      el.addEventListener("input", function () {
        var newTitle = el.textContent;
        if (artworks[i]) artworks[i].title = newTitle;
        textChanges.set("gallery-title-" + i, newTitle);
      });
    });
  }

  // ---- disableTextEditing ----
  function disableTextEditing() {
    document.querySelectorAll(".admin-editable").forEach(function (el) {
      el.contentEditable = "false";
      el.classList.remove("admin-editable");
      el.title = "";
    });
  }

  // ---- enableImageEditing ----
  function enableImageEditing() {
    wrapImage(document.getElementById("hero-image"), "hero-image");
    document.querySelectorAll(".gallery-card__button img").forEach(function (img, i) {
      wrapImage(img, "gallery-" + i);
    });
    wrapImage(document.getElementById("lightbox-image"), "lightbox-image");
  }

  // ---- disableImageEditing ----
  function disableImageEditing() {
    document.querySelectorAll(".admin-image-wrap").forEach(function (w) {
      var img = w.querySelector("img");
      var p = w.parentNode;
      if (img && p) { p.insertBefore(img, w); p.removeChild(w); }
    });
    document.querySelectorAll(".admin-file-input").forEach(function (inp) { inp.remove(); });
  }

  // ---- wrapImage ----
  function wrapImage(img, key) {
    if (!img || img.closest(".admin-image-wrap")) return;
    var wrap = document.createElement("span");
    wrap.className = "admin-image-wrap";
    img.parentNode.insertBefore(wrap, img);
    wrap.appendChild(img);

    var overlay = document.createElement("span");
    overlay.className = "admin-image-overlay";
    overlay.textContent = "替换图片";
    wrap.appendChild(overlay);

    var input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.className = "admin-file-input";
    input.style.display = "none";
    document.body.appendChild(input);

    input.addEventListener("change", function () {
      var file = input.files && input.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = async function (e) {
        var rawDataUrl = e.target.result;
        // Compress large images to reduce storage and deployment size
        var dataUrl = await compressImage(rawDataUrl);
        img.src = dataUrl;
        var ext = "jpg";
        var newName = "upload_" + Date.now() + "_" + Math.random().toString(36).slice(2,6) + "." + ext;
        var newPath = "assets/photos/" + newName;
        imageChanges.set(key, { file: file.name, dataUrl: dataUrl, newPath: newPath });
        overlay.textContent = file.name + " ?";
        if (key === "hero-image" && artworks[0]) {
          artworks[0].source = newPath;
        } else if (key && key.startsWith("gallery-")) {
          var idx = parseInt(key.replace("gallery-", ""), 10);
          if (artworks[idx]) artworks[idx].source = newPath;
        }
      };
      reader.readAsDataURL(file);
      input.value = "";
    });

    overlay.addEventListener("click", function () { input.click(); });
  }

  // ---- compressImage ----
  // Compresses an image to reduce file size for storage and deployment
  function compressImage(dataUrl, maxWidth, quality) {
    maxWidth = maxWidth || 2000;
    quality = quality || 0.85;
    return new Promise(function (resolve) {
      var img = new Image();
      img.onload = function () {
        var w = img.width;
        var h = img.height;
        // Only compress if image is larger than maxWidth or likely > 2MB
        var dataSize = dataUrl.length * 0.75; // approximate byte size from base64
        if (w <= maxWidth && h <= maxWidth && dataSize < 2 * 1024 * 1024) {
          resolve(dataUrl);
          return;
        }
        // Scale down
        if (w > maxWidth || h > maxWidth) {
          var ratio = Math.min(maxWidth / w, maxWidth / h);
          w = Math.round(w * ratio);
          h = Math.round(h * ratio);
        }
        var canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = function () { resolve(dataUrl); };
      img.src = dataUrl;
    });
  }
  }

  // ---- sha256Hex ----
  function sha256Hex(data) {
    var buf = (typeof data === "string") ? new TextEncoder().encode(data) : new Uint8Array(data);
    return crypto.subtle.digest("SHA-256", buf).then(function (hash) {
      return Array.from(new Uint8Array(hash)).map(function (b) {
        return b.toString(16).padStart(2, "0");
      }).join("");
    });
  }

  // ---- dataUrlToBytes ----
  function dataUrlToBytes(dataUrl) {
    var parts = dataUrl.split(",");
    var raw = atob(parts[1]);
    var arr = new Uint8Array(raw.length);
    for (var i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i);
    return arr;
  }

  // ---- dataUrlExt ----
  function dataUrlExt(dataUrl) {
    var m = dataUrl.match(/^data:image\/(\w+);/);
    return m ? m[1].replace("jpeg", "jpg") : "jpg";
  }

  // ---- fetchSiteFiles ----
  async function fetchSiteFiles() {
    var deployUrl = NF_SITE_URL;
    var resp = await fetch(deployUrl + "/index.html");
    if (!resp.ok) throw new Error("Failed to fetch index.html: " + resp.status);
    var html = await resp.text();
    var files = {};
    files["index.html"] = html;
    return files;
  }

  // ---- applyTextEdits ----
  function applyTextEdits(files) {
    var html = files["index.html"];
    var artworksJson = JSON.stringify(artworks);
    var dataRe = /<script id="artworks-data"[^>]*>[\s\S]*?<\/script>/;
    var dataTag = '<script id="artworks-data" type="application/json">\n' + artworksJson + '\n  </script>';
    html = html.replace(dataRe, dataTag);
    textChanges.forEach(function (newHtml, selector) {
      if (selector.startsWith("gallery-title-")) return;
      var temp = document.createElement("div");
      temp.innerHTML = html;
      var el = temp.querySelector(selector);
      if (el) {
        el.innerHTML = newHtml;
        html = temp.innerHTML;
      }
    });
    if (imageChanges.has("hero-image")) {
      var info = imageChanges.get("hero-image");
      if (info.newPath) {
        html = html.replace(/id="hero-image"[^>]*src="[^"]+"/, 'id="hero-image" src="' + info.newPath + '"');
      }
    }
    files["index.html"] = html;
  }

  // ---- apiFetch ----
  async function apiFetch(path, opts) {
    opts = opts || {};
    var url = "https://api.netlify.com/api/v1/" + path;
    var headers = { "Authorization": "Bearer " + NF_TOKEN };
    if (opts.body && !(opts.contentType === "auto")) {
      headers["Content-Type"] = opts.contentType || "application/json";
    }
    var resp = await fetch(url, {
      method: opts.method || "GET",
      headers: headers,
      body: opts.body || undefined
    });
    if (!resp.ok) {
      var errText = await resp.text();
      throw new Error("API " + resp.status + ": " + errText.slice(0, 200));
    }
    return resp.status === 204 ? null : resp.json();
  }

  // ---- githubApiFetch ----
  async function githubApiFetch(path, opts) {
    opts = opts || {};
    var url = GH_API + path;
    var headers = {
      "Authorization": "Bearer " + GH_TOKEN,
      "Accept": "application/vnd.github+json"
    };
    if (opts.body && typeof opts.body === "string") {
      headers["Content-Type"] = opts.contentType || "application/json";
    }
    var resp = await fetch(url, {
      method: opts.method || "GET",
      headers: headers,
      body: opts.body || undefined
    });
    if (!resp.ok) {
      var errText = await resp.text();
      throw new Error("GitHub API " + resp.status + ": " + errText.slice(0, 300));
    }
    return resp.status === 204 ? null : resp.json();
  }

  // ---- deployToGitHub ----
  // Uploads changed files to GitHub via Git Data API, triggering GitHub Actions deployment
  async function deployToGitHub(files) {
    // files: { "path/in/repo": content_string }

    // Step 1: Get the current head commit SHA and tree SHA
    setStatus("获取仓库状态...", "busy");
    var refData = await githubApiFetch("/repos/" + GH_OWNER + "/" + GH_REPO + "/git/ref/heads/" + GH_BRANCH);
    var headSha = refData.object.sha;
    var commitData = await githubApiFetch("/repos/" + GH_OWNER + "/" + GH_REPO + "/git/commits/" + headSha);
    var baseTreeSha = commitData.tree.sha;

    // Step 2: Create blobs for each file
    setStatus("上传文件到 GitHub...", "busy");
    var treeItems = [];
    var filePaths = Object.keys(files);

    for (var fi = 0; fi < filePaths.length; fi++) {
      var fp = filePaths[fi];
      var content = files[fp];

      // Check if the file is a binary (data URL for images)
      var isImage = typeof content === "string" && content.indexOf("data:image/") === 0;

      if (isImage) {
        // For images, we need to convert data URL to base64 bytes
        var parts = content.split(",");
        var mimeMatch = content.match(/^data:image\/(\w+);/);
        var ext = mimeMatch ? mimeMatch[1].replace("jpeg", "jpg") : "jpg";
        var rawBase64 = parts[1];
        // GitHub's blob API accepts base64 for binary content
        var blobResp = await githubApiFetch("/repos/" + GH_OWNER + "/" + GH_REPO + "/git/blobs", {
          method: "POST",
          body: JSON.stringify({
            content: rawBase64,
            encoding: "base64"
          })
        });
        treeItems.push({
          path: fp,
          mode: "100644",
          type: "blob",
          sha: blobResp.sha
        });
      } else {
        // Text file
        var blobResp = await githubApiFetch("/repos/" + GH_OWNER + "/" + GH_REPO + "/git/blobs", {
          method: "POST",
          body: JSON.stringify({
            content: content,
            encoding: "utf-8"
          })
        });
        treeItems.push({
          path: fp,
          mode: "100644",
          type: "blob",
          sha: blobResp.sha
        });
      }
    }

    // Step 3: Create a new tree
    setStatus("创建提交...", "busy");
    var treeResp = await githubApiFetch("/repos/" + GH_OWNER + "/" + GH_REPO + "/git/trees", {
      method: "POST",
      body: JSON.stringify({
        base_tree: baseTreeSha,
        tree: treeItems
      })
    });
    var newTreeSha = treeResp.sha;

    // Step 4: Create a commit
    var commitMsg = "通过管理面板更新内容于 " + new Date().toLocaleString("zh-CN");
    var commitResp = await githubApiFetch("/repos/" + GH_OWNER + "/" + GH_REPO + "/git/commits", {
      method: "POST",
      body: JSON.stringify({
        message: commitMsg,
        tree: newTreeSha,
        parents: [headSha]
      })
    });
    var newCommitSha = commitResp.sha;

    // Step 5: Update the branch reference
    await githubApiFetch("/repos/" + GH_OWNER + "/" + GH_REPO + "/git/refs/heads/" + GH_BRANCH, {
      method: "PATCH",
      body: JSON.stringify({
        sha: newCommitSha,
        force: false
      })
    });

    return true;
  }

  // ---- gatherChangedImages ----
  // Collects image changes from the current session and returns { "assets/photos/xxx.ext": dataUrl }
  async function gatherChangedImages() {
    var result = {};
    imageChanges.forEach(function (info, key) {
      if (info.newPath && info.dataUrl) {
        result[info.newPath] = info.dataUrl;
      }
    });
    return result;
  }

  // ---- doSaveAndDeploy ----
  async function doSaveAndDeploy() {
    if (deployInProgress) return;
    deployInProgress = true;
    saveBtn.disabled = true;
    saveBtn.textContent = "发布中...";
    setStatus("正在发布...", "busy");

    // Step 1: Save to localStorage first so changes are never lost
    saveChangesToLocal();

    // Step 2: Prepare the payload
    var htmlContent = document.documentElement.outerHTML;
    var cssContent = null;
    var cssLinks = document.querySelectorAll("link[rel=stylesheet]");
    for (var ci = 0; ci < cssLinks.length; ci++) {
      try {
        var cr = await fetch(cssLinks[ci].href);
        if (cr.ok) { cssContent = await cr.text(); break; }
      } catch(e) {}
    }
    if (!cssContent) cssContent = "/* styles not available */";

    // Step 3: Try local deploy server first (port 4174)
    try {
      setStatus("正在通过本地部署服务器发布...", "busy");
      var localResp = await fetch("http://localhost:4174/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          files: { "index.html": htmlContent, "styles.css": cssContent }
        })
      });
      if (localResp.ok) {
        setStatus("发布成功! 等待 GitHub Pages 构建...", "done");
        try { localStorage.removeItem("admin-text-changes"); localStorage.removeItem("admin-image-index"); } catch(e) {}
        openImageDB().then(function(db){
          var tx = db.transaction("images", "readwrite");
          tx.objectStore("images").clear();
        }).catch(function(){});
        await new Promise(function (r) { setTimeout(r, 2000); });
        textChanges.clear();
        imageChanges.clear();
        location.reload();
        return;
      } else {
        throw new Error("本地服务器响应失败");
      }
    } catch (localErr) {
      // Local server unavailable, try GitHub API if token provided
      if (GH_TOKEN) {
        try {
          setStatus("正在部署到 GitHub Pages...", "busy");
          var filesToCommit = {
            "index.html": htmlContent,
            "styles.css": cssContent
          };
          try {
            var changedImages = await gatherChangedImages();
            for (var imgPath in changedImages) {
              filesToCommit[imgPath] = changedImages[imgPath];
            }
          } catch(e) {}
          await deployToGitHub(filesToCommit);
          setStatus("发布成功! 等待 GitHub Pages 构建...", "done");
          try { localStorage.removeItem("admin-text-changes"); localStorage.removeItem("admin-image-index"); } catch(e) {}
          openImageDB().then(function(db){
            var tx = db.transaction("images", "readwrite");
            tx.objectStore("images").clear();
          }).catch(function(){});
          await new Promise(function (r) { setTimeout(r, 2000); });
          textChanges.clear();
          imageChanges.clear();
          location.reload();
          return;
        } catch (err) {
          setStatus("发布失败: " + err.message + "（修改已保存到本地缓存，请运行 node deploy-server.js 部署）", "error");
          saveBtn.disabled = false;
          saveBtn.textContent = "重试发布";
          deployInProgress = false;
          return;
        }
      } else {
        // No deploy server and no GitHub token - save to cache only
        setStatus("已保存到本地缓存（部署服务器未运行，请运行 node deploy-server.js）", "done");
        saveBtn.disabled = false;
        saveBtn.textContent = "保存并发布";
        deployInProgress = false;
        return;
      }
    };

      // Step 2: Restore artworks array and gallery card titles
      if (textSaved.artworks && Array.isArray(textSaved.artworks)) {
        artworks = textSaved.artworks;
        document.querySelectorAll(".gallery-card__title").forEach(function (el, i) {
          if (artworks[i] && artworks[i].title) el.textContent = artworks[i].title;
        });
      }

      // Step 3: Update images from artworks source paths (for non-dataUrl paths)
      var heroImg = document.getElementById("hero-image");
      if (heroImg && artworks && artworks[0] && artworks[0].source) {
        var defaultHero = "assets/photos/01.svg";
        if (artworks[0].source !== defaultHero) {
          heroImg.src = artworks[0].source;
        }
      }
      document.querySelectorAll(".gallery-card__button img").forEach(function (img, i) {
        if (artworks && artworks[i] && artworks[i].source) {
          var defaultSrc = "assets/photos/" + (i < 9 ? "0" : "") + (i + 1) + ".svg";
          if (artworks[i].source !== defaultSrc) {
            img.src = artworks[i].source;
          }
        }
      });
    } catch (e) {}
  }

  // ---- loadImagesFromDB (async) ----
  function loadImagesFromDB() {
    openImageDB().then(function (db) {
      var tx = db.transaction("images", "readonly");
      var store = tx.objectStore("images");
      var getAll = store.getAll();
      var getAllKeys = store.getAllKeys();
      getAllKeys.onsuccess = function () {
        var keys = getAllKeys.result || [];
        var dataUrls = getAll.result || [];
        if (keys.length === 0) return;
        for (var i = 0; i < keys.length; i++) {
          var fullKey = keys[i];
          var dataUrl = dataUrls[i];
          if (!fullKey || !dataUrl) continue;
          // Keys stored as "img_hero-image", "img_gallery-0", etc.
          var imgKey = typeof fullKey === "string" && fullKey.startsWith("img_") ? fullKey.substring(4) : fullKey;
          var imgEl = null;
          if (imgKey === "hero-image") {
            imgEl = document.getElementById("hero-image");
          } else if (imgKey === "lightbox-image") {
            imgEl = document.getElementById("lightbox-image");
          } else if (imgKey && typeof imgKey === "string" && imgKey.startsWith("gallery-")) {
            var idx = parseInt(imgKey.replace("gallery-", ""), 10);
            if (!isNaN(idx)) imgEl = document.querySelectorAll(".gallery-card__button img")[idx];
          }
          if (imgEl && imgEl.src !== dataUrl) {
            imgEl.src = dataUrl;
          }
        }
      };
    }).catch(function () {});
  }
  applySavedChanges();})();