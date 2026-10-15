import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { imagetools } from 'vite-imagetools';

// As fotografias ficam na pasta `Fotos/` (raiz do projeto) e são descobertas
// automaticamente por `import.meta.glob` em `src/lib/fotos.ts`.
// O vite-imagetools gera versões WebP otimizadas no build, preservando os originais.
export default defineConfig({
  plugins: [react(), imagetools()],
  base: './',
});
