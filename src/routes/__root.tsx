import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteProvider } from "@/lib/site";
import { SITE_URL, THEME_BOOT } from "@/lib/content";

const DESCRIPTION =
  "Landscape architecture and outdoor living for homes across Toronto and York Region: pools, terraces, outdoor kitchens and lit entries, designed as one.";
import appCss from "../styles.css?url";

const FONT =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Noto+Sans+SC:wght@400;500&family=Noto+Serif+SC:wght@500;600&family=Outfit:wght@300;400;500&display=swap";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Jenny Bu — Landscape Architecture & Outdoor Living" },
      {
        name: "description",
        content: DESCRIPTION,
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Jenny Bu" },
      { property: "og:title", content: "Jenny Bu — Landscape Architecture & Outdoor Living" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: `${SITE_URL}/images/landscape/sunset-pool-spillover-spa-lounge.webp` },
      { name: "theme-color", content: "#12110f" },
    ],
    links: [
      { rel: "canonical", href: SITE_URL },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: FONT },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: () => (
    <html lang="en" data-theme="dark" data-lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <SiteProvider>
            <Outlet />
          </SiteProvider>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
