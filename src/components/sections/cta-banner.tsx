import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function CtaBanner() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Card className="overflow-hidden bg-gradient-to-br from-[color:var(--primary)] via-[#2f8b37] to-[#17471b] p-8 text-white shadow-[0_30px_80px_-45px_rgba(46,125,50,0.9)] sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.34em] text-white/70">Ready to explore</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Temukan buku Islami berikutnya dan buat pengalaman belanja terasa lebih meyakinkan.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-8 text-white/80 sm:text-lg">
                Jelajahi katalog, pilih kategori yang relevan, dan lanjutkan ke tindakan yang paling bernilai untuk
                pembaca atau keluarga Anda.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Button href="#katalog" variant="primary" className="bg text-[#17471b] hover:bg-white/40">
                Belanja Sekarang
              </Button>
              <Button href="#kontak" variant="secondary" className="border-white/20 bg-white/10 text-white hover:border-white/30 hover:bg-white/50">
                Hubungi Kami
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}