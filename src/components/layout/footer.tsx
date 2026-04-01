/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

const footerLinks = [
  { label: "Katalog", href: "#katalog" },
  { label: "Best Seller", href: "#best-seller" },
  { label: "Tentang", href: "#tentang" },
];

const socialLinks = [
  {
    label: "Shopee",
    href: "https://shopee.co.id/ziyadbooks_official",
    icon: ShopeeIcon,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/ziyadbooks/about/",
    icon: FacebookIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/ziyadbooks.official/?hl=id",
    icon: InstagramIcon,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/6282243431114",
    icon: WhatsAppIcon,
  },
  {
    label: "Telegram",
    href: "https://t.me/ZiyadbooksOfficial",
    icon: TelegramIcon,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@ziyadbooks.official",
    icon: TikTokIcon,
  },
];

export function Footer() {
  const logos = [
    "/pembayaran/Bank%20BCA%20Logo%20(SVG-480p)%20-%20FileVector69.svg",
    "/pembayaran/bni.svg",
    "/pembayaran/Bank%20BRI%20(Bank%20Rakyat%20Indonesia)%20Logo%20(SVG-480p)%20-%20FileVector69.svg",
    "/pembayaran/BSI%20(Bank%20Syariah%20Indonesia)%20Logo%20(SVG)%20-%20Vector69Com.svg",
    "/pembayaran/JNE%20Express%20Logo%20(SVG-480p)%20-%20Vector69Com.svg",
    "/pembayaran/J%26T%20Express%20Logo%20(SVG-480p)%20-%20Vector69Com.svg",
    "/pembayaran/SiCepat%20Ekspres%20Logo%20(SVG-480p)%20-%20Vector69Com.svg",
    "/pembayaran/Logo%20TIKI.svg",
    "/pembayaran/Wahana%20Express%20Logo%20(SVG-480p)%20-%20Vector69Com.svg",
    "/pembayaran/POS%20Indonesia%20Logo%20(PNG480p)%20-%20Vector69Com.png",
  ];

  return (
    <footer id="kontak" className="border-t border-[color:var(--border)] bg-[color:var(--surface)]">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.4fr_0.8fr_1fr] lg:px-8">
        <div>
          <p className="text-2xl font-semibold tracking-tight text-[color:var(--foreground)]">Ziyad Books</p>
          <p className="mt-4 max-w-md text-base leading-8 text-[color:var(--muted)]">
            Penerbit buku Islami modern yang menghadirkan bacaan bermutu untuk keluarga, pelajar, dan pembaca yang
            ingin mendekat pada ilmu dengan cara yang hangat serta relevan.
          </p>
          <div className="mt-6 space-y-2 text-sm text-[color:var(--muted)]">
            <p className="font-semibold text-[color:var(--foreground)]">Got Question? Call Us 24/7</p>
            <p>0271-727027</p>
            <p>Jl. Banyuanyar Selatan No.01, RT.02/RW.XII, Banyuanyar, Kec. Banjarsari, Kota Surakarta, Jawa Tengah 57137</p>
            <p>Informasi & Layanan : official@ziyadbooks.com</p>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--primary)]">Link Cepat</p>
          <ul className="mt-5 space-y-3 text-sm text-[color:var(--muted)]">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="transition-colors hover:text-[color:var(--primary)]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--primary)]">Ikuti Kami</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface-alt)] text-[color:var(--foreground)] transition-transform hover:-translate-y-0.5 hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]"
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto mb-12 mt-2 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--primary)]">Pembayaran & Pengiriman</p>
        <div className="mt-5 grid grid-cols-2 gap-4 rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface-alt)] p-4 sm:grid-cols-3 lg:grid-cols-5">
          {logos.map((logo) => (
            <div key={logo} className="flex h-16 items-center justify-center rounded-2xl bg-white p-3">
              <img src={logo} alt="Partner Pembayaran dan Pengiriman" className="max-h-10 w-auto object-contain" />
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-[color:var(--border)]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-5 text-sm text-[color:var(--muted)] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© 2026 Ziyad Books. All rights reserved.</p>
          <p>Dirancang untuk katalog, discovery, dan konversi yang lebih baik.</p>
        </div>
      </div>
    </footer>
  );
}

function ShopeeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M16.5 3.5H7.5A4.5 4.5 0 0 0 3 8v8.5A4.5 4.5 0 0 0 7.5 21h9A4.5 4.5 0 0 0 21 16.5V8a4.5 4.5 0 0 0-4.5-4.5ZM12 6.2c1.3 0 2.4.5 3.2 1.2l-.9 1.3a4 4 0 0 0-2.3-.8c-1 0-1.6.4-1.6 1 0 .5.4.8 1.7 1.1l1.1.2c1.8.4 2.8 1.3 2.8 2.8 0 1.8-1.7 3-4.1 3-1.5 0-2.8-.4-3.9-1.2l1-1.4c.9.7 1.8 1 3 1 .9 0 1.7-.4 1.7-1 0-.5-.4-.8-1.5-1l-1.2-.2c-2-.4-2.9-1.3-2.9-2.8 0-1.7 1.5-2.9 3.9-2.9Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7h2.3l.4-2.7h-2.7V9.6c0-.8.3-1.4 1.4-1.4h1.5V5.7c-.3 0-1.1-.1-2-.1-2 0-3.4 1.2-3.4 3.5v2.2H9V14h2v7h2.5Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="3.2" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M12 3.5A8.5 8.5 0 0 0 4.7 16.4L3.5 20.5l4.2-1.1A8.5 8.5 0 1 0 12 3.5Zm4.8 11.9c-.2.6-1 1-1.6 1-2.2 0-6-3.4-6.5-5.7-.1-.6.2-1.3.8-1.5l.8-.4c.3-.2.6-.1.8.2l1 1.8c.2.3.1.6-.1.8l-.4.4c.3.8 1.1 1.6 1.9 1.9l.4-.4c.2-.2.5-.3.8-.1l1.8 1c.3.2.4.5.3.8l-.2.2Z" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M20.7 4.9 3.8 11.5c-1.1.4-1.1 1.9.1 2.2l4.2 1.3 1.6 4.8c.3 1 1.6 1.2 2.2.3l2.4-3.1 4.4 3.3c.8.6 2 .1 2.2-.9l2-13.2c.2-1.1-.8-1.9-2-1.4Zm-5 4.4-6 5.2.2 3 1.8-2.4 4.1 3.2 3.3-10-3.4 1Z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M16.8 3c.4 2.8 1.9 4.6 4.2 4.8v3.2c-1.7.1-3.2-.4-4.4-1.4v5.7c0 3.2-2.5 5.7-5.7 5.7S5.2 18.5 5.2 15.3 7.7 9.6 10.9 9.6c.4 0 .8 0 1.2.1v3.4c-.4-.1-.8-.2-1.2-.2-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5c1.6 0 2.8-1.2 2.8-3V3h3.1Z" />
    </svg>
  );
}