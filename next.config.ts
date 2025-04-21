import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,  // Asegura que las URLs terminen en "/"
  basePath: '/nombre-de-tu-repositorio',  // Reemplaza con el nombre de tu repositorio
  assetPrefix: '/nombre-de-tu-repositorio/',  // Reemplaza con el nombre de tu repositorio
  images: {
    domains: ['cataas.com', 'catfact.ninja'], // Agrega los dominios desde los cuales se cargarán imágenes
  },
};

export default nextConfig;
