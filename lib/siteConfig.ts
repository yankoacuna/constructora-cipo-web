/**
 * Configuración global del sitio — Constructora Cipo
 * Modifica aquí para actualizar datos de contacto en toda la app.
 */
export const SITE_CONFIG = {
  /** Nombre de la empresa */
  name: "Constructora Cipo",

  /** Ubicación */
  city: "Talca",
  region: "Región del Maule",
  country: "Chile",

  /** Contacto */
  phone: {
    primary: {
      display: "+56 9 3698 1316",
      href: "+56936981316",
      whatsapp: "56936981316",
    },
    secondary: {
      display: "+56 9 7148 0952",
      href: "+56971480952",
      whatsapp: "56971480952",
    },
  },

  email: "constructoracipo.26@gmail.com",

  /** Redes sociales */
  social: {
    instagram: "https://instagram.com/constructoracipo",
    instagramHandle: "@constructoracipo",
    whatsappMessage:
      "Hola Constructora Cipo, me interesa cotizar un proyecto. ¿Podemos hablar?",
  },

  /** SEO */
  seo: {
    title: "Constructora Cipo | Construcción General y Muebles en Talca",
    description:
      "Constructora Cipo — Somos una empresa dedicada a construcción en general y muebles en línea plana en Talca, Chile. Calidad garantizada en cada terminación.",
  },
} as const;

/** URL de WhatsApp con mensaje prellenado */
export function getWhatsAppUrl(customMessage?: string): string {
  const msg = encodeURIComponent(
    customMessage ?? SITE_CONFIG.social.whatsappMessage
  );
  return `https://wa.me/${SITE_CONFIG.phone.primary.whatsapp}?text=${msg}`;
}
