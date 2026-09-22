# LoreMaster — Landing Page

Landing page bilingüe (ES/EN) de **LoreMaster**: plataforma RAG para worldbuilding
(escritores y narradores de rol). Sitio 100 % estático construido con
[Astro](https://astro.build), sin backend propio.

- **URL producción (landing):** https://loremaster-landing.vercel.app
  (subdominio gratis de Vercel — verifica el real en tu dashboard)
- **Demo del proyecto (app real):** https://loremasterai.site (acceso por invitación)
- **Repo del producto:** https://github.com/sergiogonzalezch/loremaster

> Esta landing y la demo son **dos sitios distintos**: la landing vive en
> Vercel y los botones "Demo" apuntan a `loremasterai.site`, donde se aloja
> el proyecto. En el código esto se refleja en `src/site.ts`:
> `SITE_URL` = URL de la landing (canonical, Open Graph, sitemap),
> `DEMO_URL` = URL de la demo del proyecto.

## 1. Contenido de la página

| Sección | Ancla | Descripción |
|---|---|---|
| Hero | `#top` | Titular, CTAs, comando `git clone` y métricas |
| Producto | `#producto` | Tabs: Funciones · Cómo funciona · Demo interactiva |
| Arquitectura | `#arquitectura` | Tabs: Stack · Datos · Seguridad |
| Proyecto | `#proyecto` | Tabs: Calidad · Self-hosted · Roadmap · Costos |
| FAQ | `#faq` | Acordeón de preguntas frecuentes |
| Invitación | `#invite` | Formulario de solicitud de acceso a la demo |
| Footer | — | Marca, enlaces y derechos reservados |

El navbar solo enlaza a **secciones directas** (`#producto`, `#arquitectura`,
`#proyecto`, `#faq`); los tabs se controlan dentro de cada sección.

### Estructura del proyecto

```
src/
├── components/   # Navbar, Hero, ProductTabs, TechTabs, ProjectTabs, Faq, Invite, Footer…
├── i18n/         # translations.ts — todos los textos ES/EN
├── layouts/      # Layout.astro (SEO, Open Graph, JSON-LD, hreflang)
├── pages/        # index.astro (ES), en/index.astro (EN), robots.txt.ts, sitemap.xml.ts
├── site.ts       # URLs y claves (lee variables de entorno)
└── styles/       # global.css (tokens y estilos compartidos)
public/           # favicon.svg, og.svg
```

### Variables de entorno

| Variable | Requerida | Descripción |
|---|---|---|
| `PUBLIC_WEB3FORMS_KEY` | Sí (formulario) | Access key de Web3Forms para envío directo |
| `INVITE_EMAIL` | No | Correo de respaldo para el enlace mailto |
| `SITE_URL` | No | URL pública de la landing (por defecto `https://loremaster-landing.vercel.app`; pon la real). OJO: no es la URL de la demo |

## 2. Desarrollo local

Requisitos: Node.js 18+ y npm.

```bash
npm install
cp .env.example .env   # y rellena tus valores (ver sección 3)
npm run dev            # http://localhost:4321/
npm run build          # genera dist/ (sitio estático)
npm run preview        # sirve dist/ en local para verificar
```

## 3. Configurar el formulario (Web3Forms)

El formulario de invitación (`#invite`) se envía **directamente desde la
página** con [Web3Forms](https://web3forms.com) (plan gratuito, sin backend).
Ya está integrado en `src/components/Invite.astro`: hace `POST` a
`https://api.web3forms.com/submit` e incluye anti-spam honeypot. Solo falta
la clave.

### Paso a paso

1. Entra a **https://web3forms.com** y registra el correo donde quieres
   recibir las solicitudes (recomendado: el mismo de `INVITE_EMAIL`).
2. Te llegará un correo con tu **Access Key**. (El primer envío desde la web
   pide confirmación: ábrelo y acepta para activar la recepción).
3. Añade la clave a tu `.env` local:
   ```bash
   PUBLIC_WEB3FORMS_KEY=tu-access-key-de-web3forms
   ```
4. Reinicia `npm run dev` y prueba el formulario: debes ver
   `¡Solicitud enviada!` y recibir el correo con nombre, email, perfil
   y mensaje del solicitante.
5. En producción, configura la **misma variable** en el panel de tu
   hosting (ver sección 4) y redespliega. Sin clave, el formulario muestra
   mensaje de error por diseño (la clave viaja en el HTML como
   `data-web3key`, es pública por diseño de Web3Forms).
6. (Opcional) En el dashboard de Web3Forms puedes restringir la clave a tu
   dominio para evitar usos desde otros sitios.

> Respaldo: si el envío directo falla, el formulario ofrece un enlace
> `mailto:` a `INVITE_EMAIL` para contactar desde el cliente de correo.

## 4. Despliegue

El proyecto es **estático** (`npm run build` → `dist/`), así que cualquier
hosting de sitios estáticos sirve. No requiere servidor, base de datos ni
costos: el único backend es Web3Forms (gratis).

### Plan recomendado: Vercel (gratis, $0)

Por qué: preset de Astro con cero configuración, deploys automáticos desde
Git, HTTPS y dominio personalizado incluidos en el plan Hobby.

1. Sube el repo a GitHub.
2. En [vercel.com](https://vercel.com) → **Add New → Project** → importa el repo.
   - Framework: **Astro** (autodetectado)
   - Build command: `npm run build`
   - Output directory: `dist`
3. En **Settings → Environment Variables** añade:
   - `PUBLIC_WEB3FORMS_KEY` = tu access key
   - `INVITE_EMAIL` = tu correo (opcional)
   - `SITE_URL` = la URL real de tu landing en Vercel
     (verifícala en el dashboard tras el primer deploy, p. ej.
     `https://loremaster-landing.vercel.app`)
4. **Deploy**. Cada `git push` a la rama principal redespliega solo.
5. (Opcional, más adelante) Dominio propio: **Settings → Domains**. Ten en
   cuenta que `loremasterai.site` ya aloja la demo del proyecto: si algún día
   quieres la landing en un dominio propio, usa un **subdominio**
   (p. ej. `landing.loremasterai.site`) para no pisar la demo, y actualiza
   `SITE_URL` con esa URL.

### Alternativas gratuitas

| Hosting | Plan gratis | Notas |
|---|---|---|
| **Cloudflare Pages** | Ilimitado, muy generoso | Build `npm run build`, output `dist`. Variables en dashboard. Ideal si tu DNS ya está en Cloudflare |
| **Netlify** | 300 min build/mes | Preset Astro, output `dist`. Dominio y HTTPS incluidos |
| **GitHub Pages** | Ilimitado (repos públicos) | Requiere `base` en `astro.config.mjs` si es URL tipo `usuario.github.io/repo` y workflow de deploy |

> El hosting es ~$0 en planes gratuitos: Vercel/Cloudflare/Netlify no cobran
> por sitios estáticos. Y recuerda: `loremasterai.site` sigue alojando la
> demo del proyecto; la landing vive en su propio subdominio de Vercel.

## 5. Licencia

© 2026 Sergio Guadalupe González Chávez. Todos los derechos reservados.
