import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Register",
  description: "Daftar akun baru Ziyad Books untuk kemudahan belanja dan kemitraan.",
};

export default function RegisterPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Card className="overflow-hidden border-[color:var(--border)] bg-white p-6 sm:p-8">
          <div className="mb-7 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--secondary)]">Akun Ziyad Books</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[color:var(--foreground)]">Daftar Akun Baru</h1>
            <p className="mt-3 text-sm text-[color:var(--muted)]">
              Sudah punya akun?{" "}
              <Link href="/login" className="font-semibold text-[color:var(--secondary)] transition-colors hover:text-[color:var(--primary)]">
                Masuk di sini
              </Link>
            </p>
          </div>

          <form className="space-y-7" action="#" method="post">
            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-[color:var(--foreground)]">Informasi Dasar</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Username" htmlFor="username">
                  <input id="username" name="username" type="text" required className="input-auth" />
                </Field>
                <Field label="Alamat Email" htmlFor="email">
                  <input id="email" name="email" type="email" required className="input-auth" />
                </Field>
                <Field label="Password" htmlFor="password">
                  <input id="password" name="password" type="password" required className="input-auth" />
                </Field>
                <Field label="Konfirmasi Password" htmlFor="confirmPassword">
                  <input id="confirmPassword" name="confirmPassword" type="password" required className="input-auth" />
                </Field>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-[color:var(--foreground)]">Informasi Kontak</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nomor Telepon/WhatsApp" htmlFor="phone">
                  <input id="phone" name="phone" type="tel" required className="input-auth" />
                </Field>
                <Field label="Provinsi" htmlFor="province">
                  <input id="province" name="province" type="text" required className="input-auth" />
                </Field>
                <Field label="Kota/Kabupaten" htmlFor="city">
                  <input id="city" name="city" type="text" required className="input-auth" />
                </Field>
                <Field label="Kecamatan" htmlFor="district">
                  <input id="district" name="district" type="text" required className="input-auth" />
                </Field>
              </div>
              <Field label="Alamat Lengkap" htmlFor="address">
                <textarea id="address" name="address" rows={4} required className="input-auth resize-none" />
              </Field>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-[color:var(--foreground)]">Verifikasi Identitas</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nama Lengkap (Sesuai KTP)" htmlFor="fullName">
                  <input id="fullName" name="fullName" type="text" required className="input-auth" />
                </Field>
                <Field label="Nomor KTP" htmlFor="ktpNumber">
                  <input id="ktpNumber" name="ktpNumber" type="text" inputMode="numeric" required className="input-auth" />
                </Field>
              </div>
              <Field label="Foto KTP" htmlFor="ktpPhoto">
                <input
                  id="ktpPhoto"
                  name="ktpPhoto"
                  type="file"
                  accept="image/png,image/jpeg"
                  required
                  className="input-auth file:mr-4 file:rounded-full file:border-0 file:bg-[rgba(245,124,0,0.16)] file:px-3 file:py-2 file:text-xs file:font-semibold file:text-[color:var(--secondary)]"
                />
              </Field>
              <p className="text-xs text-[color:var(--muted)]">Format: JPG/PNG, maksimal 2MB</p>
            </section>

            <p className="text-xs leading-6 text-[color:var(--muted)]">
              Dengan mendaftar, Anda menyetujui Syarat & Ketentuan dan Kebijakan Privasi kami.
            </p>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-full bg-[color:var(--secondary)] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_35px_-18px_rgba(245,124,0,0.7)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ef6f00]"
            >
              Daftar Akun Baru
            </button>
          </form>

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
