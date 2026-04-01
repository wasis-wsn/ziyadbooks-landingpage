"use client";

/* eslint-disable @next/next/no-img-element */

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/hooks/cart-context";
import type { CatalogProduct } from "@/types/catalog";

interface ProductCardProps {
  product: CatalogProduct;
  compact?: boolean;
  onViewDetail?: (product: CatalogProduct) => void;
}

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export function ProductCard({ product, compact = false, onViewDetail }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-35px_rgba(46,125,50,0.5)]">
      <article className="flex h-full flex-col">
        <div className={`relative overflow-hidden bg-[color:var(--surface-alt)] ${compact ? "aspect-[3/4]" : "aspect-[4/5]"}`}>
          <img
            src={product.imageUrl}
            alt={product.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-transparent" />
          {product.isBestSeller ? (
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[color:var(--primary)] shadow-sm backdrop-blur">
              Best Seller
            </span>
          ) : null}
          {product.discountPercent > 0 ? (
            <span className="absolute bottom-4 left-4 rounded-full bg-[color:var(--secondary)] px-3 py-1 text-xs font-bold text-white shadow-sm">
              -{product.discountPercent}%
            </span>
          ) : null}
        </div>
        <div className={`flex flex-1 flex-col ${compact ? "gap-3 p-3" : "gap-4 p-5 sm:p-6"}`}>
          <div>
            <p className={`${compact ? "text-xs" : "text-sm"} font-medium text-[color:var(--secondary)]`}>{product.category}</p>
            <h3 className={`mt-1 font-semibold tracking-tight text-[color:var(--foreground)] ${compact ? "line-clamp-3 text-sm leading-3 md:text-base md:leading-6 lg:text-[1.1rem] lg:leading-7" : "text-xl"}`}>
              {product.title}
            </h3>
          </div>
          {/* <p className={`${compact ? "line-clamp-2 text-xs leading-6" : "line-clamp-3 text-sm leading-7"} text-[color:var(--muted)]`}>{product.description}</p> */}
          <div className={`mt-auto flex ${compact ? "flex-col items-start gap-3" : "items-center justify-between gap-4"}`}>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[color:var(--muted)]">Harga</p>
              {product.discountPercent > 0 ? (
                <p className={`${compact ? "text-xs" : "text-sm"} text-[color:var(--muted)] line-through`}>
                  {currencyFormatter.format(product.originalPrice)}
                </p>
              ) : null}
              <p className={`${compact ? "text-base" : "text-lg"} font-semibold text-[color:var(--foreground)]`}>
                {currencyFormatter.format(product.finalPrice)}
              </p>
            </div>
            <div className={`flex ${compact ? "w-full gap-2" : "flex-col gap-2"}`}>
              {onViewDetail ? (
                <Button
                  variant="secondary"
                  className={`shrink-0 ${compact ? "flex-1 px-3 py-2 text-xs" : "px-4 py-2 text-sm"}`}
                  onClick={() => onViewDetail(product)}
                >
                  Lihat Detail
                </Button>
              ) : (
                <Button variant="secondary" className={`shrink-0 ${compact ? "flex-1 px-3 py-2 text-xs" : "px-4 py-2 text-sm"}`} href={product.detailUrl}>
                  Lihat Detail
                </Button>
              )}
              <Button className={`shrink-0 ${compact ? "flex-1 px-3 py-2 text-xs" : "px-4 py-2 text-sm"}`} onClick={() => addToCart(product)}>
                + Troli
              </Button>
            </div>
          </div>
        </div>
      </article>
    </Card>
  );
}