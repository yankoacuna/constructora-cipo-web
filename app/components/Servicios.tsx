"use client";

import { useRef, useEffect } from "react";

const SERVICES = [
  {
    id: "construccion-remodelacion",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    title: "Construcción y Remodelaciones",
    description:
      "Transformamos o construimos tu hogar con materiales de calidad. Desde techos, radier, ampliaciones hasta casas llave en mano.",
    features: ["Ampliaciones de casas", "Obras civiles menores", "Remodelación total"],
  },
  {
    id: "muebles-linea-plana",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 12h16" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 12v8" />
      </svg>
    ),
    title: "Muebles en Línea Plana",
    description:
      "Diseño y fabricación de mobiliario a medida en melamina. Closets, cocinas, rack TV y vanitorios funcionales para optimizar tus espacios.",
    features: ["Diseño personalizado", "Herrajes de calidad", "Armado en domicilio"],
  },
  {
    id: "limpieza-mantenimiento",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: "Aseo y Limpieza Profunda",
    description:
      "Servicio especializado de limpieza integral. Recuperamos la apariencia de tus muebles de tela y vehículos con maquinaria profesional.",
    features: ["Lavado de alfombras", "Limpieza de sillones", "Limpieza tapiz interior auto"],
  },
  {
    id: "climatizacion",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.792 0-5.484-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    title: "Climatización e Instalaciones",
    description:
      "Venta, instalación y mantenimiento de equipos de Aire Acondicionado para mantener tus espacios confortables todo el año.",
    features: ["Equipos Inverter", "Instalación profesional", "Mantenimiento preventivo"],
  },
];

export default function Servicios() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll("[data-card]");
            cards.forEach((card, i) => {
              setTimeout(() => {
                (card as HTMLElement).style.opacity = "1";
                (card as HTMLElement).style.transform = "translateY(0)";
              }, i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="servicios" className="relative py-28 overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 bg-[#0a0a12]" />

      {/* Decorative glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="h-px w-8 bg-amber-400" />
            <span className="text-amber-400 text-sm font-semibold tracking-[0.2em] uppercase">
              Lo que hacemos
            </span>
            <div className="h-px w-8 bg-amber-400" />
          </div>
          <h2
            className="text-4xl sm:text-5xl font-black leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Nuestros{" "}
            <span className="text-gold-gradient">Servicios</span>
          </h2>
          <p className="mt-6 text-white/50 text-lg max-w-2xl mx-auto">
            Soluciones integrales de construcción adaptadas a cada necesidad, ejecutadas
            con precisión y los más altos estándares de calidad.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, i) => (
            <article
              key={service.id}
              data-card
              id={`service-${service.id}`}
              className="group relative glass-card rounded-2xl p-6 transition-all duration-500 hover:border-amber-400/40 hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1 cursor-default"
              style={{
                opacity: 0,
                transform: "translateY(24px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
                transitionDelay: `${i * 80}ms`,
              }}
            >
              {/* Number */}
              <div
                className="absolute top-4 right-5 text-5xl font-black text-white/[0.03] select-none pointer-events-none"
                style={{ fontFamily: "var(--font-heading)" }}
                aria-hidden="true"
              >
                0{i + 1}
              </div>

              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 text-amber-400 flex items-center justify-center mb-5 group-hover:from-amber-400/30 group-hover:to-amber-600/20 transition-all duration-300 group-hover:scale-110">
                {service.icon}
              </div>

              {/* Content */}
              <h3
                className="text-lg font-bold text-white mb-3"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {service.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-5">
                {service.description}
              </p>

              {/* Features */}
              <ul className="flex flex-col gap-2">
                {service.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2 text-xs text-white/40">
                    <span className="w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-amber-400/0 to-transparent group-hover:via-amber-400/40 transition-all duration-500" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
