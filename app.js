/* Formulir Pendaftaran Pengurus KSPM 2026 — logika client-side (tanpa server) */
(function () {
  "use strict";

  var ADMIN_WA = "628136170550"; // Angle — 0813-6170-550
  var STORE_KEY = "kspm2026-form-v1";
  var OPEN_DATE = new Date(2026, 9, 28, 0, 0, 0);   // 28 Okt 2026
  var CLOSE_DATE = new Date(2026, 10, 11, 23, 59, 59); // 11 Nov 2026
  var PREVIEW = /[?&]preview=1/.test(location.search);

  var step = 1;
  var TOTAL = 5;
  var STEP_NAMES = ["", "Data diri", "Akademik", "Domisili & kontak", "Komitmen", "Periksa & kirim"];

  /* ---------- util ---------- */
  function $(id) { return document.getElementById(id); }
  function toast(msg) {
    var t = $("toast");
    t.textContent = msg;
    t.classList.remove("hidden");
    clearTimeout(t._h);
    t._h = setTimeout(function () { t.classList.add("hidden"); }, 3200);
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function val(name) {
    var el = document.querySelector('[name="' + name + '"]');
    return el ? el.value.trim() : "";
  }
  function radioVal(name) {
    var el = document.querySelector('input[name="' + name + '"]:checked');
    return el ? el.value : "";
  }
  function setErr(name, msg) {
    var e = $("err-" + name);
    if (e) e.textContent = msg || "";
    var input = document.querySelector('[name="' + name + '"]');
    var wrap = input ? input.closest(".field") : null;
    if (wrap) wrap.classList.toggle("invalid", !!msg);
    return !msg;
  }

  /* ---------- state + autosave ---------- */
  function collect() {
    return {
      nama: val("nama"), nim: val("nim"), jk: radioVal("jk"),
      prodi: val("prodi"), semester: val("semester"),
      status_aktif: $("status_aktif").checked, spm1: radioVal("spm1"),
      alamat: val("alamat"), wa: val("wa"), email: val("email"),
      ig: val("ig"), sumber: val("sumber"),
      pengalaman: val("pengalaman"), divisi: radioVal("divisi"),
      kendala: val("kendala"),
      komitmen: $("komitmen").checked, jujur: $("jujur").checked,
      reg: localStorage.getItem(STORE_KEY + "-reg") || ""
    };
  }
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(collect())); } catch (e) {}
  }
  function restore() {
    var raw = null;
    try { raw = localStorage.getItem(STORE_KEY); } catch (e) {}
    if (!raw) return;
    var d;
    try { d = JSON.parse(raw); } catch (e) { return; }
    Object.keys(d).forEach(function (k) {
      if (k === "reg") return;
      var els = document.querySelectorAll('[name="' + k + '"]');
      if (!els.length) return;
      if (els[0].type === "checkbox") { els[0].checked = !!d[k]; }
      else if (els[0].type === "radio") {
        Array.prototype.forEach.call(els, function (r) { r.checked = (r.value === d[k]); });
      } else { els[0].value = d[k]; }
    });
  }
  function regNum() {
    var r = localStorage.getItem(STORE_KEY + "-reg");
    if (!r) {
      r = "KSPM26-" + Math.floor(1000 + Math.random() * 9000);
      try { localStorage.setItem(STORE_KEY + "-reg", r); } catch (e) {}
    }
    return r;
  }

  /* ---------- validasi ---------- */
  function normalizeWA(raw) {
    var d = String(raw).replace(/\D/g, "");
    if (/^0/.test(d)) d = "62" + d.slice(1);
    return d;
  }
  function validStep(n) {
    var ok = true;
    if (n === 1) {
      ok = setErr("nama", val("nama").length >= 3 ? "" : "Isi nama lengkap (min. 3 huruf).") && ok;
      ok = setErr("nim", /^[0-9]{8,12}$/.test(val("nim")) ? "" : "NIM harus 8–12 digit angka.") && ok;
      ok = setErr("jk", radioVal("jk") ? "" : "Pilih jenis kelamin.") && ok;
    }
    if (n === 2) {
      ok = setErr("prodi", val("prodi").length >= 3 ? "" : "Isi program studi/jurusan.") && ok;
      ok = setErr("semester", val("semester") ? "" : "Pilih semester.") && ok;
      ok = setErr("status_aktif", $("status_aktif").checked ? "" : "Centang pernyataan mahasiswa aktif.") && ok;
      ok = setErr("spm1", radioVal("spm1") ? "" : "Pilih status sertifikat SPM 1.") && ok;
    }
    if (n === 3) {
      ok = setErr("alamat", val("alamat") ? "" : "Isi alamat tempat tinggal di Baubau.") && ok;
      var w = normalizeWA(val("wa"));
      ok = setErr("wa", /^62[0-9]{9,13}$/.test(w) ? "" : "Nomor WA tidak valid (cth: 0813xxxxxxx).") && ok;
      ok = setErr("email", /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val("email")) ? "" : "Format email tidak valid.") && ok;
    }
    if (n === 4) {
      ok = setErr("divisi", radioVal("divisi") ? "" : "Pilih divisi yang diminati.") && ok;
      ok = setErr("komitmen", $("komitmen").checked ? "" : "Centang kesediaan mengikuti seleksi & kegiatan.") && ok;
      ok = setErr("jujur", $("jujur").checked ? "" : "Centang pernyataan kejujuran data.") && ok;
    }
    return ok;
  }

  /* ---------- navigasi ---------- */
  function show(n, scroll) {
    step = n;
    document.querySelectorAll(".panel").forEach(function (p) {
      p.classList.toggle("hidden", +p.dataset.panel !== n);
    });
    document.querySelectorAll("#stepsList li").forEach(function (li) {
      var s = +li.dataset.step;
      li.classList.toggle("current", s === n);
      li.classList.toggle("done", s < n);
    });
    $("stepLabel").textContent = "Langkah " + n + " dari " + TOTAL + " · " + STEP_NAMES[n];
    $("btnBack").style.visibility = n === 1 ? "hidden" : "visible";
    $("btnNext").classList.toggle("hidden", n === TOTAL);
    if (n === TOTAL) renderReview();
    if (scroll !== false) {
      var panel = document.querySelector('.panel[data-panel="' + n + '"]');
      if (panel) panel.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  /* ---------- ringkasan ---------- */
  function dash(v) { return v ? v : "-"; }
  function renderReview() {
    var d = collect();
    d.reg = regNum();
    $("regNum").textContent = d.reg;
    var rows = [
      ["DATA DIRI", ""],
      ["Nama", d.nama], ["NIM", d.nim], ["Jenis kelamin", d.jk],
      ["AKADEMIK", ""],
      ["Program studi", d.prodi], ["Semester", d.semester],
      ["Mahasiswa aktif", d.status_aktif ? "Ya" : "-"], ["Sertifikat SPM 1", d.spm1],
      ["DOMISILI & KONTAK", ""],
      ["Alamat di Baubau", d.alamat], ["No. WA", normalizeWA(d.wa)],
      ["Email", d.email], ["Instagram", dash(d.ig)], ["Tahu info dari", dash(d.sumber)],
      ["KOMITMEN", ""],
      ["Pengalaman organisasi", dash(d.pengalaman)], ["Divisi diminati", d.divisi],
      ["Kendala/jadwal", dash(d.kendala)],
      ["No. registrasi", d.reg]
    ];
    $("reviewCard").innerHTML =
      '<div class="rc-head"><h3>Kartu Pendaftaran — Pengurus KSPM 2026</h3>' +
      "<p>" + esc(d.reg) + " · Univ. Dayanu Ikhsanuddin</p></div><dl>" +
      rows.map(function (r) {
        if (r[1] === "") return '<div class="rc-sec">' + esc(r[0]) + "</div>";
        return '<div class="rc-row"><dt>' + esc(r[0]) + "</dt><dd>" + esc(r[1]) + "</dd></div>";
      }).join("") + "</dl>";
  }

  /* ---------- pesan WA ---------- */
  function row(label, value) {
    return String(label).padEnd(17, " ") + ": " + value;
  }
  function buildMessage(d) {
    var B = [];
    B.push("DATA DIRI");
    B.push(row("Nama", d.nama));
    B.push(row("NIM", d.nim));
    B.push(row("Jenis kelamin", d.jk));
    B.push(row("Prodi", d.prodi + " (Semester " + d.semester + ")"));
    B.push(row("Status", "Mahasiswa Aktif"));
    B.push("");
    B.push("DOMISILI & KONTAK");
    B.push(row("Alamat (Baubau)", d.alamat));
    B.push(row("No. WA", normalizeWA(d.wa)));
    B.push(row("Email", d.email));
    B.push(row("Instagram", d.ig || "-"));
    B.push(row("Info dari", d.sumber || "-"));
    B.push("");
    B.push("KELENGKAPAN");
    B.push(row("Sertifikat SPM 1", d.spm1));
    B.push(row("Pengalaman", d.pengalaman || "-"));
    B.push(row("Divisi diminati", d.divisi));
    if (d.kendala) B.push(row("Kendala", d.kendala));
    B.push("");
    B.push("KOMITMEN");
    B.push(row("Ikut seleksi", "Ya"));
    B.push(row("Data jujur", "Ya"));
    B.push(row("No. registrasi", d.reg));
    return "*PENDAFTARAN PENGURUS KSPM 2026*\n" +
      "Galeri Investasi BEI \u2014 Univ. Dayanu Ikhsanuddin\n" +
      "```\n" + B.join("\n") + "\n```\n" +
      "_Pendaftaran tidak dipungut biaya apapun._";
  }

  var sending = false;
  function sendWA() {
    if (sending) return;
    if (![1, 2, 3, 4].every(validStep)) {
      toast("Masih ada isian yang belum valid — periksa kembali langkah 1–4.");
      return;
    }
    sending = true;
    var d = collect();
    d.reg = regNum();
    d.wa = normalizeWA(d.wa);
    save();
    var url = "https://wa.me/" + ADMIN_WA + "?text=" + encodeURIComponent(buildMessage(d));
    window.open(url, "_blank", "noopener");
    $("sentOk").classList.remove("hidden");
    toast("Chat WhatsApp terbuka — tekan kirim di WhatsApp ya.");
    setTimeout(function () { sending = false; }, 3000);
  }

  /* ---------- kartu gambar (canvas, dilampirkan manual di WA bila perlu) ---------- */
  function wrapLines(x, text, maxW) {
    var words = String(text).split(/\s+/), lines = [], cur = "";
    words.forEach(function (w) {
      var t = cur ? cur + " " + w : w;
      if (x.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; }
      else cur = t;
    });
    if (cur) lines.push(cur);
    return lines;
  }
  async function makeCardBlob(d) {
    try { await document.fonts.ready; } catch (e) {}
    var W = 1080, H = 1640, M = 80;
    var cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    var x = cv.getContext("2d");
    x.fillStyle = "#FAF6EE"; x.fillRect(0, 0, W, H);
    x.fillStyle = "#5C0A0A"; x.fillRect(0, 0, W, 330);
    x.fillStyle = "#C9A227"; x.fillRect(0, 330, W, 10);
    document.querySelectorAll(".logo-slot img").forEach(function (img, i) {
      try { if (img.complete && img.naturalWidth) x.drawImage(img, i === 0 ? 70 : 880, 95, 130, 130); } catch (e) {}
    });
    x.textAlign = "center";
    x.fillStyle = "#FFFFFF"; x.font = "700 68px Fraunces, Georgia, serif";
    x.fillText("KARTU PENDAFTARAN", W / 2, 140);
    x.fillStyle = "#E7D48A"; x.font = "600 44px Fraunces, Georgia, serif";
    x.fillText("Pengurus KSPM 2026", W / 2, 195);
    x.fillStyle = "#F3E3C8"; x.font = "26px 'IBM Plex Sans', sans-serif";
    x.fillText("Galeri Investasi BEI — Univ. Dayanu Ikhsanuddin", W / 2, 245);
    x.textAlign = "left";
    var y = 430;
    function section(t) {
      x.font = "700 34px 'IBM Plex Sans', sans-serif"; x.fillStyle = "#5C0A0A";
      x.fillText(t, M, y); y += 14;
      x.fillStyle = "#C9A227"; x.fillRect(M, y, 64, 6); y += 46;
    }
    function field(label, value) {
      x.font = "700 30px 'IBM Plex Sans', sans-serif";
      var lw = x.measureText(label + ": ").width;
      x.fillStyle = "#5C0A0A";
      x.fillText(label + ":", M, y);
      x.font = "30px 'IBM Plex Sans', sans-serif"; x.fillStyle = "#1E1410";
      var lines = wrapLines(x, value, W - M * 2 - lw);
      x.fillText(lines[0], M + lw, y);
      for (var i = 1; i < lines.length; i++) { y += 46; x.fillText(lines[i], M, y); }
      y += 52;
    }
    section("DATA DIRI");
    field("Nama", d.nama);
    field("NIM", d.nim);
    field("Jenis kelamin", d.jk);
    field("Prodi", d.prodi + " (Semester " + d.semester + ")");
    field("Status", "Mahasiswa Aktif");
    y += 10;
    section("DOMISILI & KONTAK");
    field("Alamat", d.alamat);
    field("No. WA", normalizeWA(d.wa));
    field("Email", d.email);
    field("Instagram", d.ig || "-");
    field("Info dari", d.sumber || "-");
    y += 10;
    section("KELENGKAPAN");
    field("SPM 1", d.spm1);
    field("Pengalaman", d.pengalaman || "-");
    field("Divisi", d.divisi);
    if (d.kendala) field("Kendala", d.kendala);
    y += 10;
    section("KOMITMEN");
    field("Ikut seleksi", "Ya");
    field("Data jujur", "Ya");
    x.fillStyle = "#C9A227"; x.fillRect(M, H - 200, W - M * 2, 4);
    x.textAlign = "center";
    x.font = "700 58px Fraunces, Georgia, serif"; x.fillStyle = "#5C0A0A";
    x.fillText(d.reg, W / 2, H - 120);
    x.font = "24px 'IBM Plex Sans', sans-serif"; x.fillStyle = "#6B5D4F";
    x.fillText("Pendaftaran tidak dipungut biaya apapun", W / 2, H - 60);
    return new Promise(function (res) { cv.toBlob(res, "image/png"); });
  }
  async function shareCard() {
    toast("Membuat kartu gambar…");
    try {
      var d = collect(); d.reg = regNum();
      var blob = await makeCardBlob(d);
      if (!blob) { toast("Gagal membuat gambar."); return; }
      var file = new File([blob], "kartu-" + d.reg + ".png", { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: "Kartu Pendaftaran KSPM 2026" });
      } else {
        var a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = file.name;
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(function () { URL.revokeObjectURL(a.href); }, 5000);
        toast("Kartu tersimpan — lampirkan manual di chat WA bila perlu.");
      }
    } catch (e) {
      if (!e || e.name !== "AbortError") toast("Gagal membuat gambar.");
    }
  }

  /* ---------- periode ---------- */
  function gate() {
    if (PREVIEW) { toast("Mode pratinjau (?preview=1) — batas periode dinonaktifkan."); return true; }
    var now = new Date();
    if (now < OPEN_DATE || now > CLOSE_DATE) {
      $("app").classList.add("hidden");
      $("closedBox").classList.remove("hidden");
      if (now < OPEN_DATE) $("closedMsg").textContent = "Pendaftaran dibuka 28 Oktober 2026.";
      else $("closedMsg").textContent = "Pendaftaran telah ditutup pada 11 November 2026. Hubungi admin untuk info lebih lanjut.";
      return false;
    }
    return true;
  }

  /* ---------- init ---------- */
  function init() {
    // isi semester 1–14
    var sem = $("semester");
    for (var i = 1; i <= 14; i++) {
      var o = document.createElement("option");
      o.value = String(i); o.textContent = "Semester " + i;
      sem.appendChild(o);
    }
    restore();
    // gandakan ticker agar loop mulus
    var track = $("tickerTrack");
    track.innerHTML += track.innerHTML;
    // autosave
    $("regForm").addEventListener("input", save);
    $("regForm").addEventListener("change", save);
    $("btnNext").addEventListener("click", function () {
      if (validStep(step)) { show(step + 1); save(); }
      else toast("Lengkapi isian yang bertanda merah dulu.");
    });
    $("btnBack").addEventListener("click", function () { if (step > 1) show(step - 1); });
    $("btnWA").addEventListener("click", sendWA);
    $("btnCard").addEventListener("click", shareCard);
    document.querySelectorAll("#stepsList li").forEach(function (li) {
      li.style.cursor = "pointer";
      li.addEventListener("click", function () {
        var target = +li.dataset.step;
        var okSoFar = true;
        for (var s = 1; s < target; s++) { if (!validStep(s)) { okSoFar = false; break; } }
        if (okSoFar) show(target);
        else toast("Selesaikan langkah sebelumnya dulu.");
      });
    });
    if (!gate()) return;
    show(1, false);
  }

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", init)
    : init();
})();
