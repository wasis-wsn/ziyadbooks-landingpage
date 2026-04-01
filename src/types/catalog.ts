export type CatalogSource = "api" | "fallback";

export interface CatalogProduct {
  id: string;
  slug: string;
  title: string;
  category: string;
  originalPrice: number;
  finalPrice: number;
  discountPercent: number;
  imageUrl: string;
  description: string;
  detailUrl: string;
  stock: number;
  weight: number;
  preorder: boolean;
  isBestSeller: boolean;
  isFeatured: boolean;
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  count: number;
  coverUrl: string;
  accent: string;
}

export interface CatalogData {
  source: CatalogSource;
  errorMessage: string | null;
  updatedAt: string;
  products: CatalogProduct[];
  categories: ProductCategory[];
  featuredProducts: CatalogProduct[];
}