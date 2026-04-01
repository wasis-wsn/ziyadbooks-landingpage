"use client";

import { useMemo, useState } from "react";

import { useDebouncedValue } from "@/hooks/use-debounced-value";
import type { CatalogProduct, ProductCategory } from "@/types/catalog";

import { ProductCard } from "@/components/product-card";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";

interface CatalogSectionProps {
  products: CatalogProduct[];
  categories: ProductCategory[];
  errorMessage: string | null;
}

export function CatalogSection({ products, categories, errorMessage }: CatalogSectionProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortMode, setSortMode] = useState("featured");
  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct | null>(null);
  const debouncedQuery = useDebouncedValue(query, 180);

  const visibleProducts = useMemo(() => {
    const normalizedQuery = debouncedQuery.trim().toLowerCase();

    return [...products]
      .filter((product) => {
        const matchesQuery =
          normalizedQuery.length === 0 ||
          [product.title, product.category, product.description].join(" ").toLowerCase().includes(normalizedQuery);

        const matchesCategory = activeCategory === "all" || product.category === activeCategory;

        return matchesQuery && matchesCategory;
      })
      .sort((left, right) => {
        if (sortMode === "price-asc") {
          return left.finalPrice - right.finalPrice;
        }

        if (sortMode === "price-desc") {
          return right.finalPrice - left.finalPrice;
        }

        const leftScore = Number(left.isFeatured) * 2 + Number(left.isBestSeller);
        const rightScore = Number(right.isFeatured) * 2 + Number(right.isBestSeller);

        return rightScore - leftScore;
      });
  }, [activeCategory, debouncedQuery, products, sortMode]);

  return (
    <Section
      id="katalog"
      eyebrow="Product catalog"
      title="Katalog buku yang bisa difilter dengan cepat"
      description="Cari judul berdasarkan kata kunci, pilih kategori yang relevan, dan jelajahi buku dengan pengalaman yang terasa ringan di desktop maupun mobile."
      action={<p className="text-sm text-[color:var(--muted)]">{visibleProducts.length} produk ditampilkan</p>}
    >
      {errorMessage ? (
        <Card className="mb-8 border-[rgba(245,124,0,0.25)] bg-[rgba(245,124,0,0.06)] p-5 text-sm leading-7 text-[color:var(--foreground)]">
          {errorMessage}
        </Card>
      ) : null}

      <Card className="mb-8 p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[1.5fr_0.75fr]">
          <label className="flex items-center gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-alt)] px-4 py-3">
            <span className="text-sm font-semibold text-[color:var(--muted)]">Cari</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Mis. sirah, fiqih, tafsir, anak"
              className="w-full bg-transparent text-sm text-[color:var(--foreground)] outline-none placeholder:text-[color:var(--muted)]"
              aria-label="Cari produk"
            />
          </label>

          <label className="flex items-center gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-alt)] px-4 py-3">
            <span className="text-sm font-semibold text-[color:var(--muted)]">Urutkan</span>
            <select
              value={sortMode}
              onChange={(event) => setSortMode(event.target.value)}
              className="w-full bg-transparent text-sm text-[color:var(--foreground)] outline-none"
              aria-label="Urutkan produk"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Harga termurah</option>
              <option value="price-desc">Harga tertinggi</option>
            </select>
          </label>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${activeCategory === "all" ? "bg-[color:var(--primary)] text-white" : "border border-[color:var(--border)] bg-white text-[color:var(--foreground)] hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]"}`}
          >
            Semua
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.name)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${activeCategory === category.name ? "bg-[color:var(--secondary)] text-white" : "border border-[color:var(--border)] bg-white text-[color:var(--foreground)] hover:border-[color:var(--secondary)] hover:text-[color:var(--secondary)]"}`}
            >
              {category.name}
            </button>
          ))}
          {(activeCategory !== "all" || query.length > 0) && (
            <button
              type="button"
              onClick={() => {
                setActiveCategory("all");
                setQuery("");
              }}
              className="ml-auto text-sm font-medium text-[color:var(--secondary)] transition-colors hover:text-[color:var(--primary)]"
            >
              Reset filter
            </button>
          )}
        </div>
      </Card>

      {visibleProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} compact onViewDetail={setSelectedProduct} />
          ))}
        </div>
      ) : (
        <Card className="p-8 text-center text-[color:var(--muted)]">
          Produk tidak ditemukan untuk filter saat ini.
        </Card>
      )}

      {selectedProduct ? (
        <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      ) : null}
    </Section>
  );
}

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

function ProductDetailModal({ product, onClose }: { product: CatalogProduct; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[65] bg-black/35 p-4" role="dialog" aria-modal>
      <button type="button" aria-label="Tutup detail produk" className="absolute inset-0 h-full w-full cursor-default" onClick={onClose} />
      <Card className="relative mx-auto mt-8 w-full max-w-xl overflow-hidden bg-white" onClick={(event) => event.stopPropagation()}>
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={product.imageUrl} alt={product.title} className="h-64 w-full object-cover" />
          <button type="button" onClick={onClose} className="absolute right-3 top-3 rounded-full bg-white px-3 py-1 text-sm">
            Tutup
          </button>
        </div>
        <div className="space-y-4 p-6">
          <p className="text-sm font-medium text-[color:var(--secondary)]">{product.category}</p>
          <h3 className="text-2xl font-semibold text-[color:var(--foreground)]">{product.title}</h3>
          <p className="text-sm leading-7 text-[color:var(--muted)]">{product.description}</p>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-[color:var(--surface-alt)] p-3">
              <p className="text-[color:var(--muted)]">Harga Awal</p>
              <p className="line-through">{currencyFormatter.format(product.originalPrice)}</p>
            </div>
            <div className="rounded-xl bg-[rgba(46,125,50,0.12)] p-3">
              <p className="text-[color:var(--muted)]">Harga Promo</p>
              <p className="font-semibold text-[color:var(--primary)]">{currencyFormatter.format(product.finalPrice)}</p>
            </div>
            <div className="rounded-xl bg-[color:var(--surface-alt)] p-3">
              <p className="text-[color:var(--muted)]">Diskon</p>
              <p>{product.discountPercent > 0 ? `${product.discountPercent}%` : "-"}</p>
            </div>
            <div className="rounded-xl bg-[color:var(--surface-alt)] p-3">
              <p className="text-[color:var(--muted)]">Stok</p>
              <p>{product.stock}</p>
            </div>
            <div className="rounded-xl bg-[color:var(--surface-alt)] p-3">
              <p className="text-[color:var(--muted)]">Berat</p>
              <p>{product.weight} gram</p>
            </div>
            <div className="rounded-xl bg-[color:var(--surface-alt)] p-3">
              <p className="text-[color:var(--muted)]">Status</p>
              <p>{product.preorder ? "Preorder" : "Ready Stock"}</p>
            </div>
          </div>
          <div className="flex justify-end">
            <a href={product.detailUrl} className="rounded-full bg-[color:var(--primary)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
              Buka Halaman Detail
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
}