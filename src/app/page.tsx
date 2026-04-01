import type { Metadata } from "next";

import { AboutSection } from "@/components/sections/about-section";
import { BestSellerSection } from "@/components/sections/bestseller-section";
import { CatalogSection } from "@/components/sections/catalog-section";
import { CtaBanner } from "@/components/sections/cta-banner";
import { HeroSection } from "@/components/sections/hero-section";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { getZiyadBooksCatalog } from "@/services/api/ziyadbooks";

export const metadata: Metadata = {
  title: "Ziyad Books",
  description:
    "Jelajahi katalog buku Islami Ziyad Books dengan pengalaman belanja modern, cepat, dan responsif.",
  openGraph: {
    title: "Ziyad Books",
    description:
      "Jelajahi katalog buku Islami Ziyad Books dengan pengalaman belanja modern, cepat, dan responsif.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ziyad Books",
    description:
      "Jelajahi katalog buku Islami Ziyad Books dengan pengalaman belanja modern, cepat, dan responsif.",
  },
};

export default async function Home() {
  const catalog = await getZiyadBooksCatalog();

  const hasProducts = catalog.products.length > 0;
  const hasFeatured = catalog.featuredProducts.length > 0;

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        {hasProducts ? (
          <CatalogSection
            products={catalog.products}
            categories={catalog.categories}
            errorMessage={catalog.errorMessage}
          />
        ) : null}
        {hasFeatured ? <BestSellerSection products={catalog.featuredProducts} /> : null}
        <AboutSection />
        <CtaBanner />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Ziyad Books",
            url: "https://ziyadbooks.com",
            description:
              "Penerbit buku Islami modern dengan katalog yang kuratif dan pengalaman belanja yang cepat.",
          }),
        }}
      />
    </>
  );
}
