import { NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { SITE_CONFIG } from '@/lib/siteConfig';

export const runtime = 'edge';

const SYSTEM_PROMPT = `
# IDENTIDAD
TÚ ERES CipoBot, el asistente virtual e inteligente de ${SITE_CONFIG.name}.
Hablas EN NOMBRE de la empresa en todo momento. Tu propósito es atender de manera amable, servicial y profesional a los clientes o posibles clientes que visitan la página web.

# MEMORIA Y CONTEXTO
1. Analiza el historial de nuestra conversación para no repetirte y seguir el hilo.
2. Somos una empresa ubicada en ${SITE_CONFIG.city}, ${SITE_CONFIG.region}, ${SITE_CONFIG.country}.
3. Nos dedicamos a la Construcción en General y Muebles en Línea Plana. Nos caracterizamos por la "Calidad garantizada en cada terminación".

# REGLAS DE NARRATIVA Y ATENCIÓN AL CLIENTE (CRÍTICO)
1. HABLA EN PRIMERA PERSONA DEL PLURAL (Nosotros): Di "Nosotros desarrollamos", "Nuestros servicios", "En Constructora Cipo nosotros...". Excepción: Si hablas de ti mismo, di "Soy CipoBot, el asistente virtual".
2. TONO: Tu tono debe ser cálido, profesional, seguro y servicial. Trata al usuario con respeto y disposición para ayudarle a concretar su proyecto.
3. PREGUNTAS SOBRE PROYECTOS O SERVICIOS: Si un usuario pregunta qué hacemos o responde afirmativamente a un trabajo común, entusiásmate e invítalo a cotizar.
4. LIMITACIÓN DE IA: Si te preguntan por un servicio muy específico o valores exactos, aclara que cada proyecto es único y los valores deben ser evaluados en terreno.
5. 🎯 CAPTURA DE LEADS (MUY IMPORTANTE): Si un usuario muestra una clara intención de solicitar un presupuesto, comprar, o requiere una vista técnica (ej. "quiero hacer una ampliación", "cuanto sale un radier"):
   - Respóndele brevemente que es factible, e inmediatamente PÍDELE SUS DATOS DE CONTACTO diciendo algo como: "¿Podrías dejarme por aquí tu nombre y tu número de teléfono para que un experto te llame hoy mismo?"
   - Si el usuario te da sus datos, agradécele y dile que un asesor se comunicará a la brevedad.

# CONTACTO Y DERIVACIÓN
- Si el usuario pide EXPLÍCITAMENTE tus medios de contacto (ej. "dame su numero", "como los contacto"), entrégale INMEDIATAMENTE:
  - **Email:** ${SITE_CONFIG.email}
  - **WhatsApp:** ${SITE_CONFIG.phone.display} 
  (Opcionalmente indícale el botón flotante). En este caso NO le pidas sus datos a cambio.

# REGLAS DE RESPUESTA
1. SÉ EXTREMADAMENTE CONCISO. Tus respuestas deben tener MÁXIMO 2 o 3 oraciones cortas. No des respuestas largas, mantén el ritmo de un chat rápido.
2. Si preguntan por proyectos anteriores, diles que "Hemos trabajado en múltiples proyectos habitacionales y obras civiles de gran nivel en Talca y alrededores. ¡Puedes ver algunos de los más recientes en nuestra galería de esta misma página web!".
3. Si alguien es grosero, mantén la postura profesional.
4. NO uses formato Markdown para enlaces o correos electrónicos (ej. no uses [texto](link) ni <email>). Escribe los emails y números de teléfono directamente como texto plano.
`;

// Simple in-memory rate limit (Edge nodes are ephemeral, but this protects against rapid bursts)
const rateLimitMap = new Map<string, { count: number, lastReset: number }>();
const LIMIT = 10; // mensajes
const WINDOW = 60 * 1000; // 1 minuto

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('cf-connecting-ip') || 'anonymous';
    const now = Date.now();
    const userLimit = rateLimitMap.get(ip) || { count: 0, lastReset: now };

    if (now - userLimit.lastReset > WINDOW) {
      userLimit.count = 0;
      userLimit.lastReset = now;
    }

    if (userLimit.count >= LIMIT) {
      return NextResponse.json({
        error: 'RATE_LIMIT_EXCEEDED',
        message: 'Has enviado demasiados mensajes en poco tiempo. Por favor, espera un momento o contáctanos por WhatsApp.'
      }, { status: 429 });
    }

    userLimit.count++;
    rateLimitMap.set(ip, userLimit);

    const { messages, sessionId } = await req.json();

    // Limitar a los últimos 6 mensajes para conservar tokens y memoria
    const limitedMessages = (messages || []).slice(-6);

    // 1. Intentar obtener el contexto de Cloudflare de forma segura
    let context;
    try {
      context = getRequestContext();
    } catch {
      context = null;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const env = (context?.env as any) || {};

    // Helper para enviar datos a Google Sheets
    const sendToWebhook = (userQuestion: string, aiResponse: string) => {
      const webhookUrl = env.GOOGLE_SHEETS_CHAT_WEBHOOK || process.env.GOOGLE_SHEETS_CHAT_WEBHOOK;
      if (!webhookUrl) return;

      const finalIpId = ip === 'anonymous' && sessionId ? `Usuario-${sessionId}` : ip;
      const payload = { ip: finalIpId, pregunta: userQuestion, respuesta: aiResponse };

      const p = fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(e => console.error("Error webhook:", e));

      if (context?.ctx?.waitUntil) {
        context.ctx.waitUntil(p);
      }
    };

    const userMessageContent = limitedMessages.length > 0 ? limitedMessages[limitedMessages.length - 1].content : "";

    // PRIORIDAD 1: BINDING NATIVO 'AI'
    const ai = env.AI;

    if (ai && typeof ai.run === 'function') {
      try {
        const result = await ai.run('@cf/meta/llama-3-8b-instruct', {
          messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...limitedMessages],
          max_tokens: 1024,
        });
        sendToWebhook(userMessageContent, result.response as string);
        return NextResponse.json({ response: result.response });
      } catch (aiError) {
        console.error("Error en el Binding de AI:", aiError);
      }
    }

    // PRIORIDAD 2: FALLBACK CON FETCH (API DIRECTA EN DESARROLLO)
    const ACCOUNT_ID = env.CLOUDFLARE_ACCOUNT_ID || process.env.CLOUDFLARE_ACCOUNT_ID;
    const API_TOKEN = env.CLOUDFLARE_API_TOKEN || process.env.CLOUDFLARE_API_TOKEN;

    if (ACCOUNT_ID && API_TOKEN) {
      const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai/run/@cf/meta/llama-3-8b-instruct`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...limitedMessages],
          }),
        }
      );

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = await response.json();

      if (data.success && data.result?.response) {
        sendToWebhook(userMessageContent, data.result.response);
        return NextResponse.json({ response: data.result.response });
      } else {
        console.error("Error detallado de la API de Cloudflare:", data);
      }
    }

    console.error("Configuración insuficiente. Llaves detectadas en env:", Object.keys(env));

    return NextResponse.json({
      error: 'CipoBot no pudo inicializar el motor de IA. Verifica Bindings o Variables de Entorno.'
    }, { status: 500 });

  } catch (error) {
    console.error('Chat error crítico:', error);
    return NextResponse.json({ error: 'Error de conexión interno en la API.' }, { status: 500 });
  }
}
