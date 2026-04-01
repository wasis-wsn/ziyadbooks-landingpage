## Ziyad Books Landing Page

Production-ready landing page untuk katalog buku Islami Ziyad Books dengan Next.js App Router, server-side fetching, katalog dinamis, filter pencarian, dan fallback data bila token API belum tersedia.

## Setup

1. Install dependency:

```bash
npm install
```

2. Siapkan environment variable:

```bash
cp .env.example .env.local
```

3. Jalankan development server:

```bash
npm run dev
```

4. Buka [http://localhost:3000](http://localhost:3000).

## Environment

Set salah satu variable berikut agar katalog mengambil data dari API produksi/dev:

- `ZIYADBOOKS_API_TOKEN`
- `ZIYADBOOKS_BEARER_TOKEN`

Jika token belum diisi, halaman akan tetap tampil dengan katalog fallback yang sudah dikurasi.

## Scripts

- `npm run dev` menjalankan server development.
- `npm run build` menjalankan build production.
- `npm run lint` menjalankan lint.
