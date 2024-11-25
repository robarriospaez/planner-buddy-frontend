import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Carpeta donde se guardan las pruebas
  use: {
    baseURL: 'http://localhost:3000', // URL de tu aplicación
    headless: true,                   // Ejecuta pruebas sin interfaz gráfica
    screenshot: 'only-on-failure',    // Captura pantallas en fallos
    video: 'retain-on-failure',       // Graba videos en fallos
    trace: 'on-first-retry',          // Guarda trazas en fallos
  },
});
