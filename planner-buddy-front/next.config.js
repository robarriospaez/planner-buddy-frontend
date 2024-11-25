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

  // Configuración de redirecciones
  async redirects() {
    return [
      {
        source: '/old-route',    // Ruta antigua
        destination: '/new-route', // Nueva ruta
        permanent: true,        // true para redirección permanente (status 301)
      },
    ];
  },

  // Configuración de internacionalización (i18n)
  i18n: {
    locales: ['en', 'es', 'fr'], // Idiomas soportados
    defaultLocale: 'en',         // Idioma predeterminado
  },

  // Configuración personalizada de Webpack (opcional)
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,            // Soporte para importar archivos SVG
      use: ['@svgr/webpack'],
    });
    return config;
  },

  // Variables de entorno (accesibles desde el cliente)
  env: {
    CUSTOM_API_URL: 'https://api.example.com', // Reemplaza con tu URL de API
  },
};

module.exports = nextConfig;
