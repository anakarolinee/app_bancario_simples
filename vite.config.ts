import path from 'path'
import { defineConfig } from 'vitest/config' // Importação alterada
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    slowTestThreshold: 3000, // Só avisa se passar de 3 segundos
    // Importante para shadcn/ui e Radix que usam portais/modais
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
})
