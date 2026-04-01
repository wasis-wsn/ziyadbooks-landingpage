import Image from "next/image";
import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getZiyadBookBySlug } from "@/services/api/ziyadbooks";

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export async function generateMetadata(props: PageProps<"/produk/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const product = await getZiyadBookBySlug(slug);

  if (!product) {
    return {
      title: "Produk tidak ditemukan",
      description: "Produk yang Anda cari tidak ditemukan di katalog Ziyad Books.",
    };
  }

  const productTitle = `${product.title} | Ziyad Books`;
  const productDescription = product.description;

  return {
    title: productTitle,
    description: productDescription,
    openGraph: {
      title: productTitle,
      description: productDescription,
      type: "website",
      images: [
        {
          url: product.imageUrl,
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: productTitle,
      description: productDescription,
      images: [product.imageUrl],
    },
  };
}

export default async function ProductDetailPage(props: PageProps<"/produk/[slug]">) {
  const { slug } = await props.params;
  const product = await getZiyadBookBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <Card className="overflow-hidden bg-white">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative min-h-72">
            <Image src={product.imageUrl} alt={product.title} fill className="object-cover" sizes="(min-width: 1024px) 42vw, 100vw" priority />
          </div>
          <div className="space-y-4 p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--secondary)]">{product.category}</p>
            <h1 className="text-3xl font-semibold tracking-tight text-[color:var(--foreground)]">{product.title}</h1>
            <p className="text-base leading-8 text-[color:var(--muted)]">{product.description}</p>

            <div className="rounded-2xl bg-[color:var(--surface-alt)] p-4">
              {product.discountPercent > 0 ? (
                <p className="text-sm text-[color:var(--muted)] line-through">{currencyFormatter.format(product.originalPrice)}</p>
              ) : null}
              <p className="text-3xl font-bold text-[color:var(--primary)]">{currencyFormatter.format(product.finalPrice)}</p>
              {product.discountPercent > 0 ? (
                <span className="mt-2 inline-block rounded-full bg-[color:var(--secondary)] px-3 py-1 text-xs font-bold text-white">
                  Diskon {product.discountPercent}%
                </span>
              ) : null}
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <Meta label="Stok" value={`${product.stock}`} />
              <Meta label="Berat" value={`${product.weight} gram`} />
              <Meta label="Status" value={product.preorder ? "Preorder" : "Ready Stock"} />
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button href="https://shopee.co.id/ziyadbooks_official" target="_blank" rel="noreferrer">
                Beli Sekarang
              </Button>
              <Button href="/" variant="secondary">
                Kembali ke Landing Page
              </Button>
            </div>
          </div>
        </div>
      </Card>
      <p className="mt-4 text-center text-sm text-[color:var(--muted)]">
        Data detail diambil dari katalog yang tersedia saat ini.
      </p>
    </main>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[color:var(--border)] bg-white p-3">
      <p className="text-[color:var(--muted)]">{label}</p>
      <p className="font-medium text-[color:var(--foreground)]">{value}</p>
    </div>
  );
}