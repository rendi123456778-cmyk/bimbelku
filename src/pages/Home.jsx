import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import BimbelCard from "../components/BimbelCard";
import BimbelkuContext from "../context/BimbelkuContext";
import { Search } from "lucide-react";
import Hero from "../assets/Hero.png";

function Home() {
  const { dataBimbel, bimbelDipilih, setIdAktif } = useContext(BimbelkuContext);
  const [search, setSearch] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const navigate = useNavigate();
  // pilih bimbel
  const pilihBimbel = (bimbel) => {
    setIdAktif(bimbel.id);
    navigate("/detail");
  };
  // filter bimbel
  const dataFilter = dataBimbel.filter((bimbel) => {
    const cocokSearch = bimbel.nama
      .toLowerCase()
      .includes(search.toLowerCase());
    const cocokKategori = kategori === "Semua" || bimbel.kategori === kategori;
    return cocokSearch && cocokKategori;
  });
  // kategori dinamis
  const kategoriUnik = [
    "Semua",
    ...new Set(dataBimbel.map((bimbel) => bimbel.kategori)),
  ];
  return (
    <main className="min-h-screen bg-canvas font-body text-ink">
      {/* hero */}
      <section
        style={{ backgroundImage: `url(${Hero})` }}
        className="relative overflow-hidden rounded-b-[2.5rem] bg-cover bg-center md:rounded-b-[3.5rem]"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-deep/75 md:bg-gradient-to-r md:from-deep/90 md:via-deep/60 md:to-deep/10"
        />
        <div className="relative mx-auto max-w-7xl px-4 pb-32 pt-16 md:px-8 md:pb-40 md:pt-24">
          <div className="max-w-2xl motion-safe:animate-fade-up">
            <p className="mb-4 font-heading text-sm font-semibold tracking-wide text-accent md:text-base">
              SELAMAT DATANG DI BIMBELKU
            </p>
            <h1 className="font-heading text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Belajar Lebih Mudah,
              <br />
              Raih Masa Depanmu
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90 md:text-lg">
              Temukan bimbel terbaik sesuai kebutuhan dan tingkatkan kemampuanmu
              bersama tutor berpengalaman.
            </p>
          </div>
        </div>
      </section>
      {/* konten */}
      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8">
        {/* search */}
        <div className="relative z-10 -mt-8 mb-10 md:-mt-10 md:mb-12">
          <div className="flex items-center gap-3 rounded-full border-2 border-slate-100 bg-card px-6 py-4 shadow-lg shadow-primary/10 transition-all focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/20 dark:border-white/10">
            <span className="text-xl">
              <Search className="h-5 w-5 shrink-0 text-primary" />
            </span>
            <input
              type="text"
              aria-label="Cari bimbel"
              placeholder="Cari bimbel..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-base text-ink outline-none placeholder:text-muted"
            />
          </div>
        </div>
        {/* kategori */}
        <div className="mb-12">
          <h2 className="mb-4 font-heading text-lg font-bold text-ink">
            Kategori
          </h2>
          <div className="-mx-4 flex gap-3 overflow-x-auto px-4 py-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
            {kategoriUnik.map((item) => (
              <button
                key={item}
                onClick={() => setKategori(item)}
                aria-pressed={kategori === item}
                className={`shrink-0 rounded-full border-2 px-6 py-2 font-heading font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 motion-safe:active:scale-95 ${
                  kategori === item
                    ? "border-primary bg-primary text-white"
                    : "border-slate-200 bg-card text-muted hover:border-primary hover:text-primary dark:border-white/15"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        {/* judul bimbel */}
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-2xl font-bold text-ink md:text-3xl">
              Bimbel Populer
            </h2>
            <p className="mt-1 text-muted">Pilihan bimbel terbaik untuk kamu</p>
          </div>
          <p className="shrink-0 rounded-full bg-accent px-4 py-1 text-sm font-bold text-slate-800">
            {dataFilter.length} bimbel
          </p>
        </div>
        {/* data bimbel */}
        {dataFilter.length === 0 ? (
          <div className="rounded-3xl border-2 border-dashed border-primary/30 bg-card px-6 py-16 text-center">
            <p className="text-muted">Bimbel tidak ditemukan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {dataFilter.map((bimbel) => (
              <BimbelCard
                key={bimbel.id}
                image={bimbel.gambar}
                nama={bimbel.nama}
                harga={bimbel.harga}
                rating={bimbel.rating}
                status={bimbel.status}
                onPilih={() => pilihBimbel(bimbel)}
                sudahDipilih={bimbelDipilih.some(
                  (item) => item.nama === bimbel.nama,
                )}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
export default Home;
