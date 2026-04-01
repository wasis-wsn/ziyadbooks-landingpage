import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Login",
  description: "Masuk ke akun Ziyad Books untuk melanjutkan belanja dan kemitraan.",
};

export default function LoginPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <Card className="overflow-hidden border-[color:var(--border)] bg-white p-6 sm:p-8">
          <div className="mb-7 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--secondary)]">Akun Ziyad Books</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[color:var(--foreground)]">Login</h1>
          </div>

          <form className="space-y-4" action="#" method="post">
            <Field label="Alamat Email" htmlFor="email">
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="email@contoh.com"
                className="w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 text-sm text-[color:var(--foreground)] outline-none transition-colors focus:border-[color:var(--primary)]"
              />
            </Field>

            <Field label="Password" htmlFor="password">
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Masukkan password"
                className="w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 text-sm text-[color:var(--foreground)] outline-none transition-colors focus:border-[color:var(--primary)]"
              />
            </Field>

            <div className="flex justify-end">
              <Link href="#" className="text-sm font-medium text-[color:var(--secondary)] transition-colors hover:text-[color:var(--primary)]">
                Lupa Password?
              </Link>
            </div>

            <p className="text-xs leading-6 text-[color:var(--muted)]">
              *Dengan login, Anda menyetujui Syarat dan Ketentuan serta Kebijakan Privasi kami.
            </p>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-full bg-[color:var(--secondary)] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_35px_-18px_rgba(245,124,0,0.7)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ef6f00]"
            >
              Login
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-[color:var(--border)]" />
            <span className="text-sm text-[color:var(--muted)]">Atau</span>
            <div className="h-px flex-1 bg-[color:var(--border)]" />
          </div>

          <button
            type="button"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[color:var(--border)] bg-white px-5 py-3 text-sm font-semibold text-[color:var(--foreground)] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]"
          >
            <span aria-hidden="true">G</span>
            Login dengan Google
          </button>

          <p className="mt-6 text-center text-sm text-[color:var(--muted)]">
            Belum punya akun?{" "}
            <Link href="/register" className="font-semibold text-[color:var(--secondary)] transition-colors hover:text-[color:var(--primary)]">
              Daftar sekarang
            </Link>
          </p>

          <div className="mt-6 text-center">
            <Button href="/" variant="ghost" className="text-sm">
              Kembali ke beranda
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: Readonly<{
  label: string;
  htmlFor: string;
  children: ReactNode;
}>) {
  return (
    <label htmlFor={htmlFor} className="block space-y-2">
      <span className="text-sm font-semibold text-[color:var(--foreground)]">{label}</span>
      {children}
    </label>
  );
}
