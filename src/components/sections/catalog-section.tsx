"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Harga termurah" },
  { value: "price-desc", label: "Harga tertinggi" },
];

export function CatalogSection({ products, categories, errorMessage }: CatalogSectionProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortMode, setSortMode] = useState("featured");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct | null>(null);
  const sortDropdownRef = useRef<HTMLDivElement | null>(null);
  const debouncedQuery = useDebouncedValue(query, 180);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!sortDropdownRef.current) {
        return;
      }

      if (!sortDropdownRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const activeSortLabel = useMemo(() => {
    const option = sortOptions.find((item) => item.value === sortMode);
    return option?.label ?? "Featured";
  }, [sortMode]);

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

          <div ref={sortDropdownRef} className="relative">
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-alt)] px-4 py-3">
              <span className="text-sm font-semibold text-[color:var(--muted)]">Urutkan</span>
              <button
                type="button"
                onClick={() => setIsSortOpen((current) => !current)}
                aria-haspopup="listbox"
                aria-expanded={isSortOpen}
                className="inline-flex min-w-[10rem] items-center justify-between gap-2 rounded-xl border border-[color:var(--border)] bg-white px-3 py-2 text-left text-sm font-medium text-[color:var(--foreground)] shadow-sm transition-colors hover:border-[color:var(--secondary)]"
              >
                <span>{activeSortLabel}</span>
                <svg
                  viewBox="0 0 24 24"
                  className={`h-4 w-4 transition-transform ${isSortOpen ? "rotate-180" : "rotate-0"}`}
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {isSortOpen ? (
              <div className="absolute right-0 top-[calc(100%+0.55rem)] z-20 w-[12rem] overflow-hidden rounded-2xl border border-[color:var(--border)] bg-white shadow-[0_22px_48px_-35px_rgba(15,23,42,0.5)]">
                <ul role="listbox" aria-label="Urutkan produk" className="p-2">
                  {sortOptions.map((option) => (
                    <li key={option.value}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={sortMode === option.value}
                        onClick={() => {
                          setSortMode(option.value);
                          setIsSortOpen(false);
                        }}
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors ${sortMode === option.value ? "bg-[rgba(245,124,0,0.14)] font-semibold text-[color:var(--secondary)]" : "text-[color:var(--foreground)] hover:bg-[color:var(--surface-alt)]"}`}
                      >
                        {option.label}
                        {sortMode === option.value ? (
                          <span className="text-xs font-bold uppercase tracking-[0.24em]">Aktif</span>
                        ) : null}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
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