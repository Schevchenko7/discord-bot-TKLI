# Discord Role & Event Ping Bot

Bot Discord sederhana dengan 2 fitur:
1. **Ambil Role** — member bisa pilih role sendiri lewat dropdown menu (`/setup-roles`)
2. **Ping Event** — admin bisa umumkan event dan ping role tertentu, langsung atau terjadwal (`/ping-event`)

## Cara Menjalankan

### 1. Install Node.js
Download dan install Node.js versi LTS dari https://nodejs.org (kalau belum ada).

### 2. Install dependencies
Buka terminal di folder ini, lalu jalankan:
```
npm install
```

### 3. Buat aplikasi bot di Discord
1. Buka https://discord.com/developers/applications
2. Klik **New Application**, kasih nama bebas
3. Masuk ke tab **Bot** → klik **Reset Token** → salin TOKEN-nya
4. Di tab **Bot**, aktifkan **Server Members Intent** (di bagian Privileged Gateway Intents)
5. Di tab **OAuth2 > URL Generator**, centang scope `bot` dan `applications.commands`,
   lalu centang permission: `Manage Roles`, `Send Messages`, `Mention Everyone`
6. Salin URL yang muncul di bawah, buka di browser, undang bot ke server kamu

### 4. Isi file .env
Salin `.env.example` menjadi `.env`, lalu isi:
- `DISCORD_TOKEN` → token dari langkah 3
- `CLIENT_ID` → Application ID (ada di tab General Information)
- `GUILD_ID` → klik kanan icon server di Discord (aktifkan Developer Mode dulu di Settings) → Copy Server ID

### 5. Daftarkan slash command
```
npm run deploy
```
Ini hanya perlu dijalankan sekali (atau setiap kali kamu ubah/tambah command).

### 6. Jalankan bot
```
npm start
```
Kalau muncul `✅ Bot online sebagai ...` di terminal, bot sudah aktif.

## Cara Pakai di Discord

- `/setup-roles` → jalankan di channel yang mau dipakai untuk pilih role (khusus admin)
- `/ping-event nama:<nama event> role:<@role> pesan:<opsional> waktu:<opsional>`
  - Kosongkan `waktu` untuk ping langsung
  - Isi `waktu` dengan format `YYYY-MM-DD HH:mm` untuk dijadwalkan (contoh: `2026-08-20 19:00`)

## Catatan Penting
- Role bot (di Server Settings > Roles) harus diposisikan **di atas** role-role yang mau dikelola,
  kalau tidak bot tidak akan bisa menambah/menghapus role tersebut.
- Fitur jadwal di `/ping-event` menyimpan jadwal di memori — kalau bot restart sebelum waktunya tiba,
  jadwal itu akan hilang. Untuk penggunaan jangka panjang/produksi, sebaiknya jadwal disimpan ke database.
- Daftar role yang bisa dipilih diatur di `config/roles.json`, tinggal tambah/edit sesuai kebutuhan.
