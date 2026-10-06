import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

function ThemeToggle() {
  // pilihan tersimpan > preferensi sistem
  const [gelap, setGelap] = useState(() => {
    try {
      const simpan = localStorage.getItem("bimbelku_tema");
      if (simpan) return simpan === "gelap";
    } catch {
      return false;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // pasang class dark di <html> dan simpan pilihan
  useEffect(() => {
    document.documentElement.classList.toggle("dark", gelap);

    try {
      localStorage.setItem("bimbelku_tema", gelap ? "gelap" : "terang");
    } catch {
      return;
    }
  }, [gelap]);

  return (
    <button
      onClick={() => setGelap(!gelap)}
      aria-label={gelap ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
      aria-pressed={gelap}
      className="flex h-11 w-11 items-center justify-center rounded-full text-muted transition-colors duration-200 hover:bg-primary/10 hover:text-[#2f8a83] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25 dark:hover:text-[#6fd0c7] motion-reduce:transition-none"
    >
      {gelap ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}

export default ThemeToggle;
