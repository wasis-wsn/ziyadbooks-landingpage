export default function Loading() {
  return (
    <div className="min-h-screen bg-[color:var(--background)] text-[color:var(--foreground)]">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="h-11 w-40 rounded-2xl bg-black/5" />
        <div className="hidden h-10 w-72 rounded-full bg-black/5 lg:block" />
        <div className="h-11 w-32 rounded-full bg-black/5" />
      </div>

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-5">
            <div className="h-8 w-64 rounded-full bg-black/5" />
            <div className="h-20 w-full rounded-[28px] bg-black/5" />
            <div className="h-24 w-[92%] rounded-[28px] bg-black/5" />
            <div className="flex gap-4">
              <div className="h-12 w-40 rounded-full bg-black/5" />
              <div className="h-12 w-44 rounded-full bg-black/5" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="h-[26rem] rounded-[32px] bg-black/5" />
            <div className="grid gap-4">
              <div className="h-[8rem] rounded-[28px] bg-black/5" />
              <div className="h-[8rem] rounded-[28px] bg-black/5" />
              <div className="h-[8rem] rounded-[28px] bg-black/5" />
            </div>
          </div>
        </div>

        <div className="mt-20 space-y-6">
          <div className="h-9 w-72 rounded-full bg-black/5" />
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-[27rem] rounded-[28px] bg-black/5" />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}