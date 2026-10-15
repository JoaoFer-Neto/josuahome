import { useCallback, useEffect, useRef, useState } from 'react';

interface Options {
  total: number;
  inicio: number;
  autoplay: boolean;
  /** Duração (ms) da homenagem no índice informado. */
  duracaoDe: (indice: number) => number;
  /** Chamado quando a última homenagem termina. */
  aoTerminar: () => void;
}

/** Tempo restante de uma única exibição. Cada troca de foto cria um novo objeto. */
interface Janela {
  ms: number;
}

interface TimerAtivo {
  id: number;
  iniciadoEm: number;
  janela: Janela;
}

/**
 * Controla a apresentação automática com um único temporizador.
 * - Pausar guarda o tempo restante da foto atual; continuar retoma desse ponto.
 * - Trocar de foto (manual ou automaticamente) reinicia o tempo da nova foto.
 */
export function useSlideshow({ total, inicio, autoplay, duracaoDe, aoTerminar }: Options) {
  const [indice, setIndice] = useState(inicio);
  const [reproduzindo, setReproduzindo] = useState(autoplay);
  /** Muda a cada nova exibição; serve de `key` para reiniciar animações e a barra de progresso. */
  const [ciclo, setCiclo] = useState(0);
  const [duracao, setDuracao] = useState(() => duracaoDe(inicio));
  const [restantePausado, setRestantePausado] = useState(() => duracaoDe(inicio));

  const indiceRef = useRef(inicio);
  const cicloRef = useRef(0);
  const janelaRef = useRef<Janela>({ ms: duracao });
  const timerRef = useRef<TimerAtivo | null>(null);
  const duracaoDeRef = useRef(duracaoDe);
  const aoTerminarRef = useRef(aoTerminar);

  useEffect(() => {
    duracaoDeRef.current = duracaoDe;
    aoTerminarRef.current = aoTerminar;
  });

  const pararTimer = useCallback(() => {
    const ativo = timerRef.current;
    if (!ativo) return;
    window.clearTimeout(ativo.id);
    ativo.janela.ms = Math.max(0, ativo.janela.ms - (performance.now() - ativo.iniciadoEm));
    timerRef.current = null;
  }, []);

  const irPara = useCallback(
    (destino: number) => {
      pararTimer();
      const alvo = Math.min(Math.max(destino, 0), Math.max(total - 1, 0));
      const ms = duracaoDeRef.current(alvo);
      indiceRef.current = alvo;
      janelaRef.current = { ms };
      cicloRef.current += 1;
      setIndice(alvo);
      setDuracao(ms);
      setRestantePausado(ms);
      setCiclo(cicloRef.current);
    },
    [pararTimer, total],
  );

  const avancar = useCallback(() => {
    if (indiceRef.current >= total - 1) {
      pararTimer();
      setReproduzindo(false);
      aoTerminarRef.current();
      return;
    }
    irPara(indiceRef.current + 1);
  }, [irPara, pararTimer, total]);

  const avancarRef = useRef(avancar);
  useEffect(() => {
    avancarRef.current = avancar;
  });

  // Um único temporizador por exibição; é recriado somente quando a foto muda ou ao retomar.
  useEffect(() => {
    if (!reproduzindo || total === 0) return;
    pararTimer();
    const janela = janelaRef.current;
    const id = window.setTimeout(() => {
      timerRef.current = null;
      janela.ms = 0;
      avancarRef.current();
    }, janela.ms);
    timerRef.current = { id, iniciadoEm: performance.now(), janela };
    return pararTimer;
  }, [reproduzindo, ciclo, total, pararTimer]);

  const reproduzir = useCallback(() => setReproduzindo(true), []);

  const pausar = useCallback(() => {
    pararTimer();
    setRestantePausado(janelaRef.current.ms);
    setReproduzindo(false);
  }, [pararTimer]);

  const alternar = useCallback(() => {
    if (reproduzindo) pausar();
    else reproduzir();
  }, [reproduzindo, pausar, reproduzir]);

  const proxima = useCallback(() => avancar(), [avancar]);
  const anterior = useCallback(() => irPara(indiceRef.current - 1), [irPara]);

  const reiniciar = useCallback(() => {
    irPara(0);
    setReproduzindo(true);
  }, [irPara]);

  return {
    indice,
    reproduzindo,
    ciclo,
    duracao,
    restantePausado,
    reproduzir,
    pausar,
    alternar,
    proxima,
    anterior,
    irPara,
    reiniciar,
  };
}
