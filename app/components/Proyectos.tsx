"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

const PROJECTS = [
  {
    id: "casa-moderna-talca",
    image: "/project_house.webp",
    title: "Casa Moderna",
    location: "Talca, VII Región",
    category: "Construcción Habitacional",
    year: "2024",
  },
  {
    id: "edificio-comercial",
    image: "/project_commercial.webp",
    title: "Edificio Comercial",
    location: "Talca Centro",
    category: "Obras Civiles",
    year: "2024",
  },
  {
    id: "remodelacion-premium",
    image: "/project_remodel.webp",
    title: "Remodelación Premium",
    location: "Sector Oriente, Talca",
    category: "Remodelaciones",
    year: "2025",
  },
  {
    id: "piscina-premium",
    image: "/project_pool.webp",
    title: "Piscina Moderna",
    location: "Parcela sector Florida",
    category: "Obras Exteriores",
    year: "2025",
  },
  {
    id: "cocina-melamina",
    image: "/project_furniture.webp",
    title: "Cocina a Medida",
    location: "Departamento Centro, Talca",
    category: "Mueblería",
    year: "2024",
  },
];

const CATEGORIES = ["Todos", "Construcción Habitacional", "Obras Civiles", "Remodelaciones", "Obras Exteriores", "Mueblería"];

export default function Proyectos() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filtered =
    activeCategory === "Todos"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="proyectos" className="relative py-28 overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#020205] via-[#0f0f18] to-[#020205]" />
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="h-px w-8 bg-amber-400" />
            <span className="text-amber-400 text-sm font-semibold tracking-[0.2em] uppercase">
              Nuestro Trabajo
            </span>
            <div className="h-px w-8 bg-amber-400" />
          </div>
          <h2
            className="text-4xl sm:text-5xl font-black leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Proyectos{" "}
            <span className="text-gold-gradient">Realizados</span>
          </h2>
          <p className="mt-6 text-white/50 text-lg max-w-xl mx-auto">
            Obras que hablan por sí solas. Cada proyecto es un testimonio de
            nuestra dedicación y excelencia constructiva.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              id={`filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${activeCategory === cat
                ? "bg-gradient-to-r from-amber-400 to-amber-600 text-black shadow-lg shadow-amber-500/20"
                : "glass-card text-white/60 hover:text-white hover:border-amber-400/30"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <article
              key={project.id}
              id={`project-${project.id}`}
              className="group relative rounded-2xl overflow-hidden glass-card hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-500 hover:-translate-y-1"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(32px)",
                transition: `opacity 0.6s ease ${i * 120}ms, transform 0.6s ease ${i * 120}ms`,
              }}
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-108"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f18] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/90 text-black">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3
                    className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors duration-300"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {project.title}
                  </h3>
                  <span className="text-amber-400/60 text-sm font-medium flex-shrink-0">
                    {project.year}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-2 text-white/40 text-sm">
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                  </svg>
                  <span>{project.location}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <p className="text-white/40 text-sm mb-4">
            ¿Tienes un proyecto en mente? Hablemos.
          </p>
          <button
            onClick={() =>
              document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })
            }
            id="proyectos-cta"
            className="px-8 py-3.5 text-sm font-bold tracking-wide text-black bg-gradient-to-r from-amber-400 to-amber-600 rounded-full hover:from-amber-300 hover:to-amber-500 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/25 active:scale-95"
          >
            Iniciar mi Proyecto
          </button>
        </div>
      </div>
    </section>
  );
}
