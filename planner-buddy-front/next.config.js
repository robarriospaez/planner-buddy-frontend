/** @type {import('next').NextConfig} */
const nextConfig = {
  // Modo estricto de React
  reactStrictMode: true,

  // Minificación de código usando SWC
  swcMinify: true,

  // Configuración para imágenes externas
  images: {
    domains: ['example.com', 'another-domain.com'], // Reemplaza con tus dominios permitidos
  },

};

module.exports = nextConfig;
