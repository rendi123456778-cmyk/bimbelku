import { useContext, useState } from "react";
import BimbelkuContext from "../context/BimbelkuContext";

function KelolaBimbel() {
  const { dataBimbel, tambahBimbel, hapusBimbel, ubahStatusBimbel } =
    useContext(BimbelkuContext);

  const [nama, setNama] = useState("");
  const [kategori, setKategori] = useState("");
  const [harga, setHarga] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [website, setWebsite] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (nama === "" || kategori === "" || harga === "") {
      alert("Semua data wajib diisi!");
      return;
    }

    // nomor wa: hanya angka, awalan 0 jadi 62
    const nomorWa = whatsapp.replace(/\D/g, "").replace(/^0/, "62");

    tambahBimbel({
      nama,
      kategori,
      harga: `Rp ${harga}`,
      whatsapp: nomorWa,
      website: website.trim(),
    });

    setNama("");
    setKategori("");
    setHarga("");
    setWhatsapp("");
    setWebsite("");

    alert("Bimbel berhasil ditambahkan!");
  };

  return (
    <main className="min-h-screen bg-canvas px-4 py-10 font-['Nunito',sans-serif] text-ink md:px-8 md:py-16">
      <div className="mx-auto max-w-6xl">
        {/* header */}
        <div className="mb-10 md:mb-12">
          <p className="text-sm font-bold text-[#389F97]">ADMIN PANEL</p>

          <h1 className="mt-2 font-['Fredoka',sans-serif] text-4xl font-semibold leading-tight text-ink md:text-5xl">
            Kelola Bimbel
          </h1>

          <span className="mt-4 block h-1.5 w-16 rounded-full bg-[#F9C851]" />

          <p className="mt-4 max-w-prose text-base text-muted md:text-lg">
            Tambahkan, lihat, dan kelola data bimbel.
          </p>
        </div>

        {/* form tambah */}
        <div className="rounded-3xl border-2 border-amber-100 dark:border-amber-900/40 bg-amber-50 dark:bg-amber-950/30 p-6 md:p-8">
          <h2 className="font-['Fredoka',sans-serif] text-2xl font-semibold text-ink">
            Tambah Bimbel
          </h2>

          <form
            onSubmit={handleSubmit}
            className="mt-5 grid gap-4 md:grid-cols-3"
          >
            <input
              type="text"
              placeholder="Nama bimbel"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="rounded-2xl border-2 border-card bg-card px-4 py-3 text-ink outline-none transition-all placeholder:text-muted/70 focus:border-[#389F97] focus:ring-4 focus:ring-[#389F97]/20 motion-reduce:transition-none"
            />

            <select
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              className="rounded-2xl border-2 border-card bg-card px-4 py-3 text-ink outline-none transition-all focus:border-[#389F97] focus:ring-4 focus:ring-[#389F97]/20 motion-reduce:transition-none"
            >
              <option value="">Pilih kategori</option>
              <option value="Matematika">Matematika</option>
              <option value="Fisika">Fisika</option>
              <option value="Kimia">Kimia</option>
              <option value="Bahasa Inggris">Bahasa Inggris</option>
            </select>

            <input
              type="number"
              placeholder="Harga"
              value={harga}
              onChange={(e) => setHarga(e.target.value)}
              className="rounded-2xl border-2 border-card bg-card px-4 py-3 text-ink outline-none transition-all placeholder:text-muted/70 focus:border-[#389F97] focus:ring-4 focus:ring-[#389F97]/20 motion-reduce:transition-none"
            />

            <input
              type="tel"
              placeholder="WhatsApp (08xx / 628xx)"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="rounded-2xl border-2 border-card bg-card px-4 py-3 text-ink outline-none transition-all placeholder:text-muted/70 focus:border-[#389F97] focus:ring-4 focus:ring-[#389F97]/20 motion-reduce:transition-none"
            />

            <input
              type="url"
              placeholder="Link website (opsional)"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="rounded-2xl border-2 border-card bg-card px-4 py-3 text-ink outline-none transition-all placeholder:text-muted/70 focus:border-[#389F97] focus:ring-4 focus:ring-[#389F97]/20 motion-reduce:transition-none"
            />

            <button
              type="submit"
              className="rounded-full bg-[#389F97] px-5 py-3 font-['Fredoka',sans-serif] font-medium tracking-wide text-white shadow-md shadow-[#389F97]/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#2f8a83] hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#389F97]/30 active:scale-95 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              + Tambah Bimbel
            </button>
          </form>
        </div>

        {/* daftar bimbel */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-slate-100 dark:border-white/10 bg-card shadow-[0_2px_14px_rgba(45,55,72,0.06)] md:mt-10">
          <div className="flex flex-wrap items-end justify-between gap-2 border-b border-slate-100 dark:border-white/10 p-6 md:px-8">
            <h2 className="font-['Fredoka',sans-serif] text-2xl font-semibold text-ink">
              Daftar Bimbel
            </h2>

            <p className="text-sm font-semibold text-muted">
              Total {dataBimbel.length} bimbel
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="bg-canvas">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-muted md:first:pl-8">
                    Nama Bimbel
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-bold text-muted">
                    Kategori
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-bold text-muted">
                    Harga
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-bold text-muted">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-bold text-muted md:last:pr-8">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody>
                {dataBimbel.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-slate-100 dark:border-white/10 transition-colors hover:bg-canvas motion-reduce:transition-none"
                  >
                    <td className="px-6 py-4 font-bold text-ink md:first:pl-8">
                      {item.nama}
                    </td>

                    <td className="px-6 py-4 text-muted">{item.kategori}</td>

                    <td className="px-6 py-4 font-bold text-[#389F97]">
                      {item.harga}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3.5 py-1 text-xs font-bold ${
                          item.status === "Aktif" || item.status === "Online"
                            ? "bg-[#389F97]/10 text-[#2f8a83] dark:text-[#6fd0c7]"
                            : "bg-[#F27A54]/10 text-[#d9603a]"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 md:last:pr-8">
                      <div className="flex gap-2">
                        <button
                          onClick={() => ubahStatusBimbel(item.id)}
                          className="rounded-full bg-[#389F97]/10 px-4 py-2 text-sm font-bold text-[#2f8a83] dark:text-[#6fd0c7] transition-colors hover:bg-[#389F97] hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#389F97]/30 motion-reduce:transition-none"
                        >
                          Status
                        </button>

                        <button
                          onClick={() => hapusBimbel(item.id)}
                          className="rounded-full border-2 border-slate-200 dark:border-white/15 px-4 py-1.5 text-sm font-bold text-muted transition-colors hover:border-[#F27A54] hover:bg-[#F27A54]/10 hover:text-[#F27A54] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F27A54]/25 motion-reduce:transition-none"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

export default KelolaBimbel;
