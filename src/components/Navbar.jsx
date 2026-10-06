import { Link } from "react-router-dom";
import { useState } from "react";
import { GraduationCap } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkDesktop =
    "rounded-full px-4 py-2 text-[15px] font-semibold text-muted transition-colors duration-200 hover:bg-primary/10 hover:text-[#2f8a83] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25 dark:hover:text-[#6fd0c7] motion-reduce:transition-none";

  const linkMobile =
    "rounded-xl px-4 py-3 font-semibold text-ink transition-colors duration-200 hover:bg-primary/10 hover:text-[#2f8a83] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25 dark:hover:text-[#6fd0c7] motion-reduce:transition-none";

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/70 bg-canvas px-4 py-3 font-body text-ink dark:border-white/10 md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* baris utama */}
        <div className="flex items-center justify-between">
          {/* logo */}
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="rounded-full font-heading text-2xl font-semibold text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary">
                <GraduationCap className="h-6 w-6 text-white" />
              </span>
              <h1>Bimbelku</h1>
            </div>
          </Link>

          <div className="flex items-center gap-1">
            {/* menu desktop */}
            <div className="hidden items-center gap-1 md:flex">
              <Link to="/" className={linkDesktop}>
                Beranda
              </Link>

              <Link to="/bimbel-saya" className={linkDesktop}>
                Bimbel Saya
              </Link>

              <Link to="/pendaftaran" className={linkDesktop}>
                Pendaftaran
              </Link>

              <Link to="/admin" className={linkDesktop}>
                Admin
              </Link>
            </div>

            {/* tombol tema */}
            <ThemeToggle />

            {/* tombol hamburger mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
              aria-expanded={menuOpen}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-xl text-[#2f8a83] transition-colors hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25 dark:text-[#6fd0c7] md:hidden motion-reduce:transition-none"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* menu mobile */}
        {menuOpen && (
          <div className="mt-3 rounded-2xl border border-slate-100 bg-card p-2 shadow-[0_8px_24px_rgba(45,55,72,0.08)] dark:border-white/10 md:hidden">
            <div className="flex flex-col gap-1">
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className={linkMobile}
              >
                Beranda
              </Link>

              <Link
                to="/bimbel-saya"
                onClick={() => setMenuOpen(false)}
                className={linkMobile}
              >
                Bimbel Saya
              </Link>

              <Link
                to="/pendaftaran"
                onClick={() => setMenuOpen(false)}
                className={linkMobile}
              >
                Pendaftaran
              </Link>

              <Link
                to="/admin"
                onClick={() => setMenuOpen(false)}
                className={linkMobile}
              >
                Admin
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
