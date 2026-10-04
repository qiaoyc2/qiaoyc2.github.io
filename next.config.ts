import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emits a fully static site into `out/`, which is what GitHub Pages serves.
  // Server components still run — they just run at build time instead of per request.
  output: "export",

  // Produces `projects/token-tots/index.html` rather than `projects/token-tots.html`.
  // GitHub Pages resolves directory URLs reliably; extensionless files are less predictable.
  trailingSlash: true,

  // Pages has no image optimization server, so images must ship pre-sized.
  // See public/projects/README.md for the dimensions to export at.
  images: { unoptimized: true },
};

export default nextConfig;
