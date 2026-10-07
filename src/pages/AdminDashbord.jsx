import { useContext } from "react";
import { Link } from "react-router-dom";
import { Book, Users, DollarSign, Star } from "lucide-react";
import BimbelkuContext from "../context/BimbelkuContext";

// target pendaftar per bulan
const TARGET_BULANAN = 50;
// 'Rp 100.000' -> 100000
const hargaKeAngka = (harga) =>
  parseInt(String(harga).replace(/\D/g, ""), 10) || 0;
// format rupiah
const formatRupiah = (angka) =>
  angka >= 1000000
    ? `Rp ${(angka / 1000000).toFixed(1).replace(".", ",")} Jt`
    : `Rp ${angka.toLocaleString("id-ID")}`;
// format waktu relatif
const formatWaktu = (waktu) => {
  if (typeof waktu !== "number") return waktu;
  const menit = Math.floor((Date.now() - waktu) / 60000);
  if (menit < 1) return "Baru saja";
  if (menit < 60) return `${menit} menit lalu`;
  const jam = Math.floor(menit / 60);
  if (jam < 24) return `${jam} jam lalu`;
  return `${Math.floor(jam / 24)} hari lalu`;
};
function AdminDashboard() {
  const { dataBimbel, pendaftar } = useContext(BimbelkuContext);
  // total pendapatan
  const totalPendapatan = pendaftar.reduce(
    (total, item) => total + hargaKeAngka(item.harga),
    0,
  );
  // rata-rata rating 
  const bimbelBerating = dataBimbel.filter((item) => item.rating > 0);
  const rataRating = bimbelBerating.length
    ? (
        bimbelBerating.reduce((total, item) => total + item.rating, 0) /
        bimbelBerating.length
      ).toFixed(1)
    : "0";
  // pendaftar bulan ini vs bulan lalu
  const sekarang = new Date();
  const bulanLalu = new Date(
    sekarang.getFullYear(),
    sekarang.getMonth() - 1,
    1,
  );
  const jumlahDiBulan = (acuan) =>
    pendaftar.filter((item) => {
      const tanggal = new Date(item.waktu);
      return (
        tanggal.getMonth() === acuan.getMonth() &&
        tanggal.getFullYear() === acuan.getFullYear()
      );
    }).length;
  const pendaftarBulanIni = jumlahDiBulan(sekarang);
  const pendaftarBulanLalu = jumlahDiBulan(bulanLalu);
  const persenPerubahan =
    pendaftarBulanLalu === 0
      ? pendaftarBulanIni > 0
        ? 100
        : 0
      : ((pendaftarBulanIni - pendaftarBulanLalu) / pendaftarBulanLalu) * 100;
  // progres target
  const persenTarget = Math.min(
    100,
    Math.round((pendaftarBulanIni / TARGET_BULANAN) * 100),
  );
  const kataPerubahan =
    persenPerubahan > 0
      ? "meningkat dibandingkan"
      : persenPerubahan < 0
        ? "menurun dibandingkan"
        : "sama dengan";
  // 3 pendaftar terbaru
  const aktivitas = [...pendaftar].reverse().slice(0, 3);
  // kartu statistik
  const statistik = [
    {
      label: "Total Bimbel",
      nilai: String(dataBimbel.length),
      icon: <Book className="w-6 h-6 text-[#389F97]" />,
    },
    {
      label: "Total Pendaftar",
      nilai: String(pendaftar.length),
      icon: <Users className="w-6 h-6 text-[#F27A54]" />,
    },
    {
      label: "Pendapatan",
      nilai: formatRupiah(totalPendapatan),
      icon: <DollarSign className="w-6 h-6 text-[#D9A21B]" />,
    },
    {
      label: "Rating",
      nilai: rataRating,
      icon: <Star className="w-6 h-6 fill-[#F9C851] text-[#F9C851]" />,
    },
  ];
  return (
    <main className="min-h-screen bg-canvas px-4 py-10 font-['Nunito',sans-serif] text-ink md:px-8 md:py-16">
      <div className="mx-auto max-w-6xl">
        {/* header */}
        <div className="mb-10 md:mb-12">
          <p className="text-sm font-bold text-[#389F97]">ADMIN PANEL</p>
          <h1 className="mt-2 font-['Fredoka',sans-serif] text-4xl font-semibold leading-tight text-ink md:text-5xl">
            Dashboard
          </h1>
          <span className="mt-4 block h-1.5 w-16 rounded-full bg-[#F9C851]" />
          <p className="mt-4 max-w-prose text-base text-muted md:text-lg">
            Pantau aktivitas dan perkembangan Bimbelku.
          </p>
        </div>
        {/* statistik */}
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-slate-100 dark:border-white/10 bg-slate-100 dark:bg-white/10 shadow-[0_2px_14px_rgba(45,55,72,0.06)] sm:grid-cols-2 lg:grid-cols-4">
          {statistik.map((item) => (
            <div key={item.label} className="bg-card p-6 md:p-7">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-muted">
                    {item.label}
                  </p>
                  <p className="mt-2 font-['Fredoka',sans-serif] text-3xl font-semibold text-ink">
                    {item.nilai}
                  </p>
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-canvas ring-1 ring-slate-100 dark:ring-white/10">
                  {item.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* content */}
        <div className="mt-8 grid gap-6 md:mt-10 md:gap-8 lg:grid-cols-3">
          {/* aktivitas */}
          <div className="rounded-3xl border border-slate-100 dark:border-white/10 bg-card p-6 shadow-[0_2px_14px_rgba(45,55,72,0.06)] md:p-8 lg:col-span-2">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-['Fredoka',sans-serif] text-2xl font-semibold text-ink">
                  Aktivitas Terbaru
                </h2>
                <p className="mt-1 text-sm text-muted">
                  Pendaftaran terbaru dari peserta.
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#389F97]/10 px-3.5 py-1 text-xs font-bold text-[#2f8a83] dark:text-[#6fd0c7] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[#389F97] before:content-['']">
                Live
              </span>
            </div>
            <div className="mt-6 divide-y divide-slate-100 dark:divide-white/10">
              {aktivitas.length === 0 ? (
                <p className="py-10 text-center text-muted">
                  Belum ada pendaftaran.
                </p>
              ) : (
                aktivitas.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 py-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#389F97]/10 font-['Fredoka',sans-serif] font-semibold text-[#389F97]">
                        {item.nama.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-ink">{item.nama}</p>
                        <p className="text-sm text-muted">
                          Mendaftar {item.bimbel}
                        </p>
                      </div>
                    </div>
                    <span className="shrink-0 text-xs font-semibold text-muted">
                      {formatWaktu(item.waktu)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
          {/* ringkasan */}
          <div className="flex flex-col rounded-3xl bg-[#389F97] p-6 text-white shadow-lg shadow-[#389F97]/20 md:p-8">
            <p className="text-sm font-semibold text-white/80">
              Performa Bulan Ini
            </p>
            <h2 className="mt-2 font-['Fredoka',sans-serif] text-5xl font-semibold">
              {persenPerubahan > 0 ? "+" : ""}
              {persenPerubahan.toFixed(1)}%
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/85">
              Jumlah pendaftar {kataPerubahan} bulan sebelumnya.
            </p>
            <div className="mt-8 rounded-2xl bg-white/15 p-4 lg:mt-auto">
              <div className="flex justify-between text-sm font-semibold">
                <span>Target</span>
                <span>{persenTarget}%</span>
              </div>
              <div className="mt-3 h-3 rounded-full bg-white/25">
                <div
                  className="h-full rounded-full bg-[#F9C851] transition-all duration-500 motion-reduce:transition-none"
                  style={{ width: `${persenTarget}%` }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* button */}
        <div className="mt-10">
          <Link
            to="/kelola-bimbel"
            className="inline-flex rounded-full bg-[#389F97] px-8 py-3.5 font-['Fredoka',sans-serif] font-medium tracking-wide text-white shadow-md shadow-[#389F97]/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#2f8a83] hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#389F97]/30 active:scale-95 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            Kelola Bimbel
          </Link>
        </div>
      </div>
    </main>
  );
}
export default AdminDashboard;
