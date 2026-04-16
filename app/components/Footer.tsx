import Image from "next/image";
import { SITE_CONFIG } from "@/lib/siteConfig";

const CURRENT_YEAR = new Date().getFullYear();

const FOOTER_LINKS = [
  { href: "#nosotros", label: "Nosotros" },
  { href: "#servicios", label: "Servicios" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#contacto", label: "Contacto" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#020205] border-t border-amber-400/10 overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-amber-500/3 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-amber-400/30">
                <Image
                  src="/logo_cipo_mini.jpeg"
                  alt="Logo Constructora Cipo"
                  fill
                  quality={60}
                  className="object-cover"
                  sizes="40px"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className="text-[10px] font-semibold tracking-[0.25em] text-amber-400/60 uppercase"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Constructora
                </span>
                <span
                  className="text-lg font-black tracking-widest text-white"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  CIPO
                </span>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              Empresa especializada en construcción, remodelación y obras civiles.
              Con sede en <span className="text-amber-400/70">Talca, Chile</span>, construimos
              el espacio que mereces.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-2">
              <a
                id="footer-instagram"
                href={SITE_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-white/50 hover:text-pink-400 hover:border-pink-400/30 transition-all duration-300"
                aria-label="Instagram Constructora Cipo"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                id="footer-whatsapp"
                href={`https://wa.me/${SITE_CONFIG.phone.primary.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-white/50 hover:text-[#25D366] hover:border-[#25D366]/30 transition-all duration-300"
                aria-label="WhatsApp Constructora Cipo"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-amber-400/70 mb-5">
              Navegación
            </h3>
            <ul className="flex flex-col gap-3">
              {FOOTER_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm text-white/70 hover:text-amber-400 transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact quick */}
          <div>
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-amber-400/70 mb-5">
              Contacto Rápido
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-amber-400/60 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                </svg>
                Talca, Chile
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="hover:text-amber-400 transition-colors duration-200 break-all"
                >
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phone.primary.href}`}
                  className="hover:text-amber-400 transition-colors duration-200"
                >
                  {SITE_CONFIG.phone.primary.display} (Principal)
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phone.secondary.href}`}
                  className="hover:text-amber-400 transition-colors duration-200"
                >
                  {SITE_CONFIG.phone.secondary.display}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/50 text-xs">
            © {CURRENT_YEAR} Constructora Cipo. Todos los derechos reservados.
          </p>
          <p className="text-white/50 text-xs">
            Talca, Región del Maule — Chile
          </p>
        </div>
      </div>
    </footer>
  );
}
