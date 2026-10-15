import { professores } from '../data/professores';
import type { Homenagem } from '../types/professor';
import { fotos } from './fotos';

const porArquivo = new Map(professores.map((p) => [p.foto.toLowerCase(), p]));

/**
 * Une cada fotografia encontrada em `Fotos/` à sua mensagem cadastrada.
 * Fotografias sem cadastro aparecem no final, sem mensagem, até que uma seja escrita.
 */
export const homenagens: Homenagem[] = fotos
  .map((foto, i) => {
    const dados = porArquivo.get(foto.arquivo.toLowerCase());
    if (!dados && import.meta.env.DEV) {
      console.warn(`[homenagem] "${foto.arquivo}" ainda não tem mensagem em src/data/professores.ts`);
    }
    return {
      id: dados?.id ?? `foto-${foto.arquivo}`,
      arquivo: foto.arquivo,
      src: foto.src,
      thumb: foto.thumb,
      mensagem: dados?.mensagem ?? null,
      ordem: dados?.ordem ?? 10_000 + i,
    };
  })
  .sort((a, b) => a.ordem - b.ordem);
