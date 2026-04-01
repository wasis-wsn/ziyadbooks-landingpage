"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

import { useCart } from "@/hooks/cart-context";

import { Button } from "@/components/ui/button";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, totalPrice, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = useCart();

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[70] bg-black/30 backdrop-blur-sm" role="dialog" aria-modal>
      <button type="button" aria-label="Tutup troli" className="absolute inset-0 h-full w-full cursor-default" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto border-l border-[color:var(--border)] bg-white p-5 shadow-2xl sm:p-6" onClick={(event) => event.stopPropagation()}>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[color:var(--foreground)]">Troli Belanja</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[color:var(--border)] px-3 py-1 text-sm hover:bg-[color:var(--surface-alt)]"
          >
            Tutup
          </button>
        </div>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[color:var(--border)] bg-[color:var(--surface-alt)] p-6 text-sm text-[color:var(--muted)]">
            Troli masih kosong. Tambahkan buku favorit Anda dari katalog.
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {items.map((item) => (
                <article key={item.productId} className="rounded-2xl border border-[color:var(--border)] p-3">
                  <div className="flex gap-3">
                    <img src={item.imageUrl} alt={item.title} className="h-20 w-16 rounded-lg object-cover" />
                    <div className="min-w-0 flex-1">
                      <Link href={`/produk/${item.slug}`} className="line-clamp-2 text-sm font-semibold text-[color:var(--foreground)] hover:text-[color:var(--primary)]">
                        {item.title}
                      </Link>
                      <p className="mt-1 text-sm text-[color:var(--secondary)]">{currencyFormatter.format(item.price)}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <button type="button" onClick={() => decreaseQuantity(item.productId)} className="h-7 w-7 rounded-full border border-[color:var(--border)]">-</button>
                        <span className="w-6 text-center text-sm">{item.quantity}</span>
                        <button type="button" onClick={() => increaseQuantity(item.productId)} className="h-7 w-7 rounded-full border border-[color:var(--border)]">+</button>
                        <button type="button" onClick={() => removeFromCart(item.productId)} className="ml-auto text-xs text-red-600 hover:underline">
                          Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-[color:var(--surface-alt)] p-4">
              <div className="flex items-center justify-between text-sm text-[color:var(--muted)]">
                <span>Total</span>
                <span className="text-lg font-semibold text-[color:var(--foreground)]">{currencyFormatter.format(totalPrice)}</span>
              </div>
              <div className="mt-3 flex gap-3">
                <Button href="https://shopee.co.id/ziyadbooks_official" target="_blank" rel="noreferrer" className="flex-1 text-sm">
                  Checkout
                </Button>
                <Button variant="secondary" className="flex-1 text-sm" onClick={clearCart}>
                  Kosongkan
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}