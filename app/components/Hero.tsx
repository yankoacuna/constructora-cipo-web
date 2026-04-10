"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    const children = titleRef.current?.parentElement?.children ?? [];
    Array.from(children).forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, []);

  const handleCotizar = () => {
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleProyectos = () => {
    document.getElementById("proyectos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.webp"
          alt="Obra de construcción Constructora Cipo"
          fill
          priority
          quality={60}
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Dark Overlay */}
      <div className="hero-overlay absolute inset-0 z-10" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(251,191,36,1) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 py-32 text-center">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/5 backdrop-blur-sm mb-8 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-amber-400 text-sm font-medium tracking-wider uppercase">
            Talca, Chile
          </span>
        </div>

        {/* Main Title */}
        <h1
          ref={titleRef}
          className="opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          <span
            className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight text-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Construimos
          </span>
          <span
            className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight text-gold-gradient mt-1"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            el Espacio
          </span>
          <span
            className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight text-white mt-1"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            que Mereces.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="mt-8 text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
        >
          Somos una empresa dedicada a construcción en general y muebles en línea plana
          con atención al detalle y un fuerte compromiso con cada uno de nuestros clientes.
        </p>

        {/* CTA Buttons */}
        <div
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.55s", animationFillMode: "forwards" }}
        >
          <button
            id="hero-cta-cotizar"
            onClick={handleCotizar}
            className="group relative px-8 py-4 text-base font-bold tracking-wide text-black bg-gradient-to-r from-amber-400 to-amber-600 rounded-full overflow-hidden hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-300 hover:scale-105 active:scale-95 animate-pulse-gold"
          >
            <span className="relative z-10">Cotizar Proyecto</span>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-300 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          <button
            id="hero-cta-proyectos"
            onClick={handleProyectos}
            className="flex items-center gap-2 px-8 py-4 text-base font-semibold tracking-wide text-white/80 border border-white/20 rounded-full hover:border-amber-400/50 hover:text-amber-400 hover:bg-amber-400/5 transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-sm"
          >
            Ver Proyectos
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>

        {/* Stats Row */}
        <div
          className="mt-20 grid grid-cols-3 gap-6 max-w-xl mx-auto opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}
        >
          {[
            { value: "10+", label: "Proyectos" },
            { value: "100%", label: "Satisfacción" },
            { value: "5★", label: "Calificación" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-2xl sm:text-3xl font-black text-gold-gradient"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {stat.value}
              </div>
              <div className="text-xs text-white/40 mt-1 tracking-wider uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
