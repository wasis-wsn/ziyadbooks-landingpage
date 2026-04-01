import type { CatalogData, CatalogProduct, ProductCategory } from "@/types/catalog";

import { API_URL, FALLBACK_MESSAGE, REVALIDATE_SECONDS } from "./ziyadbooks/constants";
import { FALLBACK_PRODUCTS } from "./ziyadbooks/fallback-data";
import { buildCategories, extractRecords, normalizeProduct, pickFeaturedProducts } from "./ziyadbooks/transformers";

const FALLBACK_CATEGORIES: ProductCategory[] = buildCategories(FALLBACK_PRODUCTS);
const FALLBACK_FEATURED_PRODUCTS = FALLBACK_PRODUCTS.filter((product) => product.isFeatured);

export async function getZiyadBooksCatalog(): Promise<CatalogData> {
  const token = process.env.ZIYADBOOKS_BEARER_TOKEN?.trim();

  if (!token) {
    return {
      source: "fallback",
      errorMessage: FALLBACK_MESSAGE,
      updatedAt: new Date().toISOString(),
      products: FALLBACK_PRODUCTS,
      categories: FALLBACK_CATEGORIES,
      featuredProducts: FALLBACK_FEATURED_PRODUCTS,
    };
  }

  try {
    const response = await fetch(API_URL, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: REVALIDATE_SECONDS,
        tags: ["ziyadbooks-products"],
      },
    });

    if (!response.ok) {
      throw new Error(`API products request failed with status ${response.status}.`);
    }

    const payload: unknown = await response.json();
    const rawProducts = extractRecords(payload);
    const products = rawProducts.map((item, index) => normalizeProduct(item, index)).filter(Boolean) as CatalogProduct[];

    if (products.length === 0) {
      throw new Error("API tidak mengembalikan data produk yang dapat dipetakan.");
    }

    const categories = buildCategories(products);
    const featuredProducts = pickFeaturedProducts(products);

    return {
      source: "api",
      errorMessage: null,
      updatedAt: new Date().toISOString(),
      products,
      categories,
      featuredProducts,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Gagal memuat katalog Ziyad Books.";

    return {
      source: "fallback",
      errorMessage: `${message} Menampilkan katalog kurasi sebagai fallback.`,
      updatedAt: new Date().toISOString(),
      products: FALLBACK_PRODUCTS,
      categories: FALLBACK_CATEGORIES,
      featuredProducts: FALLBACK_FEATURED_PRODUCTS,
    };
  }
}

export async function getZiyadBookBySlug(slug: string): Promise<CatalogProduct | null> {
  const catalog = await getZiyadBooksCatalog();
  const product = catalog.products.find((item) => item.slug === slug);
  return product ?? null;
}