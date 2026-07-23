# 💎 FinTrack Studio - Catatan Keuangan Modern

![FinTrack Studio Banner](https://img.shields.io/badge/FinTrack-Studio%20v2.0-6366f1?style=for-the-badge&logo=wallet&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-10b981?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/Vanilla_CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript_ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Vercel Status](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

> **FinTrack Studio** adalah aplikasi manajemen & pencatatan keuangan pribadi serba ada (All-in-One Personal Financial Management Suite) yang dirancang modern, responsif, kaya fitur, dan privasi-first. Seluruh data tersimpan secara lokal dan aman di browser tanpa memerlukan server eksternal.

---

## 🚀 Fitur Utama

### 📊 1. Dashboard Overview & Analisis Keuangan
- **Ringkasan Saldo**: Total Saldo Bersih, Pemasukan Bulanan, Pengeluaran Bulanan, dan Net Cashflow (Surplus/Defisit).
- **Smart Financial Alerts**: Peringatan otomatis jika anggaran hampir habis atau terjadi defisit pengeluaran.
- **Month-over-Month Comparison**: Perbandingan statistik performa keuangan bulan lalu vs bulan ini.
- **Kesehatan Keuangan (Aturan 50/30/20)**: Analisis alokasi Kebutuhan Pokok (<=50%), Gaya Hidup (<=30%), dan Tabungan/Investasi (>=20%) beserta skor kesehatan keuangan.
- **Grafik Visual Interaktif**: Tren Keuangan Bulanan (Bar Chart) dan Pengeluaran per Kategori (Doughnut Chart) menggunakan Chart.js.

### 💳 2. Dompet, Rekening & Transfer Antar Dompet
- **Manajemen Multi-Dompet**: Kelola Rekening Bank (BCA, Mandiri, dll), E-Wallet (GoPay, OVO, DANA), Uang Tunai (Cash), dan Investasi.
- **Transfer Antar Dompet**: Fitur pemindahan dana antar rekening dengan validasi saldo real-time dan pencatatan transaksi terhubung.
- **Riwayat Per Dompet**: Tinjau histori khusus transaksi masuk dan keluar untuk setiap dompet.

### 📝 3. Pencatatan Transaksi Lengkap & Filter Pintar
- **Multi-Mata Uang**: Dukungan transaksi dalam Rupiah (IDR), USD, EUR, SGD, JPY, dan SAR.
- **Hierarki Kategori & Sub-Kategori**: Pencatatan spesifik hingga ke sub-kategori.
- **Tag & Hashtag**: Penandaan khusus untuk pengelompokan transaksi (contoh: `#LiburanBali`, `#ProjectX`).
- **Filter & Pencarian Lanjutan**: Filter berdasarkan Tipe (Pemasukan/Pengeluaran), Kategori, Rentang Waktu (Bulan Ini, Bulan Lalu, Tahun Ini, Semua Waktu), dan kata kunci pencarian.
- **📄 Cetak & Ekspor PDF Laporan**: Fitur pembuatan Laporan Keuangan Eksekutif berformat PDF siap cetak dengan pilihan periode dan opsi komponen kustom (Ringkasan Eksekutif, Rincian Dompet, Rincian Pengeluaran per Kategori, dan Tabel Transaksi Lengkap).

### 📅 4. Kalender Keuangan Bulanan
- Tampilan kalender harian interaktif untuk memantau rekam pemasukan dan pengeluaran harian secara visual.
- Klik tanggal manapun pada kalender untuk langsung memfilter daftar transaksi hari tersebut.

### 🎯 5. Target Tabungan & Impian (Savings Goals)
- Rencanakan target masa depan (Laptop, Dana Darurat, Liburan) dengan indikator progress persen.
- **Setor Tabungan**: Memotong saldo dompet pilihan secara otomatis.
- **Tarik Tabungan**: Mencairkan tabungan kembali ke dompet tujuan.
- Histori setoran dan penarikan yang terekam rapi.

### 🤝 6. Pencatatan Hutang & Piutang
- Kelola uang pinjaman (Hutang) dan uang yang dipinjamkan ke orang lain (Piutang) lengkap dengan tanggal jatuh tempo.
- **Terhubung ke Dompet**: Pembayaran atau pelunasan secara otomatis menambah/memotong saldo dompet.
- Histori riwayat cicilan & pelunasan.

### 🔄 7. Transaksi Rutin & Berulang (Recurring Txs)
- Otomatisasi pencatatan tagihan bulanan (Wi-Fi, Listrik, Langganan Streaming) dan Gaji Bulanan.
- Eksekusi 1-klik untuk langsung memproses tagihan ke catatan transaksi & saldo dompet.

### 🎯 8. Kendali Anggaran & Budgeting
- Tentukan batas pengeluaran bulanan per kategori atau gabungan beberapa kategori.
- Notifikasi visual warna saat anggaran aman (hijau), mendekati batas (kuning), atau melampaui batas (merah).
- Pop-up detail rincian transaksi pengeluaran yang terhitung pada budget.

### 🧮 9. Kalkulator Keuangan Lengkap
1. **Zakat Maal**: Hitung kewajiban Zakat Maal berdasarkan nilai nisab emas 85 gram.
2. **Simulasi KPR / Kredit**: Estimasi angsuran pokok dan bunga per bulan.
3. **Simulasi Pinjol (Pinjaman Online)**: Hitung estimasi bunga harian/bulanan dan total pengembalian.
4. **Simulasi Kartu Kredit**: Estimasi pembayar minimum & proyeksi waktu lunas.
5. **Simulasi Kredit Kendaraan (Motor / Mobil)**: Hitung estimasi Total Down Payment (TDP) dan cicilan bulanan.

### 📁 10. Manajemen Kategori & Tema Custom
- Bebas menambah Kategori Utama dan Sub-Kategori baru.
- Kustomisasi ikon FontAwesome dan warna indikator kategori.

### 🔒 11. Privasi, Tema & Backup Data (Cloud & Local)
- **Mode Privasi**: Sembunyikan/tampilkan nominal saldo (`Rp ••••••••`) dengan 1 klik.
- **Mode Gelap / Terang (Dark / Light Mode)**: Tampilan visual modern yang nyaman di mata.
- **Sync Cloud (Google Drive)**: Integrasi langsung dengan Google Drive untuk menyimpan dan memulihkan cadangan data JSON secara terenkripsi & terisolasi di cloud pribadi Anda.
- **Ekspor & Impor Data Lokal**: Fitur Backup data ke format **JSON** dan **CSV**, serta Restore dari file JSON backup.
- **Data Demo**: Pilihan untuk memuat data simulasi bagi pengguna baru.

---

## 🛠️ Teknologi yang Digunakan

- **Core**: HTML5, Vanilla JavaScript (ES6+)
- **Styling**: Vanilla CSS3 (Custom Properties, Flexbox, CSS Grid, Glassmorphism UI)
- **Typography**: Google Fonts (*Plus Jakarta Sans*)
- **Icons**: FontAwesome v6.4.0
- **Charts**: Chart.js v4.x
- **Storage**: Browser LocalStorage (Zero Server Dependency)

---

## 🖥️ Panduan Penggunaan

### 1. Menjalankan Secara Lokal (Local Development)

Anda tidak memerlukan *node_modules* atau build tool khusus untuk menjalankan proyek ini.

```bash
# Clone repositori
git clone https://github.com/fiksriots/FinTrack-Studio.git

# Masuk ke direktori proyek
cd FinTrack-Studio
```

Buka berkas `index.html` langsung di browser favorit Anda, atau jalankan menggunakan extension **Live Server** di VS Code.

### 2. Cara Menggunakan Fitur Utama

1. **Memuat Data Contoh (Opsional)**:
   - Klik tombol **Database & Backup** di header atas -> Klik **Muat Data Contoh (Demo)** untuk langsung mencoba aplikasi dengan data awal.
2. **Menambah Dompet / Rekening**:
   - Buka menu **Dompet & Rekening** di sidebar -> Klik **+ Tambah Dompet** (Masukkan nama dompet seperti *BCA*, *GoPay*, atau *Cash* beserta saldo awal).
3. **Mencatat Transaksi**:
   - Klik tombol **+ Tambah Transaksi** di header -> Pilih Tipe (*Pengeluaran* / *Pemasukan*), Nominal, Kategori, Sub-Kategori, dan Dompet -> Klik **Simpan Transaksi**.
4. **Melakukan Transfer Antar Dompet**:
   - Buka menu **Dompet & Rekening** -> Klik **Transfer Antar Dompet** -> Pilih dompet asal, dompet tujuan, dan nominal transfer -> Klik **Proses Transfer**.
5. **Melakukan Backup & Restore Data**:
   - Klik **Database & Backup** -> Pilih **Unduh JSON Backup** untuk menyimpan cadangan data ke komputer.
   - Untuk mengembalikan data: gunakan menu **Impor & Restorasi Data** dan pilih file `.json` backup Anda.

---

## 📱 Responsivitas Layar

FinTrack Studio telah dioptimalkan secara penuh untuk berbagai ukuran layar:
- 💻 **Desktop & Laptop** (>= 1200px): Sidebar lengkap / collapsible, multi-column dashboard widget grid.
- 📱 **Tablet** (768px - 1199px): Grid 2-kolom seimbang, header actions responsif.
- 📱 **Smartphone** (<= 767px): Sidebar drawer slide-in (tombol ☰), filter stacked, modal pop-up full-screen friendly, dan elemen touch-friendly.

---

## 📄 Lisensi

Proyek ini dirilis di bawah lisensi [MIT License](LICENSE). Bebas digunakan, dimodifikasi, dan dikembangkan secara terbuka.

---

<p align="center">
  Dikembangkan dengan ❤️ oleh <b>fiksriots</b> &bull; FinTrack Studio 2026
</p>
