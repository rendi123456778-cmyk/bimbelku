import { Star } from "lucide-react";
function BimbelCard({
  image,
  nama,
  harga,
  rating,
  status,
  onPilih,
  sudahDipilih,
}) {
  return (
    <div className="group flex h-full flex-col rounded-3xl border border-slate-100 dark:border-white/10 bg-card p-4 font-['Nunito',sans-serif] shadow-[0_2px_14px_rgba(45,55,72,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#389F97]/10 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      {/* image */}
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-100 dark:bg-white/10">
        <img
          src={image}
          alt={nama}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />

        <span
          className={`absolute left-3 top-3 rounded-full bg-card px-3.5 py-1 text-xs font-bold shadow-sm ${
            status === "Online"
              ? "text-[#2f8a83] dark:text-[#6fd0c7]"
              : "text-[#d9603a]"
          }`}
        >
          {status}
        </span>
      </div>

      {/* content */}
      <div className="flex flex-1 flex-col px-2 pb-1 pt-5">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-['Fredoka',sans-serif] text-xl font-semibold leading-snug text-ink">
            {nama}
          </h2>
        </div>

        <div className="flex items-center gap-1.5">
          <span>
            <Star className="h-5 w-5 fill-[#F9C851] text-[#F9C851]" />
          </span>

          <span className="text-sm font-bold text-ink">{rating}</span>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-muted">
          Bimbingan belajar dengan materi lengkap dan tutor berpengalaman.
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 dark:border-white/10 pt-5">
          <div>
            <p className="text-xs font-semibold text-muted">Mulai dari</p>

            <p className="font-['Fredoka',sans-serif] text-lg font-semibold text-[#389F97]">
              {harga}
            </p>
          </div>

          {!sudahDipilih ? (
            <button
              onClick={onPilih}
              className="rounded-full bg-[#389F97] px-5 py-2.5 font-['Fredoka',sans-serif] text-sm font-medium tracking-wide text-white shadow-md shadow-[#389F97]/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#2f8a83] hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#389F97]/30 active:scale-95 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              Lihat Detail
            </button>
          ) : (
            <button
              disabled
              className="cursor-not-allowed rounded-full bg-slate-100 dark:bg-white/10 px-5 py-2.5 font-['Fredoka',sans-serif] text-sm font-medium text-muted"
            >
              Dipilih
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default BimbelCard;
