import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import BimbelkuContext from "../context/BimbelkuContext";
import { Star, Book } from "lucide-react";

function BimbelSaya() {
  const { bimbelDipilih, hapusRiwayat, setIdAktif } =
    useContext(BimbelkuContext);

  const navigate = useNavigate();

  const lihatDetail = (id) => {
    setIdAktif(id);
    navigate("/detail");
  };

  return (
    <main className="min-h-screen bg-canvas px-4 py-10 font-['Nunito',sans-serif] text-ink md:px-8 md:py-16">
      <div className="mx-auto max-w-6xl">
        {/* header */}
        <div className="mb-10 md:mb-14">
          <p className="text-sm font-bold text-[#389F97]">PEMBELAJARAN SAYA</p>

          <h1 className="mt-2 font-['Fredoka',sans-serif] text-4xl font-semibold leading-tight text-ink md:text-5xl">
            Bimbel Saya
          </h1>

          <span className="mt-4 block h-1.5 w-16 rounded-full bg-[#F9C851]" />

          <p className="mt-4 max-w-prose text-base text-muted md:text-lg">
            Daftar bimbel yang sedang kamu ikuti.
          </p>
        </div>

        {/* empty state */}
        {bimbelDipilih.length === 0 ? (
          <div className="mx-auto max-w-2xl rounded-3xl border-2 border-dashed border-slate-200 dark:border-white/15 bg-card px-6 py-14 text-center md:py-16">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#389F97]/10">
              <Book className="h-7 w-7 text-[#389F97]" />
            </div>

            <h2 className="mt-6 font-['Fredoka',sans-serif] text-2xl font-semibold text-ink">
              Belum ada bimbel
            </h2>

            <p className="mx-auto mt-2 max-w-md text-muted">
              Kamu belum mengikuti bimbel apa pun. Yuk cari bimbel yang sesuai
              dengan kebutuhanmu.
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-8 rounded-full bg-[#389F97] px-8 py-3.5 font-['Fredoka',sans-serif] font-medium tracking-wide text-white shadow-md shadow-[#389F97]/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#2f8a83] hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#389F97]/30 active:scale-95 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              Cari Bimbel
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {bimbelDipilih.map((bimbel) => (
              <article
                key={bimbel.id}
                className="group rounded-3xl border border-slate-100 dark:border-white/10 bg-card p-4 shadow-[0_2px_14px_rgba(45,55,72,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#389F97]/10 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                {/* image */}
                <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-100 dark:bg-white/10">
                  <img
                    src={bimbel.gambar}
                    alt={bimbel.nama}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />

                  <span className="absolute left-3 top-3 rounded-full bg-card px-3.5 py-1.5 text-sm font-bold text-[#b7791f] shadow-sm">
                    ● Menunggu Konfirmasi
                  </span>
                </div>

                {/* content */}
                <div className="px-2 pb-2 pt-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-['Fredoka',sans-serif] text-2xl font-semibold leading-snug text-ink">
                        {bimbel.nama}
                      </h2>

                      <div className="mt-1.5 flex items-center gap-1.5">
                        <span>
                          {" "}
                          <Star className="h-5 w-5 fill-[#F9C851] text-[#F9C851]" />
                        </span>

                        <span className="text-sm font-bold text-ink">
                          {bimbel.rating}
                        </span>
                      </div>
                    </div>

                    <span className="shrink-0 rounded-full bg-[#389F97]/10 px-3.5 py-1 text-xs font-bold text-[#2f8a83] dark:text-[#6fd0c7]">
                      {bimbel.status}
                    </span>
                  </div>

                  {/* info */}
                  <div className="mt-5 grid grid-cols-2 divide-x divide-slate-200/80 dark:divide-white/10 rounded-2xl border border-slate-100 dark:border-white/10 bg-canvas">
                    <div className="px-5 py-4">
                      <p className="text-xs font-semibold text-muted">Paket</p>

                      <p className="mt-1 text-lg font-bold text-ink">Reguler</p>
                    </div>

                    <div className="px-5 py-4">
                      <p className="text-xs font-semibold text-muted">Biaya</p>

                      <p className="mt-1 text-lg font-bold text-[#389F97]">
                        {bimbel.harga}
                      </p>
                    </div>
                  </div>

                  {/* progress */}
                  <div className="mt-6">
                    <div className="mb-2.5 flex items-center justify-between text-sm">
                      <span className="font-semibold text-muted">
                        Progress belajar
                      </span>

                      <span className="rounded-full bg-[#F9C851]/30 px-2.5 py-0.5 font-bold text-ink">
                        25%
                      </span>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-[#389F97]/10">
                      <div className="relative h-full w-1/4 rounded-full bg-[#389F97] after:absolute after:right-1 after:top-1/2 after:h-1.5 after:w-1.5 after:-translate-y-1/2 after:rounded-full after:bg-white/80" />
                    </div>
                  </div>

                  {/* button */}
                  <div className="mt-7 flex gap-3">
                    <button
                      onClick={() => lihatDetail(bimbel.id)}
                      className="flex-1 rounded-full bg-[#389F97] px-6 py-3 font-['Fredoka',sans-serif] font-medium tracking-wide text-white shadow-md shadow-[#389F97]/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#2f8a83] hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#389F97]/30 active:scale-95 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                    >
                      Lihat Detail
                    </button>

                    <button
                      onClick={() => hapusRiwayat(bimbel.id)}
                      className="rounded-full border-2 border-slate-200 dark:border-white/15 px-5 py-3 font-['Fredoka',sans-serif] font-medium text-muted transition-colors duration-200 hover:border-[#F27A54] hover:bg-[#F27A54]/10 hover:text-[#F27A54] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F27A54]/25 motion-reduce:transition-none"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default BimbelSaya;
