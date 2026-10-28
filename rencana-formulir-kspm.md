# Rencana Website Formulir Pendaftaran — Open Recruitment Pengurus KSPM Unidayan 2026

> Status: **DISETUJUI user (28 Okt 2026)** — keputusan dikunci, pembangunan dimulai.
> Terakhir diperbarui: 28 Oktober 2026 (hari pertama pendaftaran dibuka).

---

## 1. Ringkasan

Membangun **website formulir pendaftaran satu halaman** ("mirip Google Form, tapi mewah dan lebih canggih") untuk Open Recruitment Pengurus KSPM 2026. Setelah pendaftar mengisi semua isian dan menekan tombol kirim:

1. **Opsi A (utama): kirim via WhatsApp admin** — data diformat jadi pesan teks yang rapih, dibuka di chat WA admin, tinggal tekan kirim.
2. **Opsi B (pendamping): unduh/cetak PDF "Kartu Pendaftaran"** — dokumen A4 berdesain sebagai bukti pendaftaran.

Tidak ada server/database — semua berjalan di browser (client-side), jadi gratis di-hosting di mana saja dan data langsung sampai ke tangan admin via WA.

---

## 2. Fakta dari poster (sumber konten resmi)

| Item | Isi |
|---|---|
| Kegiatan | Open Recruitment **Pengurus** KSPM **Universitas Dayanu Ikhsanuddin 2026** |
| KSPM | Kelompok Studi Pasar Modal — organisasi pasar modal di bawah naungan **Galeri Investasi Bursa Efek Indonesia Unidayan** |
| Syarat | Mahasiswa **Aktif**; Sertifikat **SPM 1 (opsional)**; siap mengikuti **kegiatan KSPM**; punya **ketertarikan & minat**; mampu **bekerja sama**; **komunikasi** baik; sikap **positif & proaktif** |
| Info | 0822-7881-3449 (Jen) · 0813-6170-550 (Angle) |
| Periode | **28 Oktober 2026 – 11 November 2026** |
| Biaya | **Gratis** ("tidak dipungut biaya apapun") |

Nomor WA ternormalisasi (format internasional untuk link `wa.me`):

- Jen: `6282278813449`
- Angle: `628136170550`

---

## 3. Target pengguna & konteks pakai

- **Siapa:** mahasiswa Unidayan semua jurusan, mayoritas mendaftar lewat **HP Android** + browser Chrome.
- **Kondisi:** sinyal kampus fluktuatif → halaman harus **ringan, cepat, tetap bisa dipakai walau koneksi putus** saat mengisi (data tersimpan otomatis di browser/`localStorage`).
- **Habbit:** begitu selesai, mereka expect *"kirim"* seperti Google Form — di sini tombolnya membuka WhatsApp dengan pesan yang sudah jadi.

---

## 4. Alur pendaftaran (langkah berurutan)

Form dibagi **5 langkah wizard** (penomoran di sini legitimate karena memang sekuens, bukan hiasan):

```
[1 Data Diri] → [2 Akademik] → [3 Domisili & Kontak] → [4 Komitmen] → [5 Periksa & Kirim]
```

1. **Data Diri** — nama lengkap, NIM, jenis kelamin.
2. **Akademik** — program studi/jurusan, fakultas (otomatis mengikuti jurusan bila bisa), semester/angkatan, status mahasiswa aktif (checkbox), sertifikat SPM 1: sudah / belum (radio).
3. **Domisili & Kontak** — alamat tinggal di Baubau, nomor WA aktif, email aktif, akun Instagram (opsional), darimana tahu info ini (dropdown: teman, Instagram, poster kampus, dll — untuk evaluasi panitia).
4. **Komitmen** — pengalaman organisasi (textarea singkat), divisi/bidang yang diminati (Edukasi/Kegiatan/Kominfo), kendala/jadwal (opsional), kesediaan mengikuti seluruh rangkaian seleksi & kegiatan (checkbox wajib), pernyataan kejujuran data (checkbox wajib).
5. **Periksa & Kirim** — ringkasan semua isian dalam format kartu → tombol tunggal **"Kirim via WhatsApp (Angle)"** yang membuka chat admin dengan pesan jadi yang tinggal dikirim.

Aturan navigasi: tidak bisa lanjut sebelum langkah saat ini valid; tombol "kembali" tidak menghapus isian; progress tersimpan otomatis (refresh tidak hilang).

---

## 5. Daftar isian final

### 5.1 Wajib

| # | Isian | Tipe | Validasi |
|---|---|---|---|
| 1 | Nama lengkap (sesuai KTM/KTP) | teks | min. 3 huruf, huruf + titik secukupnya |
| 2 | NIM | angka | 8–12 digit, angka saja |
| 3 | Program studi / jurusan | dropdown + "Lainnya" | wajib pilih/isi |
| 4 | Semester saat ini | dropdown 1–14 / angka | 1–14 |
| 5 | Status mahasiswa aktif | checkbox | wajib centang |
| 6 | Alamat tempat tinggal di Baubau | textarea | bebas diisi apa saja, wajib diisi |
| 7 | Nomor WhatsApp aktif | tel | dinormalisasi ke `62…`, 10–15 digit |
| 8 | Email aktif | email | format email valid |
| 9 | Sertifikat SPM 1 | radio: Sudah / Belum | wajib pilih (sesuai poster: opsional dimiliki, tapi statusnya wajib diisi) |
| 10 | Kesediaan ikut seleksi & kegiatan | checkbox | wajib centang |
| 11 | Pernyataan kejujuran data | checkbox | wajib centang |

### 5.2 Opsional (disarankan — nilai tambah "lebih canggih" dari Google Form)

| # | Isian | Tipe | Alasan |
|---|---|---|---|
| 13 | Jenis kelamin | radio | kebutuhan data panitia & sertifikat |
| 14 | Pengalaman organisasi | textarea | bahan seleksi (boleh kosong → tulis "-") |
| 15 | Divisi/bidang diminati | radio: Edukasi / Kegiatan / Kominfo | wajib pilih satu |
| 16 | Akun Instagram | teks | kemudahan verifikasi & publikasi |
| 17 | Darimana tahu info rekrutmen | dropdown | evaluasi channel promosi |
| 18 | Kendala/jadwal yang perlu diketahui panitia | textarea | empati operasional (kuliah malam, kerja, dll) |

### 5.3 Sengaja TIDAK ada di v1 (dan alasannya)

- **Upload foto/KTM/berkas** — file tidak bisa dikirim lewat link `wa.me` (WhatsApp tidak menerima lampiran via URL). Solusi v1: isian "link Google Drive berkas (opsional)". Upload file butuh server → masuk backlog v2.
- **Login/akun** — tidak perlu; satu perangkat = satu pendaftaran, plus proteksi double-submit via sidik lokal.

---

## 6. Format pesan WhatsApp (rapih, siap kirim)

Saat tombol diklik, browser membuka:

```
https://wa.me/628136170550?text=<pesan ter-encode>
```

Template pesan: judul tebal + blok monospace berisi seluruh data dengan label
rata kiri (padding 17 karakter), lalu catatan miring. Di dalam blok monospace,
spasi selalu sejajar dan angka/email **tidak** diubah WhatsApp menjadi link.
**Tujuan tunggal: Angle (`628136170550`)** — satu tombol.

    *PENDAFTARAN PENGURUS KSPM 2026*
    Galeri Investasi BEI — Univ. Dayanu Ikhsanuddin
    ```
    DATA DIRI
    Nama             : {nama}
    NIM              : {nim}
    Jenis kelamin    : {jk}
    Prodi            : {prodi} (Semester {semester})
    Status           : Mahasiswa Aktif

    DOMISILI & KONTAK
    Alamat (Baubau)  : {alamat}
    No. WA           : {wa}
    Email            : {email}
    Instagram        : {ig}
    Info dari        : {sumber}

    KELENGKAPAN
    Sertifikat SPM 1 : {spm1}
    Pengalaman       : {pengalaman}
    Divisi diminati  : {divisi}
    Kendala          : {kendala, bila ada}

    KOMITMEN
    Ikut seleksi     : Ya
    Data jujur       : Ya
    No. registrasi   : {reg}
    ```
    _Pendaftaran tidak dipungut biaya apapun._

Catatan teknis: seluruh pesan di-`encodeURIComponent`; panjang pesan tipikal < 1.500 karakter (jauh di bawah batas WA).

---

## 7. PDF "Kartu Pendaftaran" — DIBATALKAN

> **Keputusan user (28 Okt 2026): tidak ada PDF.** Pengiriman hanya berupa teks WhatsApp yang rapih. Seksi ini disimpan sebagai arsip; bangun hanya layar "Periksa & Kirim" (ringkasan kartu di web, tanpa unduh/cetak).

- **Metode v1: print stylesheet** (`window.print()` + CSS `@media print` / `@page A4`). Alasan: tanpa library, hasil vektor tajam, tombol browser "Save as PDF" sudah familiar. Tombol di web: **"Unduh / Cetak Kartu PDF"**.
- **Isi kartu:** kop (logo Unidayan + KSPM — *butuh file logo dari panitia, sementara placeholder*), judul "Kartu Pendaftaran Pengurus KSPM 2026", nomor registrasi otomatis (`KSPM26-XXXX`), semua data pendaftar, tanggal kirim, tanda tangan digital (nama terang), QR kecil berisi ringkasan teks (opsional, library ringan).
- **Alternatif** (bila diminta): `html2canvas` + `jsPDF` untuk unduh langsung tanpa dialog print — plus ~300 KB, layout piksel (kurang tajam). Default tetap print-CSS.

---

## 8. Tech stack yang diusulkan

**Statis murni: HTML + CSS + JavaScript vanilla, tanpa build step, tanpa backend.**

- Satu folder proyek, bisa dibuka langsung & di-host gratis (GitHub Pages / Netlify / Vercel / Cloudflare Pages).
- Tidak ada ketergantungan npm → tidak menambah beban storage (sesuai misi bersih-bersih kemarin).
- `localStorage` untuk autosave; validasi + format pesan + print-CSS semua client-side.
- Dependensi eksternal: **Google Fonts saja** (bisa di-self-host bila perlu offline penuh).

Alternatif yang ditolak: React/Vite (overkill untuk 1 form), Google Forms embed (tidak "mewah"), backend + database (butuh biaya/server & kelola data pribadi).

---

## 9. Design system (identitas visual)

Diturunkan dari subject matter-nya — **pasar modal Indonesia**, bukan template form generik. Poster sendiri yang menentukan arah (marun + emas + krem), jadi brief menang.

### 9.1 Warna (token)

| Token | Hex | Peran |
|---|---|---|
| `--oxblood` | `#5C0A0A` | primer: header, tombol utama, aksen kuat (marun poster) |
| `--idx-red` | `#C8102E` | aksen urgensi/CTA hover (merah IDX) |
| `--champagne` | `#C9A227` | emas: garis, ikon, nomor registrasi, detail mewah |
| `--ivory` | `#FAF6EE` | latar kertas (krem poster) |
| `--ink` | `#1E1410` | teks utama |
| `--bull-green` | `#1E7A4C` | hanya untuk status sukses/"IHSG naik" (hijau market) |

Mode gelap otomatis mengikuti tema MacTahoe yang sudah terpasang (`prefers-color-scheme`), dengan oxblood tetap sebagai jangkar.

### 9.2 Tipografi

- **Display:** *Fraunces* (serif optikal, karakter editorial-keuangan; untuk judul & angka besar) — bukan Playfair yang pasaran.
- **Body/UI:** *IBM Plex Sans* (lahir dari dunia data/keuangan; angka tabular untuk NIM & nomor HP agar sejajar).
- Skala mengikuti *Elements of Typographic Style*; panjang baris < 80 karakter; **sentence case** di seluruh label (bukan ALL-CAPS).

### 9.3 Layout & momen khas

- **Hero = pita ticker berjalan** (data penutupan terakhir per 28 Okt 2026, sumber: Yahoo Finance — IHSG 5.174 −1,75%; BBCA +3,57%; BBRI −1,72%; BMRI −2,32%; TLKM −4,21%; ASII −0,65%; GOTO flat; dibuat dengan SVG murni + animasi CSS). Ini **satu-satunya elemen memorable**; sisanya disiplin dan tenang.
- **Form = kolom ledger tunggal** seperti onboarding sekuritas (bukan grid kartu SaaS seragam). Desktop: rel kiri berisi ticker + progres langkah; HP: progres kompak di atas.
- Wireframe desktop:

```
+----------------------------------------------------------+
| [logo] OPEN RECRUITMENT KSPM 2026        [ID] [Periode]  |
| ~~~ ticker berjalan: BBCA +1,2%  BBRI +0,8%  IHSG ... ~~~ |
+----------+-----------------------------------------------+
| PROGRES  |  Langkah 2 dari 5 — Akademik                  |
| 1 ●━━    |  [ Program studi .............. v ]            |
| 2 ◉━━    |  [ Semester ................... v ]            |
| 3 ○      |  [x] Saya mahasiswa aktif                     |
| ...      |  ( ) Sudah  ( ) Belum — Sertifikat SPM 1      |
|          |             [Kembali]  [Lanjut →]              |
+----------+-----------------------------------------------+
```

- Wireframe HP: sama, rel progres jadi bilah tipis di bawah ticker.
- **Motion:** satu sekuens orkestrasi saat load (ticker + reveal), selebihnya hanya motion yang menjawab aksi (pindah langkah, validasi, sukses). Hormati `prefers-reduced-motion`.

### 9.4 Uji anti-generik (review sebelum bangun)

- Bukan krem + terracotta default → krem kita ivory kertas + oxblood sesuai poster, aksen emas bukan terracotta.
- Bukan SaaS-card kit → satu kolom ledger, radius & bayangan dibedakan per hierarki.
- Bukan broadsheet koran → tidak ada hairline di mana-mana; garis emas hanya sebagai pemisah makna (kop kartu, ringkasan akhir).
- Tidak ada label eyebrow ALL-CAPS di tiap heading; tidak ada penomoran kecuali progres langkah (sekuens nyata).

---

## 10. Struktur file proyek (di `newProjek/`)

```
newProjek/
├── rencana-formulir-kspm.md   # file ini
├── index.html                 # struktur + copy
├── styles.css                 # token, layout, print-CSS PDF
├── app.js                     # wizard, validasi, autosave, format WA
├── assets/
│   ├── logo-unidayan.png      # ⬅ minta ke panitia
│   ├── logo-kspm.png          # ⬅ minta ke panitia
│   └── ticker.svg             # candlestick & ornamen (dibuat sendiri)
└── README.md                  # cara pakai & deploy (5 menit)
```

---

## 11. Validasi, edge case & privasi

- NIM: hanya digit, 8–12; nomor WA: strip spasi/titik/dash, paksa prefix `62`; email: regex standar.
- Tombol WA nonaktif sampai semua wajib valid + kedua checkbox komitmen dicentang.
- Cegah double-submit: kunci tombol 3 detik + cap waktu; nomor registrasi `KSPM26-<4 digit acak>` dibuat sekali per perangkat.
- Halaman menolak dibuka di luar periode (sebelum 28 Okt / sesudah 11 Nov 2026) dengan pesan ramah + kontak admin — tanggal bisa di-override via `?preview=1` untuk testing.
- **Privasi:** tidak ada server — data hanya transit di browser pendaftar → chat WA admin. Cantumkan catatan ini di footer ("Data Anda terkirim langsung ke admin via WhatsApp, tidak disimpan di server manapun").

---

## 12. Langkah pengerjaan (setelah planning disetujui)

1. Kunci jawaban §10 (4 pertanyaan di bawah) — 5 menit.
2. Bangun `index.html` + `styles.css` (hero ticker + wizard 5 langkah) — inti.
3. Bangun `app.js` (validasi, autosave, format pesan WA, nomor registrasi).
4. Bangun layar "Periksa & Kirim" (ringkasan kartu di web + tombol WA tunggal; tanpa PDF).
5. Uji: HP Android (Chrome), desktop, mode gelap, `?preview=1`, teks WA panjang.
6. Tulis `README.md` + deploy ke hosting statis gratis.

---

## 13. Pertanyaan terbuka (jawabanmu menentukan bentuk final)

1. **Kirim ke admin mana?** Dua tombol terpisah (Jen / Angle, pendaftar yang pilih) atau satu tombol default ke salah satu?
2. **Daftar jurusan & fakultas Unidayan** — kirim daftar resminya (agar dropdown akurat), atau pakai isian bebas + "Lainnya"?
3. **Divisi/bidang KSPM** — apa saja nama divisi resminya untuk isian "divisi diminati"? (Kalau belum ada, isian ini saya hapus.)
4. **PDF** — cukup tombol cetak/simpan PDF bawaan browser (disarankan), atau mau unduh otomatis satu klik (jsPDF)?

*Keputusan final user (28 Okt 2026): **satu tombol ke Angle** · **prodi isian bebas** · **divisi: Edukasi, Kegiatan, Kominfo** · **tanpa PDF, hanya teks WA** (pengiriman tetap butuh satu ketukan tombol kirim di aplikasi WhatsApp).*
