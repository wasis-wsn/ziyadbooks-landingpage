"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { CartDrawer } from "@/components/layout/cart-drawer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/cart-context";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Best Seller", href: "#best-seller" },
  { label: "Tentang", href: "#tentang" },
  { label: "Kontak", href: "#kontak" },
];

export function Navbar() {
  const [openCart, setOpenCart] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openAuthMenu, setOpenAuthMenu] = useState(false);
  const authMenuRef = useRef<HTMLDivElement | null>(null);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!authMenuRef.current) {
        return;
      }

      if (!authMenuRef.current.contains(event.target as Node)) {
        setOpenAuthMenu(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenAuthMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[color:var(--border)] bg-[color:color-mix(in_srgb,var(--surface)_90%,transparent)] backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="#home" className="group block">
            <Image src="/logonew.svg" alt="Ziyad Books" width={220} height={40} className="h-10 w-auto sm:h-12" priority />
          </Link>

          <nav aria-label="Menu utama" className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-[color:var(--muted)] transition-colors hover:text-[color:var(--primary)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setOpenCart(true)}
              aria-label="Buka troli"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border)] bg-white text-[color:var(--foreground)] transition-colors hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.5L22 7H7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="10" cy="20" r="1.6" fill="currentColor" />
                <circle cx="18" cy="20" r="1.6" fill="currentColor" />
              </svg>
              {totalItems > 0 ? (
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[color:var(--secondary)] px-1 text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              ) : null}
            </button>
            <div className="hidden sm:block">
              <Button href="#katalog" variant="primary">
                Belanja Sekarang
              </Button>
            </div>
            <div className="sm:hidden">
              <Button href="#katalog" variant="primary" className="px-4 py-2 text-sm">
                Belanja
              </Button>
            </div>
            <div ref={authMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setOpenAuthMenu((current) => !current)}
                aria-label="Buka menu akun"
                aria-haspopup="menu"
                aria-expanded={openAuthMenu}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border)] bg-white text-[color:var(--foreground)] transition-colors hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                  <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M5 19.2c1.9-3.2 4.1-4.8 7-4.8s5.1 1.6 7 4.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>

              {openAuthMenu ? (
                <div className="absolute right-0 top-[calc(100%+0.55rem)] z-30 w-44 overflow-hidden rounded-2xl border border-[color:var(--border)] bg-white p-2 shadow-[0_22px_48px_-35px_rgba(15,23,42,0.5)]">
                  <Link
                    href="/login"
                    onClick={() => setOpenAuthMenu(false)}
                    className="block rounded-xl px-3 py-2 text-sm font-semibold text-[color:var(--foreground)] transition-colors hover:bg-[color:var(--surface-alt)] hover:text-[color:var(--primary)]"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setOpenAuthMenu(false)}
                    className="block rounded-xl px-3 py-2 text-sm font-semibold text-[color:var(--foreground)] transition-colors hover:bg-[color:var(--surface-alt)] hover:text-[color:var(--primary)]"
                  >
                    Daftar
                  </Link>
                </div>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => setOpenMenu(true)}
              aria-label="Buka menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border)] bg-white text-[color:var(--foreground)] transition-colors hover:border-[color:var(--primary)] hover:text-[color:var(--primary)] lg:hidden"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      {openMenu ? (
        <div className="fixed inset-0 z-[75] bg-black/35 backdrop-blur-sm lg:hidden" role="dialog" aria-modal>
          <button type="button" aria-label="Tutup menu" className="absolute inset-0 h-full w-full" onClick={() => setOpenMenu(false)} />
          <div className="absolute right-0 top-0 h-full w-[82%] max-w-sm border-l border-[color:var(--border)] bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-lg font-semibold text-[color:var(--foreground)]">Menu</p>
              <button
                type="button"
                onClick={() => setOpenMenu(false)}
                aria-label="Tutup menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--border)]"
              >
                x
              </button>
            </div>

            <nav className="space-y-2" aria-label="Menu mobile">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpenMenu(false)}
                  className="block rounded-2xl border border-[color:var(--border)] px-4 py-3 text-sm font-semibold text-[color:var(--foreground)] transition-colors hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-5 space-y-3" onClick={() => setOpenMenu(false)}>
              <Button href="#katalog" variant="primary" className="w-full">
                Jelajahi Katalog
              </Button>
              <Button href="#tentang" variant="secondary" className="w-full">
                Tentang Ziyad Books
              </Button>
            </div>
          </div>
        </div>
      ) : null}
      <CartDrawer open={openCart} onClose={() => setOpenCart(false)} />
    </>
  );
}