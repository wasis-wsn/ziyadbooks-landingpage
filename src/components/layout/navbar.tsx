"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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
  const { totalItems } = useCart();

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