"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[color:var(--background)] px-4 py-16 text-[color:var(--foreground)]">
      <div className="mx-auto w-full max-w-xl rounded-[32px] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 text-center shadow-[0_24px_80px_-45px_rgba(15,23,42,0.4)] sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[color:var(--secondary)]">Terjadi error</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">Halaman belum bisa dimuat</h1>
        <p className="mt-4 text-base leading-8 text-[color:var(--muted)]">
          Silakan coba muat ulang. Jika masalah berasal dari API, fallback katalog tetap tersedia ketika halaman berhasil dirender ulang.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button variant="primary" onClick={reset}>
            Muat Ulang
          </Button>
          <Button href="#home" variant="secondary">
            Kembali ke beranda
          </Button>
        </div>
      </div>
    </div>
  );
}