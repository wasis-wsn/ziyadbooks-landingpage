import type { CatalogProduct, ProductCategory } from "@/types/catalog";

import { buildCoverArt, inferCategoryFromName, isPlainObject, slugify, toBoolean, toNumber, toText } from "./helpers";

export function extractRecords(payload: unknown): Record<string, unknown>[] {
  const collected: Record<string, unknown>[] = [];
  const stack: unknown[] = [payload];

  while (stack.length > 0) {
    const current = stack.shift();

    if (Array.isArray(current)) {
      current.forEach((item) => stack.push(item));
      continue;
    }

    if (!isPlainObject(current)) {
      continue;
    }

    for (const key of ["data", "result", "items", "products", "category", "categories", "rows"] as const) {
      const value = current[key];

      if (Array.isArray(value)) {
        collected.push(...value.filter(isPlainObject));
      } else if (isPlainObject(value)) {
        stack.push(value);
      }
    }

    if (collected.length > 0) {
      return collected;
    }
  }

  return Array.isArray(payload) ? payload.filter(isPlainObject) : [];
}

export function normalizeProduct(item: Record<string, unknown>, index: number): CatalogProduct | null {
  const title = toText(item.title ?? item.name ?? item.product_name ?? item.nama_produk);
  const category =
    toText(item.category ?? item.category_name ?? item.group ?? item.kategori) ||
    inferCategoryFromName(title, toBoolean(item.preorder));

  if (!title) {
    return null;
  }

  const id = toText(item.id ?? item.product_id ?? item.uuid ?? item.code ?? item.sku) || `${slugify(title)}-${index}`;
  const slug = toText(item.slug ?? item.product_slug ?? item.url_key) || slugify(title);

  const description =
    toText(item.description ?? item.short_description ?? item.summary ?? item.deskripsi) ||
    `Katalog buku Islami dari Ziyad Books dalam kategori ${category || "pilihan pembaca"}.`;

  const originalPrice = toNumber(item.price ?? item.normal_price ?? item.selling_price ?? item.harga);

  const finalPriceCandidate = toNumber(item.final_price ?? item.discounted_price ?? item.price_after_discount);
  const finalPrice = finalPriceCandidate > 0 ? finalPriceCandidate : originalPrice;

  const discountPercentCandidate = toNumber(item.diskon ?? item.potongan ?? item.discount_percent ?? item.discount);
  const discountPercent =
    discountPercentCandidate > 0
      ? Math.min(99, discountPercentCandidate)
      : finalPrice < originalPrice && originalPrice > 0
        ? Math.round(((originalPrice - finalPrice) / originalPrice) * 100)
        : 0;

  const imageUrl =
    toText(item.image_url ?? item.image ?? item.thumbnail ?? item.cover ?? item.photo ?? item.picture) ||
    buildCoverArt(title, "#2E7D32", "#F57C00");

  const detailUrl = `/produk/${slug}`;

  const stock = toNumber(item.sisastok ?? item.stock ?? item.available_stock ?? item.sisa_stok);
  const weight = toNumber(item.weight ?? item.berat);
  const preorder = toBoolean(item.preorder);

  const isBestSeller = toBoolean(item.is_best_seller ?? item.best_seller ?? item.highlighted ?? item.popular) || stock >= 200;
  const isFeatured = toBoolean(item.is_featured ?? item.featured ?? item.recommended) || finalPrice >= 100000;

  return {
    id,
    slug,
    title,
    category: category || "Katalog Buku",
    originalPrice,
    finalPrice,
    discountPercent,
    imageUrl,
    description,
    detailUrl,
    stock,
    weight,
    preorder,
    isBestSeller,
    isFeatured,
  };
}

export function buildCategories(products: CatalogProduct[]): ProductCategory[] {
  const palette = [
    "from-[#2E7D32] to-[#1B5E20]",
    "from-[#F57C00] to-[#E65100]",
    "from-[#1565C0] to-[#0D47A1]",
    "from-[#6A1B9A] to-[#4A148C]",
    "from-[#00897B] to-[#00695C]",
  ];

  const grouped = products.reduce<Record<string, CatalogProduct[]>>((accumulator, product) => {
    const key = product.category || "Katalog Buku";
    accumulator[key] ??= [];
    accumulator[key].push(product);
    return accumulator;
  }, {});

  return Object.entries(grouped).map(([name, items], index) => ({
    id: slugify(name),
    name,
    description: describeCategory(name),
    count: items.length,
    coverUrl: buildCoverArt(name, index % 2 === 0 ? "#2E7D32" : "#F57C00", index % 2 === 0 ? "#F57C00" : "#2E7D32"),
    accent: palette[index % palette.length] ?? palette[0],
  }));
}

export function pickFeaturedProducts(products: CatalogProduct[]): CatalogProduct[] {
  const featured = products.filter((product) => product.isFeatured || product.isBestSeller);

  if (featured.length >= 4) {
    return featured.slice(0, 4);
  }

  return [...featured, ...products.filter((product) => !featured.includes(product))].slice(0, 4);
}

function describeCategory(name: string): string {
  if (/promo|buy1get1/i.test(name)) {
    return "Penawaran promo spesial dengan harga bundling lebih hemat.";
  }

  if (/preorder|custom/i.test(name)) {
    return "Katalog pre-order untuk produk personalisasi dan rilis terbatas.";
  }

  if (/sirah|sejarah/i.test(name)) {
    return "Pelajaran kisah Nabi dan perjalanan sejarah Islam.";
  }

  if (/tafsir/i.test(name)) {
    return "Pemahaman ayat dengan bahasa yang sistematis dan mudah dicerna.";
  }

  if (/fiqih|fiqh/i.test(name)) {
    return "Panduan ibadah dan muamalah yang praktis untuk keseharian.";
  }

  if (/anak|remaja/i.test(name)) {
    return "Materi ringan, visual, dan ramah untuk pembaca muda.";
  }

  if (/doa|dzikir/i.test(name)) {
    return "Rangkuman amalan harian yang ringkas dan aplikatif.";
  }

  return "Koleksi buku terkurasi dengan fokus pada ilmu, adab, dan pengamalan.";
}
