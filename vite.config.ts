import path from "node:path";
import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { imagetools } from "vite-imagetools";

const ROUTES = ["", "/work", "/services", "/about", "/contact", "/privacy"];

/** Emits robots.txt and sitemap.xml at build time from SITE_URL. */
function seoFiles(siteUrl: string): Plugin {
  return {
    name: "studiox-seo-files",
    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      });
      const urls = ROUTES.map((r) => `  <url><loc>${siteUrl}${r || "/"}</loc></url>`).join("\n");
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      });
    },
  };
}

/** Serves api/contact.ts during `vite dev` / `vite preview`, identical to the Vercel function. */
function devApi(env: Record<string, string>): Plugin {
  const handle = (load: (p: string) => Promise<Record<string, unknown>>) =>
    async (req: import("node:http").IncomingMessage, res: import("node:http").ServerResponse, next: () => void) => {
      if (!req.url?.startsWith("/api/contact")) return next();
      Object.assign(process.env, env);
      const chunks: Buffer[] = [];
      for await (const c of req) chunks.push(c as Buffer);
      const body = Buffer.concat(chunks);
      const request = new Request(`http://localhost${req.url}`, {
        method: req.method,
        headers: req.headers as Record<string, string>,
        body: req.method === "GET" || req.method === "HEAD" ? undefined : body,
      });
      const mod = await load("/api/contact.ts");
      const fn = mod[req.method ?? "POST"] as ((r: Request) => Promise<Response>) | undefined;
      const out = fn ? await fn(request) : new Response("Method Not Allowed", { status: 405 });
      res.statusCode = out.status;
      out.headers.forEach((v, k) => res.setHeader(k, v));
      res.end(Buffer.from(await out.arrayBuffer()));
    };
  return {
    name: "studiox-dev-api",
    configureServer(server) {
      server.middlewares.use(handle((p) => server.ssrLoadModule(p)));
    },
    configurePreviewServer(server) {
      // Preview has no module graph; load through a throwaway Vite SSR server.
      let ssr: import("vite").ViteDevServer | undefined;
      server.middlewares.use(
        handle(async (p) => {
          const { createServer } = await import("vite");
          ssr ??= await createServer({ configFile: false, server: { middlewareMode: true }, appType: "custom", logLevel: "silent" });
          return ssr.ssrLoadModule(p);
        }),
      );
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const siteUrl = (env.SITE_URL || "https://example.com").replace(/\/$/, "");
  return {
    // Inline PostCSS config: stops Vite searching parent folders (D:\postcss.config.mjs belongs to another project).
    css: { postcss: { plugins: [] } },
    resolve: { alias: { "@": path.resolve(import.meta.dirname, "src") } },
    plugins: [react(), tailwindcss(), imagetools(), seoFiles(siteUrl), devApi(env)],
    define: { __SITE_URL__: JSON.stringify(env.SITE_URL || "") },
    build: { target: "es2022", cssCodeSplit: true },
  };
});
