// ─── Configuración del sitio ──────────────────────────────────────────
// Los valores sensibles (INVITE_EMAIL) vienen de variables de entorno
// (archivo `.env`, ignorado por git). Nunca hardcodees emails aquí.

function env(name: string): string | undefined {
  try {
    const viaMeta = (import.meta as unknown as { env?: Record<string, string | undefined> }).env?.[name];
    if (viaMeta) return viaMeta;
  } catch {
    /* import.meta no disponible en este runtime */
  }
  if (typeof process !== 'undefined') return process.env[name];
  return undefined;
}

/** URL canónica donde vive esta landing (sin barra final). Se usa para
 *  canonical, hreflang, Open Graph, sitemap.xml y robots.txt. */
export const SITE_URL = env('SITE_URL') ?? 'https://loremasterai.site';

/** Gmail que recibe las solicitudes de invitación a la demo.
 *  Se usa como respaldo (enlace mailto) si el envío directo falla. */
export const INVITE_EMAIL = env('INVITE_EMAIL') ?? 'loremaster.demo@gmail.com';

/** Clave pública de Web3Forms para enviar el formulario de invitación
 *  directamente desde la página (sin abrir Gmail).
 *  Consíguela en https://web3forms.com y ponla en `.env` como
 *  PUBLIC_WEB3FORMS_KEY=xxxx. Sin clave, el formulario muestra aviso. */
export const WEB3FORMS_KEY = env('PUBLIC_WEB3FORMS_KEY') ?? env('WEB3FORMS_KEY') ?? '';

export const GITHUB_URL = 'https://github.com/sergiogonzalezch/loremaster';
export const DEMO_URL = 'https://loremasterai.site';
