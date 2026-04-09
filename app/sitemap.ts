import type { MetadataRoute } from 'next'

// La URL base para SEO. Si tienes un dominio, ajustarlo en tus variables de entorno en producción.
const fallbackUrl = 'https://constructoracipo.cl';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || fallbackUrl;

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
