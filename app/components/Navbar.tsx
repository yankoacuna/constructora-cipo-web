"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const NAV_LINKS = [
  { href: "#nosotros", label: "Nosotros" },
  { href: "#servicios", label: "Servicios" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? "bg-[#020205]/95 backdrop-blur-md border-b border-amber-400/10 shadow-lg shadow-black/40"
        : "bg-transparent"
        }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-3 group"
          aria-label="Constructora Cipo — inicio"
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-amber-400/40 group-hover:ring-amber-400/80 transition-all duration-300">
            <Image
              src="/logo_cipo_mini.jpeg"
              alt="Logo Constructora Cipo"
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span
              className="text-xs font-semibold tracking-[0.25em] text-amber-400/70 uppercase"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Constructora
            </span>
            <span
              className="text-xl font-black tracking-widest text-white"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              CIPO
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => {
            const id = href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <li key={href}>
                <button
                  onClick={() => handleNavClick(href)}
                  className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-200 group ${isActive ? "text-amber-400" : "text-white/70 hover:text-white"
                    }`}
                >
                  {label}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-300 ${isActive ? "w-3/4 opacity-100" : "w-0 opacity-0 group-hover:w-3/4 group-hover:opacity-60"
                      }`}
                  />
                </button>
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <div className="hidden md:block">
          <button
            onClick={() => handleNavClick("#contacto")}
            id="navbar-cta"
            className="px-5 py-2.5 text-sm font-semibold tracking-wide text-black bg-gradient-to-r from-amber-400 to-amber-600 rounded-full hover:from-amber-300 hover:to-amber-500 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/25 active:scale-95"
          >
            Cotizar Proyecto
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/5 transition-colors"
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""
              }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          } bg-[#0f0f18]/98 backdrop-blur-md border-b border-amber-400/10`}
      >
        <ul className="flex flex-col px-6 py-4 gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <button
                onClick={() => handleNavClick(href)}
                className="w-full text-left py-3 px-4 text-base font-medium text-white/80 hover:text-amber-400 hover:bg-amber-400/5 rounded-lg transition-all duration-200"
              >
                {label}
              </button>
            </li>
          ))}
          <li className="pt-2">
            <button
              onClick={() => handleNavClick("#contacto")}
              className="w-full py-3 text-sm font-semibold text-black bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all duration-200 active:scale-95"
            >
              Cotizar Proyecto
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
