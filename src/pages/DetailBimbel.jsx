import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import BimbelkuContext from "../context/BimbelkuContext";
import { ArrowLeft, Star } from "lucide-react";

function DetailBimbel() {
  const { idAktif, dataBimbel, tambahUlasan } = useContext(BimbelkuContext);

  const navigate = useNavigate();

  const [nama, setNama] = useState("");
  const [rating, setRating] = useState(0);
  const [komentar, setKomentar] = useState("");

  const bimbel = dataBimbel.find((item) => item.id === idAktif);

  if (!bimbel) {
    return (
      <div className="min-h-screen bg-canvas px-4 py-16 font-body md:px-8">
        <div className="mx-auto max-w-2xl rounded-3xl border-2 border-line bg-card p-8 text-center shadow-sm md:p-12">
          <h1 className="font-heading text-2xl font-bold text-ink">
            bimbel belum dipilih
          </h1>

          <p className="mt-2 text-muted">
            silakan pilih bimbel dari halaman beranda terlebih dahulu.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-8 rounded-full bg-primary px-8 py-3.5 font-heading font-semibold tracking-wide text-white transition-all hover:shadow-lg"
          >
            kembali ke beranda
          </button>
        </div>
      </div>
    );
  }

  const ulasan = bimbel.ulasan || [];

  const kirimUlasan = (e) => {
    e.preventDefault();

    if (!nama.trim() || rating === 0 || !komentar.trim()) {
      alert("nama, rating, dan ulasan harus diisi.");
      return;
    }

    tambahUlasan(bimbel.id, {
      nama: nama.trim(),
      rating,
      komentar: komentar.trim(),
    });

    setNama("");
    setRating(0);
    setKomentar("");

    alert("ulasan berhasil ditambahkan.");
  };

  return (
    <main className="min-h-screen bg-canvas px-4 pb-20 pt-6 font-body text-ink md:px-8 md:pt-10">
      <div className="mx-auto max-w-7xl">
        {/* kembali */}
        <button
          onClick={() => navigate(-1)}
          className="-ml-2 mb-6 inline-flex min-h-[44px] items-center gap-2 rounded-full px-3 font-heading font-semibold text-primary transition-colors hover:text-deep"
        >
          <ArrowLeft size={18} />
          kembali
        </button>

        {/* gambar */}
        <div className="h-64 overflow-hidden rounded-3xl bg-soft shadow-sm md:h-[28rem]">
          <img
            src={bimbel.gambar}
            alt={bimbel.nama}
            className="h-full w-full object-cover"
          />
        </div>

        {/* informasi utama */}
        <div className="mt-8 md:mt-10">
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-accent px-4 py-1 text-sm font-bold text-slate-800">
              {bimbel.kategori}
            </span>

            <span
              className={`rounded-full px-4 py-1 text-sm font-bold ${
                bimbel.status === "Online"
                  ? "bg-primary/15 text-primary"
                  : "bg-secondary/15 text-secondary"
              }`}
            >
              {bimbel.status}
            </span>
          </div>

          <h1 className="font-heading text-3xl font-bold leading-tight text-ink md:text-5xl">
            {bimbel.nama}
          </h1>

          {/* rating */}
          <div className="mt-3 flex items-center gap-2">
            <Star size={20} fill="currentColor" className="text-accent" />

            <span className="font-bold text-ink">{bimbel.rating}</span>

            <span className="text-muted">•</span>

            <span className="text-muted">{ulasan.length} ulasan</span>
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-3 lg:gap-16">
          {/* harga */}
          <aside className="order-first self-start lg:sticky lg:top-24 lg:order-last">
            <div className="rounded-3xl border-2 border-amber-200/50 bg-amber-50 p-6 dark:border-amber-900/40 dark:bg-amber-950/30 md:p-8">
              <p className="text-sm font-semibold text-muted">mulai dari</p>

              <p className="mt-1 font-heading text-4xl font-bold text-primary">
                {bimbel.harga}
              </p>

              <p className="text-sm font-semibold text-muted">/ bulan</p>

              <button
                onClick={() => navigate("/pendaftaran")}
                className="mt-6 w-full rounded-full bg-primary px-8 py-3.5 font-heading font-semibold tracking-wide text-white transition-all hover:bg-deep hover:shadow-lg"
              >
                saya berminat
              </button>
            </div>
          </aside>

          <div className="lg:col-span-2">
            {/* deskripsi */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-ink">
                tentang bimbel
              </h2>

              <p className="mt-3 max-w-prose text-lg leading-8 text-muted">
                {bimbel.deskripsi}
              </p>
            </div>

            {/* materi */}
            <div className="mt-10 border-t-2 border-line pt-10">
              <h2 className="font-heading text-2xl font-bold text-ink">
                materi pembelajaran
              </h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <span className="block border-l-4 border-secondary py-1 pl-4 font-bold text-ink">
                  materi dasar
                </span>

                <span className="block border-l-4 border-secondary py-1 pl-4 font-bold text-ink">
                  latihan soal
                </span>

                <span className="block border-l-4 border-secondary py-1 pl-4 font-bold text-ink">
                  pembahasan
                </span>

                <span className="block border-l-4 border-secondary py-1 pl-4 font-bold text-ink">
                  try out
                </span>
              </div>
            </div>

            {/* ulasan */}
            <div className="mt-10 border-t-2 border-line pt-10">
              <h2 className="font-heading text-2xl font-bold text-ink">
                ulasan siswa
              </h2>

              {/* daftar ulasan */}
              <div className="mt-5 space-y-4">
                {ulasan.length === 0 ? (
                  <p className="text-muted">belum ada ulasan.</p>
                ) : (
                  ulasan.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-line bg-card p-5 shadow-sm"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-bold text-ink">{item.nama}</p>

                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((angka) => (
                            <Star
                              key={angka}
                              size={17}
                              fill={
                                angka <= Number(item.rating)
                                  ? "currentColor"
                                  : "none"
                              }
                              className={
                                angka <= Number(item.rating)
                                  ? "text-accent"
                                  : "text-muted"
                              }
                            />
                          ))}
                        </div>
                      </div>

                      <p className="mt-2 text-muted">{item.komentar}</p>
                    </div>
                  ))
                )}
              </div>

              {/* form ulasan */}
              <form
                onSubmit={kirimUlasan}
                className="mt-8 rounded-3xl border border-line bg-card p-6 shadow-sm"
              >
                <h3 className="font-heading text-xl font-bold text-ink">
                  beri ulasan
                </h3>

                <input
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="nama"
                  className="mt-5 w-full rounded-xl border border-line bg-soft px-4 py-3 text-ink outline-none placeholder:text-muted transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />

                {/* rating */}
                <div className="mt-5">
                  <p className="mb-2 text-sm font-semibold text-muted">
                    rating
                  </p>

                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((angka) => (
                      <button
                        key={angka}
                        type="button"
                        onClick={() => setRating(angka)}
                        className="transition hover:scale-110"
                      >
                        <Star
                          size={28}
                          fill={angka <= rating ? "currentColor" : "none"}
                          className={
                            angka <= rating ? "text-accent" : "text-muted"
                          }
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  value={komentar}
                  onChange={(e) => setKomentar(e.target.value)}
                  placeholder="tulis ulasan..."
                  rows="4"
                  className="mt-5 w-full resize-none rounded-xl border border-line bg-soft px-4 py-3 text-ink outline-none placeholder:text-muted transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />

                <button
                  type="submit"
                  className="mt-4 rounded-full bg-primary px-7 py-3 font-heading font-semibold text-white transition hover:bg-deep"
                >
                  kirim ulasan
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default DetailBimbel;
