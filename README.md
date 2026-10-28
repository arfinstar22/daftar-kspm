# Formulir Pendaftaran Pengurus KSPM 2026

Website formulir satu halaman untuk Open Recruitment Pengurus KSPM
Universitas Dayanu Ikhsanuddin 2026. Statis murni (HTML + CSS + JS),
tanpa server, tanpa build step.

## Cara menjalankan

Buka `index.html` langsung di browser — atau sajikan folder ini sebagai
situs statis:

```bash
cd newProjek
python3 -m http.server 8080
# buka http://localhost:8080
```

Mode pratinjau (lewati batas periode pendaftaran, untuk testing):

```
http://localhost:8080/?preview=1
```

## Cara deploy gratis (pilih satu)

- **GitHub Pages / Netlify / Vercel / Cloudflare Pages** — upload folder ini.
- Tidak ada environment variable / backend yang perlu dikonfigurasi.

## Mengganti nomor admin WhatsApp

Ubah satu baris di `app.js`:

```js
var ADMIN_WA = "628136170550"; // Angle
```

## Logo resmi

Sudah terpasang (28 Okt 2026, latar hitam dihapus, 512px) dan **ditanam
langsung di `index.html` (base64)** agar tampil di semua cara buka file —
file di `assets/` disimpan sebagai master cadangan:

- `assets/logo-unidayan.png` — logo Universitas Dayanu Ikhsanuddin
- `assets/logo-kspm.png` — logo KSPM / Galeri Investasi

Untuk mengganti: timpa kedua file master, lalu jalankan ulang skrip
embed (atau kabari saya).

## Struktur

```
index.html   struktur + copy
styles.css   token warna, layout, ticker, wizard
app.js       validasi, autosave (localStorage), format pesan WA
assets/      logo resmi dari panitia (opsional)
```

## Alur data & privasi

Isian tersimpan otomatis di browser pendaftar (`localStorage`, kunci
`kspm2026-form-v1`). Saat tombol diklik, browser membuka
`https://wa.me/<admin>?text=<pesan>` — data transit browser → WhatsApp,
tidak lewat server manapun.
