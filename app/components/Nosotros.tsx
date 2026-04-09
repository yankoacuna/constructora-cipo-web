"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";

const VALUES = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: "Calidad Garantizada",
    description: "Materiales de primera y acabados impecables en cada proyecto.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Plazo Cumplido",
    description: "Nos comprometemos con los plazos acordados, siempre.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Equipo Experto",
    description: "Profesionales con años de experiencia en el rubro de la construcción.",
  },
];

export default function Nosotros() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const animated = entry.target.querySelectorAll("[data-animate]");
            animated.forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).classList.add("animate-fade-in-up");
                (el as HTMLElement).style.opacity = "1";
              }, i * 120);
            });
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="nosotros" className="relative py-28 overflow-hidden" ref={sectionRef}>
      {/* Section background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020205] via-[#0f0f18] to-[#020205]" />
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="section-divider absolute bottom-0 left-0 right-0" />

      {/* Decorative orb */}
      <div className="absolute top-1/2 -translate-y-1/2 right-0 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <div
            data-animate
            className="opacity-0 relative group"
          >
            <div className="relative aspect-[5/5] mx-auto lg:mx-0 rounded-2xl overflow-hidden">
              <Image
                src="/logo_cipo.jpeg"
                alt="Equipo Constructora Cipo"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020205]/80 via-transparent to-[#020205]/30" />

              {/* Badge sobre imagen */}
              <div className="absolute top-6 left-6 max-w-max glass-card rounded-xl p-3 pr-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">Talca, Maule</div>
                    <div className="text-white/50 text-xs">Chile · Región del Maule</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative frame lines */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-amber-400/30 rounded-tl-xl pointer-events-none" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-amber-400/30 rounded-br-xl pointer-events-none" />
          </div>

          {/* Right: Text content */}
          <div className="flex flex-col gap-8">
            {/* Label */}
            <div
              data-animate
              className="opacity-0 inline-flex items-center gap-2 self-start"
            >
              <div className="h-px w-8 bg-amber-400" />
              <span className="text-amber-400 text-sm font-semibold tracking-[0.2em] uppercase">
                Quiénes Somos
              </span>
            </div>

            {/* Title */}
            <h2
              data-animate
              className="opacity-0 text-4xl sm:text-5xl font-black leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Comprometidos con{" "}
              <span className="text-gold-gradient">tu visión,</span>{" "}
              cada proyecto.
            </h2>

            {/* Description */}
            <p
              data-animate
              className="opacity-0 text-white/60 text-lg leading-relaxed"
            >
              Somos <strong className="text-white font-semibold">Constructora Cipo</strong>, una empresa
              con sede en <strong className="text-amber-400 font-semibold">Talca, Chile</strong>, dedicada
              a la construcción en general, mueblería en línea plana, climatización y servicios de limpieza integral.
            </p>
            <p
              data-animate
              className="opacity-0 text-white/55 text-base leading-relaxed"
            >
              Trabajamos codo a codo con nuestros clientes para transformar sus ideas en realidades
              funcionales. Desde obras civiles, remodelaciones y muebles a medida, hasta la total
              recuperación de sus espacios y vehículos con limpieza profunda.
            </p>

            {/* Values */}
            <ul className="flex flex-col gap-4">
              {VALUES.map((v, i) => (
                <li
                  key={v.title}
                  data-animate
                  className="opacity-0 flex items-start gap-4 p-4 glass-card rounded-xl hover:border-amber-400/30 transition-all duration-300 group"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center group-hover:bg-amber-400/20 transition-colors duration-300">
                    {v.icon}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{v.title}</div>
                    <div className="text-white/50 text-sm mt-0.5">{v.description}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
