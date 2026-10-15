/**
 * Descobre automaticamente todas as fotografias da pasta `Fotos/` (raiz do projeto).
 * Basta adicionar um arquivo JPG, JPEG, PNG, WEBP ou AVIF na pasta: ele aparecerá no mural.
 * O vite-imagetools gera duas versões WebP otimizadas de cada fotografia.
 */
const grandes = import.meta.glob<string>(
  '/Fotos/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
  { eager: true, import: 'default', query: { h: '1600', format: 'webp', quality: '84', withoutEnlargement: '' } },
);

const miniaturas = import.meta.glob<string>(
  '/Fotos/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
  { eager: true, import: 'default', query: { w: '420', format: 'webp', quality: '78', withoutEnlargement: '' } },
);

export interface FotoArquivo {
  arquivo: string;
  src: string;
  thumb: string;
}

const nomeDoArquivo = (caminho: string): string => caminho.split('/').pop() ?? caminho;

export const fotos: FotoArquivo[] = Object.entries(grandes)
  .map(([caminho, src]) => ({
    arquivo: nomeDoArquivo(caminho),
    src,
    thumb: miniaturas[caminho] ?? src,
  }))
  .sort((a, b) => a.arquivo.localeCompare(b.arquivo, 'pt-BR', { numeric: true }));
