import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import BimbelkuContext from "../context/BimbelkuContext";
import { Star, Check } from "lucide-react";

const tombolUtama =
  "inline-flex w-full items-center justify-center rounded-full bg-[#389F97] px-8 py-3.5 font-['Fredoka',sans-serif] font-medium tracking-wide text-white shadow-md shadow-[#389F97]/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#2f8a83] hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#389F97]/30 active:scale-95 motion-reduce:transition-none motion-reduce:hover:translate-y-0";
const tombolOutline =
  "inline-flex w-full items-center justify-center rounded-full border-2 border-[#389F97] px-8 py-3 font-['Fredoka',sans-serif] font-medium tracking-wide text-[#389F97] transition-colors duration-200 hover:bg-[#389F97]/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#389F97]/30 motion-reduce:transition-none";
const labelClass = "mb-2 block text-sm font-bold text-ink";
function PesanError({ pesan }) {
  if (!pesan) return null;
  return <p className="mt-1.5 text-sm font-semibold text-[#d9603a]">{pesan}</p>;
}
function Pendaftaran() {
  const { dataBimbel, idAktif, tambahPendaftar, tambahRiwayat } =
    useContext(BimbelkuContext);
  const navigate = useNavigate();
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [noHp, setNoHp] = useState("");
  const [paket, setPaket] = useState("");
  const [pembayaran, setPembayaran] = useState("");
  const [touched, setTouched] = useState({});
  const [selesai, setSelesai] = useState(false);
  // bimbel terpilih
  const bimbel = dataBimbel.find((item) => item.id === idAktif);
  // validasi real-time, error tampil setelah field disentuh
  const errors = {};
  if (nama.trim() === "") errors.nama = "Nama lengkap wajib diisi";
  if (email === "") errors.email = "Email wajib diisi";
  else if (!/^\S+@\S+\.\S+$/.test(email))
    errors.email = "Format email tidak valid";
  if (noHp === "") errors.noHp = "Nomor HP wajib diisi";
  else if (!/^(08|628)\d{8,12}$/.test(noHp))
    errors.noHp = "Gunakan format 08xxxxxxxxxx";
  if (paket === "") errors.paket = "Pilih salah satu paket";
  if (pembayaran === "") errors.pembayaran = "Pilih metode pembayaran";
  const tandai = (field) => setTouched((lama) => ({ ...lama, [field]: true }));
  const pesanError = (field) => (touched[field] ? errors[field] : "");
  const kelasInput = (field) =>
    `w-full rounded-2xl border-2 bg-card px-4 py-3 text-ink outline-none transition-all placeholder:text-muted/70 focus:ring-4 motion-reduce:transition-none ${
      pesanError(field)
        ? "border-[#F27A54] focus:border-[#F27A54] focus:ring-[#F27A54]/20"
        : "border-slate-100 dark:border-white/10 focus:border-[#389F97] focus:ring-[#389F97]/20"
    }`;
  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({
      nama: true,
      email: true,
      noHp: true,
      paket: true,
      pembayaran: true,
    });
    if (Object.keys(errors).length > 0) {
      return;
    }
    // simpan ke context (dibaca dashboard)
    tambahPendaftar({
      nama,
      email,
      noHp,
      paket,
      pembayaran,
      bimbel: bimbel.nama,
      harga: bimbel.harga,
    });
    // masuk ke bimbel saya
    tambahRiwayat(bimbel.id);
    setSelesai(true);
    window.scrollTo(0, 0);
  };
  if (!bimbel) {
    return (
      <div className="min-h-screen bg-canvas px-4 py-16 font-['Nunito',sans-serif] text-ink md:px-8">
        <div className="mx-auto max-w-xl rounded-3xl border-2 border-dashed border-slate-200 dark:border-white/15 bg-card px-6 py-14 text-center">
          <h1 className="font-['Fredoka',sans-serif] text-2xl font-semibold text-ink">
            Belum ada bimbel yang dipilih
          </h1>
          <p className="mt-2 text-muted">
            Silakan pilih bimbel terlebih dahulu.
          </p>
          <button
            onClick={() => navigate("/")}
            className={`mt-8 !w-auto ${tombolUtama}`}
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }
  // pesan awal ke penyelenggara
  const pesan = `Halo, saya ${nama}. Saya tertarik mendaftar ${bimbel.nama} (paket ${paket}, ${bimbel.harga}). Metode pembayaran: ${pembayaran}. Kontak saya: ${noHp} / ${email}. Mohon info selanjutnya.`;
  const linkWA = bimbel.whatsapp
    ? `https://wa.me/${bimbel.whatsapp}?text=${encodeURIComponent(pesan)}`
    : "";
  if (selesai) {
    return (
      <main className="min-h-screen bg-canvas px-4 py-10 font-['Nunito',sans-serif] text-ink md:px-8 md:py-16">
        <div className="mx-auto max-w-xl rounded-3xl border border-slate-100 dark:border-white/10 bg-card p-6 text-center shadow-[0_2px_14px_rgba(45,55,72,0.06)] md:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#389F97]/10">
            <Check className="h-8 w-8 text-[#389F97]" />
          </div>
          <h1 className="mt-6 font-['Fredoka',sans-serif] text-3xl font-semibold text-ink">
            Data pendaftaran tersimpan
          </h1>
          <p className="mt-2 text-muted">
            Satu langkah lagi: kirim data ke penyelenggara agar pendaftaranmu
            diproses.
          </p>
          <div className="mt-6 rounded-2xl border-2 border-amber-100 dark:border-amber-900/40 bg-amber-50 dark:bg-amber-950/30 p-4 text-left">
            <p className="font-['Fredoka',sans-serif] text-xl font-semibold text-ink">
              {bimbel.nama}
            </p>
            <p className="mt-1 text-sm text-muted">
              Paket {paket} · {bimbel.harga}
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3">
            {linkWA && (
              <a
                href={linkWA}
                target="_blank"
                rel="noreferrer"
                className={tombolUtama}
              >
                Lanjut ke WhatsApp
              </a>
            )}
            {bimbel.website && (
              <a
                href={bimbel.website}
                target="_blank"
                rel="noreferrer"
                className={tombolOutline}
              >
                Kunjungi Website Penyelenggara
              </a>
            )}
            {!linkWA && !bimbel.website && (
              <p className="text-sm text-muted">
                Kontak penyelenggara belum tersedia.
              </p>
            )}
            <button
              onClick={() => navigate("/bimbel-saya")}
              className="rounded-full px-8 py-3 font-['Fredoka',sans-serif] font-medium text-muted transition-colors hover:bg-slate-100 dark:hover:bg-white/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#389F97]/25 motion-reduce:transition-none"
            >
              Lihat Bimbel Saya
            </button>
          </div>
        </div>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-canvas px-4 py-10 font-['Nunito',sans-serif] text-ink md:px-8 md:py-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-['Fredoka',sans-serif] text-4xl font-semibold leading-tight text-ink md:text-5xl">
          Pendaftaran Bimbel
        </h1>
        <span className="mt-4 block h-1.5 w-16 rounded-full bg-[#F9C851]" />
        <p className="mt-4 max-w-prose text-base text-muted md:text-lg">
          Lengkapi data berikut untuk mendaftar.
        </p>
        <div className="mt-10 grid gap-8 lg:grid-cols-3 lg:items-start">
          {/* ringkasan bimbel */}
          <div className="rounded-3xl border-2 border-amber-100 dark:border-amber-900/40 bg-amber-50 dark:bg-amber-950/30 p-5 md:p-6 lg:order-2 lg:sticky lg:top-8">
            <img
              src={bimbel.gambar}
              alt={bimbel.nama}
              className="aspect-video w-full rounded-2xl object-cover"
            />
            <h2 className="mt-5 font-['Fredoka',sans-serif] text-2xl font-semibold leading-snug text-ink">
              {bimbel.nama}
            </h2>
            <div className="mt-2 flex items-center gap-1.5">
              <span>
                {" "}
                <Star className="h-5 w-5 fill-[#F9C851] text-[#F9C851]" />
              </span>
              <span className="text-sm font-bold text-ink">
                {bimbel.rating}
              </span>
            </div>
            <div className="mt-5 border-t border-amber-200/70 dark:border-amber-900/40 pt-5">
              <p className="font-['Fredoka',sans-serif] text-3xl font-semibold text-[#389F97]">
                {bimbel.harga}
              </p>
              <p className="mt-1 text-sm text-muted">per bulan</p>
            </div>
            <div className="mt-4">
              <span className="inline-block rounded-full bg-card px-3.5 py-1 text-sm font-bold text-[#2f8a83] dark:text-[#6fd0c7]">
                {bimbel.status}
              </span>
            </div>
          </div>
          {/* form */}
          <div className="rounded-3xl border border-slate-100 dark:border-white/10 bg-card p-6 shadow-[0_2px_14px_rgba(45,55,72,0.06)] md:p-8 lg:order-1 lg:col-span-2">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* nama */}
              <div>
                <label className={labelClass}>Nama Lengkap</label>
                <input
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  onBlur={() => tandai("nama")}
                  placeholder="Masukkan nama lengkap"
                  aria-invalid={Boolean(pesanError("nama"))}
                  className={kelasInput("nama")}
                />
                <PesanError pesan={pesanError("nama")} />
              </div>
              {/* email */}
              <div>
                <label className={labelClass}>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => tandai("email")}
                  placeholder="Masukkan email"
                  aria-invalid={Boolean(pesanError("email"))}
                  className={kelasInput("email")}
                />
                <PesanError pesan={pesanError("email")} />
              </div>
              {/* hp */}
              <div>
                <label className={labelClass}>Nomor HP</label>
                <input
                  type="tel"
                  value={noHp}
                  onChange={(e) => setNoHp(e.target.value)}
                  onBlur={() => tandai("noHp")}
                  placeholder="08xxxxxxxxxx"
                  aria-invalid={Boolean(pesanError("noHp"))}
                  className={kelasInput("noHp")}
                />
                <PesanError pesan={pesanError("noHp")} />
              </div>
              {/* paket */}
              <div>
                <label className={labelClass}>Pilih Paket</label>
                <select
                  value={paket}
                  onChange={(e) => setPaket(e.target.value)}
                  onBlur={() => tandai("paket")}
                  aria-invalid={Boolean(pesanError("paket"))}
                  className={kelasInput("paket")}
                >
                  <option value="">Pilih paket</option>
                  <option value="Reguler">Reguler</option>
                  <option value="Intensif">Intensif</option>
                  <option value="Premium">Premium</option>
                </select>
                <PesanError pesan={pesanError("paket")} />
              </div>
              {/* pembayaran */}
              <div>
                <label className={labelClass}>Metode Pembayaran</label>
                <select
                  value={pembayaran}
                  onChange={(e) => setPembayaran(e.target.value)}
                  onBlur={() => tandai("pembayaran")}
                  aria-invalid={Boolean(pesanError("pembayaran"))}
                  className={kelasInput("pembayaran")}
                >
                  <option value="">Pilih pembayaran</option>
                  <option value="Transfer Bank">Transfer Bank</option>
                  <option value="E-Wallet">E-Wallet</option>
                  <option value="QRIS">QRIS</option>
                </select>
                <PesanError pesan={pesanError("pembayaran")} />
              </div>
              {/* button */}
              <button type="submit" className={tombolUtama}>
                Daftar Sekarang
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
export default Pendaftaran;
