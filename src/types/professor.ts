/** Registro editável de cada homenagem em `src/data/professores.ts`. */
export interface ProfessorData {
  /** Identificador único e estável. */
  id: string;
  /** Nome do arquivo dentro da pasta `Fotos/` (ex.: "Professor_01.png"). */
  foto: string;
  /** Mensagem exclusiva exibida na homenagem. */
  mensagem: string;
  /** Posição na apresentação (menor aparece primeiro). */
  ordem: number;
}

/** Homenagem pronta para exibição: dados + fotografia resolvida pelo Vite. */
export interface Homenagem {
  id: string;
  arquivo: string;
  /** Versão otimizada para a apresentação em tela cheia. */
  src: string;
  /** Miniatura leve para o mural. */
  thumb: string;
  mensagem: string | null;
  ordem: number;
}
