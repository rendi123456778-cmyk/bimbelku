import { createContext, useState, useEffect } from "react";
import Bimbel1 from "../assets/Bimbel1.png";
import zenius from "../assets/zenius.png";
import ganesha from "../assets/ganesha.png";

const BimbelkuContext = createContext();
// baca localstorage
const ambilStorage = (kunci, awal) => {
  try {
    const data = localStorage.getItem(kunci);
    return data ? JSON.parse(data) : awal;
  } catch {
    return awal;
  }
};
// simpan localstorage
const simpanStorage = (kunci, nilai) => {
  try {
    localStorage.setItem(kunci, JSON.stringify(nilai));
  } catch {
    return;
  }
};
export function BimbelkuProvider({ children }) {
  // data bimbel
  const [dataBimbel, setDataBimbel] = useState([
    {
      id: 1,
      gambar: Bimbel1,
      nama: "Bimbel Matematika",
      harga: "Rp 100.000",
      rating: 4.5,
      status: "Online",
      kategori: "Matematika",
      deskripsi: "Belajar matematika dengan tutor berpengalaman.",
      whatsapp: "628888182198",
      website: "https://www.ruangguru.com/privat/matematika",
    },
    {
      id: 2,
      gambar: zenius,
      nama: "Bimbel Fisika",
      harga: "Rp 120.000",
      rating: 4.7,
      status: "Offline",
      kategori: "Fisika",
      deskripsi: "Pelajari konsep fisika dengan cara yang mudah.",
      whatsapp: "628888182198",
      website: "https://www.zenius.net/",
    },
    {
      id: 3,
      gambar: ganesha,
      nama: "Ganesha Operation",
      harga: "Rp 110.000",
      rating: 4.6,
      status: "Online",
      kategori: "Kimia",
      deskripsi: "Belajar kimia dengan materi lengkap dan interaktif.",
      whatsapp: "628112468988",
      website: "https://ganeshaoperation.com/",
    },
  ]);
  // bimbel yang sedang dibuka (disimpan id-nya)
  const [idAktif, setIdAktif] = useState(() =>
    ambilStorage("bimbelku_aktif", null),
  );
  // riwayat bimbel yang sudah didaftarin (disimpan id-nya)
  const [idRiwayat, setIdRiwayat] = useState(() =>
    ambilStorage("bimbelku_riwayat", []),
  );
  // data pendaftar
  const [pendaftar, setPendaftar] = useState(() =>
    ambilStorage("bimbelku_pendaftar", []),
  );
  // menyingkron kan  ke localstorage
  useEffect(() => simpanStorage("bimbelku_aktif", idAktif), [idAktif]);
  useEffect(() => simpanStorage("bimbelku_riwayat", idRiwayat), [idRiwayat]);
  useEffect(() => simpanStorage("bimbelku_pendaftar", pendaftar), [pendaftar]);
  // bimbel yang sudah didaftari, dibaca dari dataBimbel agar selalu terbaru
  const bimbelDipilih = dataBimbel.filter((item) =>
    idRiwayat.includes(item.id),
  );
  // tambah bimbel
  const tambahBimbel = (bimbelBaru) => {
    setDataBimbel((dataLama) => [
      ...dataLama,
      {
        ...bimbelBaru,
        id: Date.now(),
        gambar: Bimbel1,
        rating: 0,
        status: "Online",
        deskripsi:
          "Bimbingan belajar dengan materi lengkap dan tutor berpengalaman.",
      },
    ]);
  };
  // hapus bimbel
  const hapusBimbel = (id) => {
    setDataBimbel((dataLama) => dataLama.filter((item) => item.id !== id));
  };
  // ubah status bimbel
  const ubahStatusBimbel = (id) => {
    setDataBimbel((dataLama) =>
      dataLama.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "Online" ? "Offline" : "Online",
            }
          : item,
      ),
    );
  };
  // tambah pendaftar
  const tambahPendaftar = (dataPeserta) => {
    setPendaftar((dataLama) => [
      ...dataLama,
      {
        ...dataPeserta,
        id: Date.now(),
        // timestamp
        waktu: Date.now(),
      },
    ]);
  };
  // riwayat
  const tambahRiwayat = (id) => {
    setIdRiwayat((dataLama) =>
      dataLama.includes(id) ? dataLama : [...dataLama, id],
    );
  };
  const hapusRiwayat = (id) => {
    setIdRiwayat((dataLama) => dataLama.filter((item) => item !== id));
  };
  // ulasan
  const tambahUlasan = (idBimbel, ulasanBaru) => {
    setDataBimbel((dataLama) =>
      dataLama.map((bimbel) => {
        if (bimbel.id !== idBimbel) {
          return bimbel;
        }
        const ulasanTerbaru = [
          ...(bimbel.ulasan || []),
          { ...ulasanBaru, id: Date.now() },
        ];
        // rating = rata-rata semua ulasan
        const rataRata =
          ulasanTerbaru.reduce(
            (total, item) => total + Number(item.rating),
            0,
          ) / ulasanTerbaru.length;
        return {
          ...bimbel,
          ulasan: ulasanTerbaru,
          rating: Number(rataRata.toFixed(1)),
        };
      }),
    );
  };
  return (
    <BimbelkuContext.Provider
      value={{
        // bimbel
        dataBimbel,
        setDataBimbel,
        tambahBimbel,
        hapusBimbel,
        ubahStatusBimbel,
        // bimbel aktif dan riwayat
        idAktif,
        setIdAktif,
        bimbelDipilih,
        tambahRiwayat,
        hapusRiwayat,
        // pendaftar
        pendaftar,
        setPendaftar,
        tambahPendaftar,
        // ulasan
        tambahUlasan,
      }}
    >
      {children}
    </BimbelkuContext.Provider>
  );
}
export default BimbelkuContext;
