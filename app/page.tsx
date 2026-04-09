import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Nosotros from "./components/Nosotros";
import Servicios from "./components/Servicios";
import Proyectos from "./components/Proyectos";
import Contacto from "./components/Contacto";
import Footer from "./components/Footer";
import { getProjects } from "@/lib/getProjects";

export const runtime = 'edge';

export default async function HomePage() {
  const projectsData = await getProjects();

  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Nosotros />
      <Servicios />
      <Proyectos initialProjects={projectsData} />
      <Contacto />
      <Footer />
    </main>
  );
}
