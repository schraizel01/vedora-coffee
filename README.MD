# Vedora Coffee — Cat, Coffee & Eatery (PWA & REST API)

**Vedora Coffee** adalah aplikasi web progresif (*Progressive Web App* / PWA) bertema *cat cafe* yang dirancang untuk memudahkan pengunjung menjelajahi katalog menu makanan dan minuman, mengenal profil kucing-kucing residen, melihat promo dan ulasan pengunjung, serta melakukan reservasi meja secara daring dengan validasi kapasitas *real-time*.

Proyek ini dibangun menggunakan arsitektur *client-server* modern dalam satu repositori (*monorepo*), yang memisahkan antarmuka *frontend* berbasis **React + Vite PWA** dengan layanan *backend* **REST API** mandiri berbasis **Node.js + Express.js** yang terhubung ke database **PostgreSQL (Supabase)**.

---

## Fitur Utama

### 1. Pengunjung (Customer)
* **Katalog Menu & Kategori Interaktif:** Menampilkan daftar makanan dan minuman lengkap dengan filter kategori, pencarian instan, status ketersediaan (*available/sold out*), serta label menu unggulan (*featured* & *badge*).
* **Profil Kucing Residen:** Galeri dan informasi detail kucing-kucing di Vedora Coffee (ras, jenis kelamin, tanggal lahir, karakter/kepribadian, deskripsi, dan status keaktifan).
* **Reservasi Meja Real-Time:** Pemesanan jadwal kunjungan berdasarkan tanggal, jam buka operasional, dan jumlah tamu dengan pengecekan kapasitas otomatis (*anti-overbooking*) menggunakan fungsi RPC database.
* **Promo, Event & Ulasan:** Informasi promo atau acara kafe terbaru serta daftar ulasan terverifikasi dari pengunjung.
* **Fitur Akun & Favorit:** Pengguna yang masuk (*login*) dapat menyimpan menu dan kucing favorit, memantau status reservasi pribadi, membatalkan reservasi aktif, serta mengirimkan ulasan kunjungan.
* **Dukungan Offline & Instalasi PWA:** Dilengkapi *Service Worker* (`vite-plugin-pwa`), mekanisme *local storage caching*, simulasi mode *offline*, dan ikon aplikasi kustom sehingga dapat di-install ke layar utama (*Home Screen*) perangkat Android, iOS, maupun Desktop dan tetap dapat dibuka saat koneksi internet terputus.

### 2. Administrator (Admin Dashboard)
* **Manajemen Menu & Kategori:** Operasi CRUD penuh (tambah, ubah, hapus), pengaturan urutan kategori, pengubahan status ketersediaan instan, serta unggah foto menu ke Supabase Storage.
* **Manajemen Profil Kucing:** Operasi CRUD profil kucing, pengaturan status aktivitas kucing, serta penandaan kucing unggulan di beranda.
* **Manajemen Promo & Event:** Pembuatan dan penerbitan (*publish/unpublish*) banner promo atau acara kafe.
* **Manajemen Reservasi & Moderasi Ulasan:** Konfirmasi (*confirmed*), penyelesaian (*completed*), atau pembatalan (*cancelled*) reservasi pelanggan, serta moderasi persetujuan ulasan pengunjung sebelum ditampilkan ke publik.
* **Pengaturan Informasi Kafe:** Pembaruan profil kafe, alamat dan koordinat lokasi, kontak WhatsApp/Instagram, kapasitas kursi maksimal, durasi reservasi per sesi, serta jadwal jam buka harian.

---

## Arsitektur & Teknologi

| Lapisan | Teknologi |
| :--- | :--- |
| **Frontend (PWA)** | React, Vite, React Router, Tailwind CSS, `vite-plugin-pwa` |
| **Backend (REST API)** | Node.js, Express.js, CORS, Dotenv |
| **Database & Layanan Cloud** | Supabase (PostgreSQL, Supabase Auth, Supabase Storage, Database RPC) |
| **Hosting & Deployment** | Vercel (Multi-project Monorepo Deployment untuk Frontend & Backend) |

---

## Struktur Direktori

```text
vedora-coffe/
├── public/                     # Aset statis, manifest, & ikon PWA (icon.svg, pwa-192x192.png, pwa-512x512.png)
├── src/
│   ├── components/             # Komponen UI reusable (Navbar, Footer, Modal, Toast, dll.)
│   ├── context/                # State management global, offline cache, & integrasi API (AppContext.jsx)
│   ├── lib/                    # Inisialisasi klien Supabase (supabase.js)
│   ├── pages/                  # Halaman publik (Beranda, Menu, Kucing, Reservasi, Profil) & Dashboard Admin
│   └── utils/                  # Fungsi utilitas format waktu, tanggal, dan mata uang
├── vedora-api/                 # Server Backend REST API mandiri (Node.js + Express.js)
│   ├── index.js                # Entry point server Express & definisi endpoint REST API
│   ├── package.json            # Konfigurasi & dependensi backend
│   ├── package-lock.json       # Lockfile dependensi backend
│   └── vercel.json             # Konfigurasi serverless routing Vercel untuk backend
├── .env                        # Variabel lingkungan frontend (diabaikan oleh Git)
├── .gitignore                  # Daftar file & folder yang dikecualikan dari Git
├── index.html                  # Template HTML utama aplikasi Vite
├── package.json                # Konfigurasi & dependensi frontend
├── package-lock.json           # Lockfile dependensi frontend
├── vercel.json                 # Konfigurasi SPA rewrite Vercel untuk frontend
└── vite.config.js              # Konfigurasi Vite bundler & plugin PWA
```

---

## Dokumentasi Endpoint REST API (`vedora-api`)

Server backend `vedora-api` menyediakan antarmuka RESTful berbasis JSON untuk menyuplai data katalog dan menangani transaksi reservasi:

| Method | Endpoint | Deskripsi | Response |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Mengecek status kesehatan (*health check*) server REST API | `200 OK` (JSON status) |
| `GET` | `/api/catalog` | Mengambil seluruh data katalog publik sekaligus (`cafeInfo`, `openingHours`, `categories`, `menuItems`, `cats`, `promos`, `reviews`) | `200 OK` (JSON object) |
| `GET` | `/api/menus` | Mengambil seluruh daftar item menu dari tabel `menu_items` | `200 OK` (JSON array) |
| `GET` | `/api/menus/:id` | Mengambil detail satu item menu berdasarkan `id` | `200 OK` / `404 Not Found` |
| `GET` | `/api/cats` | Mengambil seluruh daftar profil kucing dari tabel `cats` | `200 OK` (JSON array) |
| `GET` | `/api/cats/:id` | Mengambil detail satu profil kucing berdasarkan `id` | `200 OK` / `404 Not Found` |
| `GET` | `/api/reservations` | Mengambil seluruh daftar data reservasi dari tabel `reservations` | `200 OK` (JSON array) |
| `POST` | `/api/reservations` | Menyimpan data reservasi baru ke tabel `reservations` | `201 Created` / `400 Bad Request` |

---

## Skema Database (Supabase PostgreSQL)

Aplikasi ini menggunakan tabel-tabel berikut pada database Supabase:
* `cafe_info` — Profil utama kafe, koordinat peta, kontak, dan aturan kapasitas reservasi.
* `opening_hours` — Jadwal jam buka dan tutup kafe untuk setiap hari dalam seminggu.
* `categories` — Kategori menu makanan dan minuman beserta urutan tampilnya.
* `menu_items` — Daftar produk makanan dan minuman beserta harga, foto, dan status ketersediaan.
* `cats` — Data profil kucing residen di kafe.
* `promos` — Informasi promo dan event kafe beserta periode berlakunya.
* `reservations` — Data pemesanan meja pengunjung beserta kode reservasi dan status penanganan.
* `reviews` — Ulasan dan rating pengunjung dengan status moderasi admin.
* `profiles` — Data profil tambahan pengguna serta peran akses (`customer` / `admin`).
* `favorite_menus` & `favorite_cats` — Tabel relasi daftar menu dan kucing favorit tiap pengguna.

---

## Panduan Instalasi & Menjalankan di Lokal

### 1. Prasyarat
* **Node.js** versi `18.x` atau lebih baru beserta **npm**
* Proyek aktif di **[Supabase](https://supabase.com)** lengkap dengan `Project URL` dan `Anon Public Key`

### 2. Clone Repositori
```bash
git clone [https://github.com/schraizel01/vedora-coffee.git](https://github.com/schraizel01/vedora-coffe.git)
cd vedora-coffe
```

### 3. Menjalankan Server Backend (`vedora-api`)
Buka terminal dan masuk ke folder `vedora-api`:
```bash
cd vedora-api
npm install
```
Buat file **`.env`** di dalam folder `vedora-api/` dan isi kredensial Supabase:
```env
PORT=3000
SUPABASE_URL=[https://your-project-id.supabase.co](https://your-project-id.supabase.co)
SUPABASE_KEY=your-supabase-anon-or-service-key
```
Jalankan server backend:
```bash
npm start
```
Server REST API akan aktif pada `http://localhost:3000`. Uji melalui browser dengan mengakses `http://localhost:3000/api/catalog`.

### 4. Menjalankan Aplikasi Frontend (`vedora-coffe`)
Buka terminal baru pada folder utama `vedora-coffe`:
```bash
npm install
```
Buat file **`.env`** di folder utama `vedora-coffe/` dan isi konfigurasi berikut:
```env
VITE_SUPABASE_URL=[https://your-project-id.supabase.co](https://your-project-id.supabase.co)
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_API_URL=http://localhost:3000
```
Jalankan server pengembangan frontend:
```bash
npm run dev
```
Aplikasi frontend dapat diakses melalui browser di `http://localhost:5173`.

---

## Panduan Deployment ke Vercel (Monorepo)

Karena repositori ini menggunakan struktur *monorepo* (`vedora-coffe` sebagai akar proyek dan `vedora-api` sebagai subfolder backend), kedua layanan di-deploy ke **Vercel** sebagai dua proyek terpisah dari satu repositori GitHub yang sama:

### Tahap 1 — Deploy Backend (`vedora-api`)
1. Masuk ke dashboard **[Vercel](https://vercel.com)**, klik **Add New... → Project**, lalu pilih repositori **`vedora-coffe`**.
2. Ubah nama proyek menjadi **`vedora-api`**.
3. Pada bagian **Root Directory**, klik **Edit** dan pilih folder **`vedora-api`**.
4. Buka bagian **Environment Variables** dan tambahkan:
   * `SUPABASE_URL` = *(URL proyek Supabase)*
   * `SUPABASE_KEY` = *(API Key Supabase)*
5. Klik **Deploy** dan salin domain produksi yang dihasilkan (contoh: `https://vedora-api.vercel.app`).

### Tahap 2 — Deploy Frontend PWA (`vedora-coffe`)
1. Klik **Add New... → Project** kembali di Vercel dan pilih repositori **`vedora-coffe`** yang sama.
2. Biarkan **Root Directory** pada pengaturan bawaan (`./`) dan pastikan **Framework Preset** terdeteksi sebagai **Vite**.
3. Buka bagian **Environment Variables** dan tambahkan:
   * `VITE_SUPABASE_URL` = *(URL proyek Supabase)*
   * `VITE_SUPABASE_ANON_KEY` = *(Anon Key Supabase)*
   * `VITE_API_URL` = `https://vedora-api.vercel.app` *(sesuaikan dengan URL hasil Tahap 1 tanpa garis miring di akhir)*
4. Klik **Deploy**. Setelah berstatus **Ready**, aplikasi PWA siap diakses melalui HTTPS dan dapat langsung di-install pada perangkat mobile maupun desktop.

---

## Pengembang

* **Reizal Haidar Akmal** — Program Studi Teknik Komputer, Universitas Diponegoro (NIM: `21120124130083`)