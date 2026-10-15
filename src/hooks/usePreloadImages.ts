import { useEffect } from 'react';

const jaCarregadas = new Set<string>();

/** Pré-carrega e decodifica as próximas fotografias para evitar telas vazias nas transições. */
export function usePreloadImages(urls: readonly string[]): void {
  const chave = urls.join('|');
  useEffect(() => {
    chave
      .split('|')
      .filter((url) => url && !jaCarregadas.has(url))
      .forEach((url) => {
        jaCarregadas.add(url);
        const img = new Image();
        img.decoding = 'async';
        img.src = url;
        img.decode?.().catch(() => jaCarregadas.delete(url));
      });
  }, [chave]);
}
