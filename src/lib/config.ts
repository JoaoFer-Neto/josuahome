export const ESCOLA = 'ECI João Suassuna';
export const ASSINATURA = `Com carinho e gratidão, ${ESCOLA}.`;

export const AUDIO_SRC = `${import.meta.env.BASE_URL}audio/piano.mp3`;
export const VOLUME_INICIAL = 0.25;

export const DURACOES_DISPONIVEIS = [10, 15, 20, 25] as const;
export const DURACAO_PADRAO_S = 15;

/** Tempo para as animações de entrada antes de começar a leitura. */
const TEMPO_ENTRADA_MS = 3_000;
/** Cerca de 200 palavras por minuto, confortável para leitura em voz baixa na TV. */
const MS_POR_PALAVRA = 300;

export const contarPalavras = (texto: string | null): number =>
  texto ? texto.trim().split(/\s+/).length : 0;

/** Duração de uma homenagem: tempo-base ou o mínimo para ler a mensagem, o que for maior. */
export function duracaoDaHomenagem(mensagem: string | null, baseS: number, ajusteAutomatico: boolean): number {
  const base = baseS * 1000;
  if (!ajusteAutomatico) return base;
  return Math.max(base, TEMPO_ENTRADA_MS + contarPalavras(mensagem) * MS_POR_PALAVRA);
}

export const doisDigitos = (n: number): string => String(n).padStart(2, '0');
