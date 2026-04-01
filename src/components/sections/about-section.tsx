import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";

export function AboutSection() {
  return (
    <Section
      id="tentang"
      eyebrow="Tentang Ziyadbooks"
      title="Penerbit buku anak Islami dari Surakarta sejak 2005"
      description="Ziyadbooks (PT Ziyad Visi Media) menghadirkan buku anak dari usia balita hingga SD dengan konten edukatif, Islami, dan ramah tumbuh kembang."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <Card className="relative overflow-hidden border-[color:var(--border)] bg-[linear-gradient(135deg,rgba(46,125,50,0.1),rgba(255,255,255,0.96))] p-6 sm:p-8">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[rgba(46,125,50,0.12)] blur-3xl" />
          <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-[rgba(245,124,0,0.12)] blur-3xl" />

          <div className="relative space-y-6">
            <div className="flex flex-wrap gap-2">
              <Badge>Surakarta</Badge>
              <Badge>Sejak 2005</Badge>
              <Badge>PT Ziyad Visi Media</Badge>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--primary)]">Profil singkat</p>
              <h3 className="mt-3 text-3xl font-semibold tracking-tight text-[color:var(--foreground)]">
                Buku Islami yang dekat dengan keluarga dan ramah untuk anak.
              </h3>
              <p className="mt-4 max-w-xl text-base leading-8 text-[color:var(--muted)]">
                Ziyadbooks hadir dengan kurasi buku anak yang hangat, edukatif, dan mudah dinikmati, dari balita sampai
                sekolah dasar.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <InfoTile label="Konten" value="Karakter Islami" />
              <InfoTile label="Format" value="Boardbook & Soundbook" />
              <InfoTile label="Belajar" value="PAUD/TK" />
            </div>
          </div>
        </Card>

        <div className="grid gap-5">
          <Card className="p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--primary)]">Yang Kami Hadirkan</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <FeatureTile title="Nilai Islami" description="Cerita nabi, kisah hewan Al-Qur&apos;an, dan panduan ibadah." />
              <FeatureTile title="Tumbuh Kembang" description="Buku taktil, boardbook, dan soundbook untuk stimulasi anak." />
              <FeatureTile title="Penunjang Belajar" description="Aktivitas PAUD/TK dan metode lancar membaca." />
              <FeatureTile title="Kemitraan" description="Distributor dan dropshipper untuk memperluas jangkauan." />
            </div>
          </Card>

          <Card className="overflow-hidden bg-[linear-gradient(135deg,rgba(245,124,0,0.08),rgba(255,255,255,0.95))] p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--secondary)]">Ziyad Partner</p>
            <p className="mt-4 text-base leading-8 text-[color:var(--muted)]">
              Program kemitraan kami terbuka untuk masyarakat umum. Anda bisa bergabung sebagai distributor yang
              menyetok produk, atau dropshipper yang menjual tanpa harus menyimpan stok sendiri.
            </p>
          </Card>
        </div>
      </div>
    </Section>
  );
}

function Badge({ children }: { children: string }) {
  return <span className="rounded-full border border-[color:var(--border)] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">{children}</span>;
}

function FeatureTile({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-[20px] border border-[color:var(--border)] bg-white p-4 shadow-sm">
      <p className="text-sm font-semibold text-[color:var(--foreground)]">{title}</p>
      <p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">{description}</p>
    </div>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[24px] border border-[color:var(--border)] bg-white p-5 text-center shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--muted)]">{label}</p>
      <p className="mt-3 text-xl font-semibold text-[color:var(--foreground)]">{value}</p>
    </div>
  );
}