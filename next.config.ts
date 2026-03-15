import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Genera archivos estáticos para Hostinger
  trailingSlash: true,  // Asegura que las URLs terminen en "/"
 images: {
    unoptimized: true, // Requerido para output: 'export'
    domains: ['cataas.com', 'catfact.ninja'], // Agrega los dominios desde los cuales se cargarán imágenes
  },
};

export default nextConfig;
