"use client";

import { useRef, useEffect, useState } from "react";
import type { Project } from "@/lib/getProjects";

const IG_PROJECTS = [
  { id: "DUog0USj-1B", url: "https://www.instagram.com/p/DUog0USj-1B/", category: "Obras Exteriores", title: "Cañería subterránea" },
  { id: "DUByLW2j8hY", url: "https://www.instagram.com/p/DUByLW2j8hY/", category: "Construcción", title: "Bodega parcela" },
  { id: "DRvoI5pEd2d", url: "https://www.instagram.com/p/DRvoI5pEd2d/", category: "Mueblería", title: "Rack TV Talca" },
  { id: "DRW3fuekWXd", url: "https://www.instagram.com/p/DRW3fuekWXd/", category: "Obras Exteriores", title: "Piscina hormigón" },
  { id: "DQLFacdkQaj", url: "https://www.instagram.com/p/DQLFacdkQaj/", category: "Mueblería", title: "Escritorio flotante" },
  { id: "DP1xlaKj4NR", url: "https://www.instagram.com/p/DP1xlaKj4NR/", category: "Mueblería", title: "Mueble rack TV" },
  { id: "DPpSbIwj831", url: "https://www.instagram.com/p/DPpSbIwj831/", category: "Mueblería", title: "Diseño walk-in closet" },
  { id: "DNzUGZ4YtOT", url: "https://www.instagram.com/p/DNzUGZ4YtOT/", category: "Mueblería", title: "Armado walk-in clóset" },
  { id: "DKsvXNzPMIX", url: "https://www.instagram.com/p/DKsvXNzPMIX/", category: "Mueblería", title: "Centro de TV" },
  { id: "DKLbLwQxIjn", url: "https://www.instagram.com/p/DKLbLwQxIjn/", category: "Construcción", title: "Techo logia" },
  { id: "DIM4a5vvNr6", url: "https://www.instagram.com/p/DIM4a5vvNr6/", category: "Limpieza", title: "Limpieza sillones" },
  { id: "DGrBD2cvQK6", url: "https://www.instagram.com/p/DGrBD2cvQK6/", category: "Climatización", title: "AC Midea Inverter" },
  { id: "DGPEmz4vJZ6", url: "https://www.instagram.com/p/DGPEmz4vJZ6/", category: "Construcción", title: "Ampliación lucarna" },
  { id: "DC2-onrRvTI", url: "https://www.instagram.com/p/DC2-onrRvTI/", category: "Mueblería", title: "Proyecto cocina" },
  { id: "DCpx2zqPYHg", url: "https://www.instagram.com/p/DCpx2zqPYHg/", category: "Limpieza", title: "Limpieza integral" },
  { id: "DBcRc-fvzD6", url: "https://www.instagram.com/p/DBcRc-fvzD6/", category: "Limpieza", title: "Limpieza de sofá" },
  { id: "DBSbaz8Rmn0", url: "https://www.instagram.com/p/DBSbaz8Rmn0/", category: "Mueblería", title: "Cocina Colbún" },
  { id: "C191x7qrluP", url: "https://www.instagram.com/p/C191x7qrluP/", category: "Construcción", title: "Ampliación segundo piso" },
  { id: "CzfLOJrrzZT", url: "https://www.instagram.com/p/CzfLOJrrzZT/", category: "Mueblería", title: "Proyecto cocina" },
  { id: "CzO4PqEOjkm", url: "https://www.instagram.com/p/CzO4PqEOjkm/", category: "Construcción", title: "Trabajo portón" },
  { id: "CyT6YLLuqVH", url: "https://www.instagram.com/p/CyT6YLLuqVH/", category: "Mueblería", title: "Proyecto cocina" },
  { id: "CogD0-UA04Y", url: "https://www.instagram.com/p/CogD0-UA04Y/", category: "Construcción", title: "Ampliación casa" },
];

const CATEGORIES = ["Todos", "Construcción", "Mueblería", "Obras Exteriores", "Limpieza", "Climatización"];

interface ProyectosProps {
  initialProjects?: Project[] | null;
}

export default function Proyectos({ initialProjects }: ProyectosProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [visible, setVisible] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  // Fallback to local data if the spreadsheet is empty or fails
  const dataToUse = initialProjects && initialProjects.length > 0 ? initialProjects : IG_PROJECTS;

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
      ? dataToUse
      : dataToUse.filter((p) => p.category === activeCategory);

  const displayedProjects = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

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
              onClick={() => {
                setActiveCategory(cat);
                setVisibleCount(6);
              }}
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project, i) => (
            <article
              key={project.id}
              id={`project-${project.id}`}
              className="group relative rounded-2xl overflow-hidden glass-card hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-500 flex flex-col items-center justify-center bg-white"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(32px)",
                transition: `opacity 0.6s ease ${i * 80}ms, transform 0.6s ease ${i * 80}ms`,
                // Embed of Instagram generally takes a tall aspect ratio
                minHeight: "480px"
              }}
            >
              <iframe
                title={`Instagram post: ${project.title}`}
                src={`${project.url}embed`}
                className="w-full h-full border-none m-0 p-0"
                allow="encrypted-media"
                style={{ flex: 1, minHeight: "480px" }}
              />
            </article>
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="px-6 py-2.5 text-sm font-semibold text-white/70 border border-white/20 rounded-full hover:border-amber-400/50 hover:text-amber-400 hover:bg-amber-400/5 transition-all duration-300"
            >
              Ver más proyectos
            </button>
          </div>
        )}

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
