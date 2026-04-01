"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const heroMetrics = [
  { value: "500+", label: "Judul terkurasi" },
  { value: "24/7", label: "Akses katalog" },
  { value: "4.9/5", label: "Ulasan pembaca" },
];

const sliderBanners = [
  {
    src: "/banner/1772685827_69a90a0351db9.webp",
    alt: "Bazaar Ramadan Ziyadbooks dengan diskon hingga 70 persen",
    eyebrow: "Event Utama",
    title: "Bazaar Ramadan",
    description: "Pilihan buku terbaik dengan harga lebih hemat untuk keluarga dan sekolah.",
    accent: "from-[#2E7D32] via-[#4CAF50] to-[#8BC34A]",
  },
  {
    src: "/banner/1772685817_69a909f99e714.webp",
    alt: "Cashback Ziyad Partner",
    eyebrow: "Ziyad Partner",
    title: "Cashback Bulanan",
    description: "Dapatkan tambahan diskon berupa cashback uang tunai untuk mitra aktif.",
    accent: "from-[#D84315] via-[#F57C00] to-[#FFB74D]",
  },
  {
    src: "/banner/1774573353_69c5d7293c12b.webp",
    alt: "Flashsale Spesial Ziyadbooks",
    eyebrow: "Flash Sale",
    title: "Spesial Syawal",
    description: "Promo terbatas untuk judul-judul pilihan dengan harga terbaik hari ini.",
    accent: "from-[#0D47A1] via-[#1976D2] to-[#64B5F6]",
  },
];

export function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % sliderBanners.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, []);

  const currentBanner = sliderBanners[activeSlide];

  return (
    <section id="home" className="relative overflow-hidden pt-8 sm:pt-12">
      <div className="absolute inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(circle_at_top_left,rgba(46,125,50,0.16),transparent_40%),radial-gradient(circle_at_top_right,rgba(245,124,0,0.12),transparent_34%),linear-gradient(to_bottom,rgba(255,255,255,0.8),transparent)]" />
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 pb-20 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:pb-28">
        <div className="max-w-2xl">
          <p className="inline-flex items-center rounded-full border border-[rgba(245,124,0,0.3)] bg-[rgba(245,124,0,0.12)] px-4 py-2 text-sm font-semibold text-[color:var(--secondary)] shadow-sm backdrop-blur">
            Koleksi buku Islami pilihan keluarga
          </p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-[color:var(--foreground)] sm:text-5xl lg:text-6xl">
            Nikmati pengalaman belanja buku Islami yang nyaman, seru, dan mudah untuk semua keluarga.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[color:var(--muted)] sm:text-xl">
            Temukan buku favorit, cek promo dengan jelas, simpan ke troli, lalu lanjut checkout ke kanal resmi dengan
            proses yang cepat dan praktis.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button href="#katalog" variant="primary" className="px-7 py-4 text-base">
              Jelajahi Katalog
            </Button>
            <Button href="#tentang" variant="secondary" className="px-7 py-4 text-base">
              Tentang Ziyad Books
            </Button>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {heroMetrics.map((metric) => (
              <Card key={metric.label} className="p-5">
                <p className="text-2xl font-semibold text-[color:var(--foreground)]">{metric.value}</p>
                <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{metric.label}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className={`absolute inset-0 -z-10 rounded-[2.5rem] bg-gradient-to-br ${currentBanner.accent} opacity-20 blur-3xl`} />
          <Card className="overflow-hidden border-[color:var(--border)] bg-white p-4 shadow-[0_30px_90px_-50px_rgba(15,23,42,0.45)] sm:p-5">
            <div className="relative overflow-hidden rounded-[28px] border border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(246,248,250,1))]">
              <div className="relative aspect-[4/5] w-full">
                {sliderBanners.map((banner, index) => (
                  <div
                    key={banner.src}
                    className={`absolute inset-0 transition-all duration-700 ease-out ${index === activeSlide ? "translate-x-0 opacity-100" : index < activeSlide ? "-translate-x-full opacity-0" : "translate-x-full opacity-0"}`}
                    aria-hidden={index !== activeSlide}
                  >
                    <Image src={banner.src} alt={banner.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" priority={index === 0} />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.22))]" />
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                      <div className="max-w-md rounded-[24px] bg-white/92 p-4 shadow-[0_16px_50px_-30px_rgba(15,23,42,0.7)] backdrop-blur">
                        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[color:var(--secondary)]">
                          {banner.eyebrow}
                        </p>
                        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[color:var(--foreground)]">
                          {banner.title}
                        </h2>
                        <p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">{banner.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-4 sm:px-5">
                <button
                  type="button"
                  onClick={() => setActiveSlide((current) => (current - 1 + sliderBanners.length) % sliderBanners.length)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border)] bg-white text-[color:var(--foreground)] transition-colors hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]"
                  aria-label="Banner sebelumnya"
                >
                  <span aria-hidden="true">‹</span>
                </button>

                <div className="flex items-center gap-2">
                  {sliderBanners.map((banner, index) => (
                    <button
                      key={banner.src}
                      type="button"
                      onClick={() => setActiveSlide(index)}
                      aria-label={`Tampilkan banner ${index + 1}`}
                      className={`h-2.5 rounded-full transition-all ${index === activeSlide ? "w-8 bg-[color:var(--primary)]" : "w-2.5 bg-[color:var(--border)] hover:bg-[color:var(--secondary)]"}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setActiveSlide((current) => (current + 1) % sliderBanners.length)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border)] bg-white text-[color:var(--foreground)] transition-colors hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]"
                  aria-label="Banner berikutnya"
                >
                  <span aria-hidden="true">›</span>
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}