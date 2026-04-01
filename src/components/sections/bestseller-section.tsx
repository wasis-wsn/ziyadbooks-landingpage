import type { CatalogProduct } from "@/types/catalog";

import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { Section } from "@/components/ui/section";

interface BestSellerSectionProps {
  products: CatalogProduct[];
}

export function BestSellerSection({ products }: BestSellerSectionProps) {
  return (
    <Section
      id="best-seller"
      eyebrow="Highlight"
      title="Best seller yang paling layak disorot"
      description="Sorotan horizontal memudahkan pembaca menangkap judul paling populer tanpa mengganggu alur halaman."
      action={<Button href="#katalog" variant="secondary">Lihat semua</Button>}
    >
      <div className="-mx-4 overflow-x-auto px-4 pb-4">
        <div className="flex min-w-max gap-5">
          {products.map((product) => (
            <div key={product.id} className="w-[18rem] sm:w-[20rem]">
              <ProductCard product={product} compact />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}