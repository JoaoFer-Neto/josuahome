import { useCallback, useEffect, useRef, useState } from 'react';
import { lerPreferencia, salvarPreferencia } from '../lib/preferencias';

const FADE_IN_MS = 2_800;
const FADE_PAUSA_MS = 600;
const FADE_SAIDA_MS = 2_800;

export type EstadoMusica = 'parada' | 'tocando' | 'pausada';

/**
 * Trilha de fundo com HTMLAudioElement: loop, fade-in/fade-out, volume, silêncio,
 * tratamento de arquivo ausente e do bloqueio de reprodução automática dos navegadores.
 */
export function useBackgroundMusic(src: string, volumeInicial: number) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);
  const volumeRef = useRef(lerPreferencia('volume', volumeInicial));
  const estadoRef = useRef<EstadoMusica>('parada');

  const [volume, setVolumeState] = useState(volumeRef.current);
  const [mudo, setMudo] = useState(false);
  const [estado, setEstadoState] = useState<EstadoMusica>('parada');
  const [indisponivel, setIndisponivel] = useState(false);
  const [bloqueada, setBloqueada] = useState(false);

  const setEstado = (e: EstadoMusica) => {
    estadoRef.current = e;
    setEstadoState(e);
  };

  const cancelarFade = useCallback(() => {
    if (fadeRef.current !== null) {
      cancelAnimationFrame(fadeRef.current);
      fadeRef.current = null;
    }
  }, []);

  const fadePara = useCallback(
    (alvo: number, ms: number, aoConcluir?: () => void) => {
      const audio = audioRef.current;
      if (!audio) return;
      cancelarFade();
      const de = audio.volume;
      const inicio = performance.now();
      const passo = (agora: number) => {
        const t = Math.min(1, (agora - inicio) / ms);
        // curva suave (ease-in-out) para entradas e saídas naturais
        const k = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
        audio.volume = Math.min(1, Math.max(0, de + (alvo - de) * k));
        if (t < 1) {
          fadeRef.current = requestAnimationFrame(passo);
        } else {
          fadeRef.current = null;
          aoConcluir?.();
        }
      };
      fadeRef.current = requestAnimationFrame(passo);
    },
    [cancelarFade],
  );

  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0;
    const aoErro = () => setIndisponivel(true);
    const aoCarregar = () => setIndisponivel(false);
    audio.addEventListener('error', aoErro);
    audio.addEventListener('canplay', aoCarregar);
    audio.src = src;
    audioRef.current = audio;
    return () => {
      cancelarFade();
      audio.pause();
      audio.removeEventListener('error', aoErro);
      audio.removeEventListener('canplay', aoCarregar);
      audio.removeAttribute('src');
      audio.load();
      audioRef.current = null;
    };
  }, [src, cancelarFade]);

  /** Inicia ou retoma a música (da posição em que parou) com entrada gradual. */
  const tocar = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || audio.error) return;
    if (audio.paused) audio.volume = 0;
    setEstado('tocando');
    audio
      .play()
      .then(() => {
        setBloqueada(false);
        if (estadoRef.current === 'tocando') fadePara(volumeRef.current, FADE_IN_MS);
      })
      .catch((erro: unknown) => {
        if (erro instanceof DOMException && erro.name === 'NotAllowedError') setBloqueada(true);
        else if (erro instanceof DOMException && erro.name === 'AbortError') return;
        else setIndisponivel(true);
        setEstado('parada');
      });
  }, [fadePara]);

  /** Pausa preservando a posição atual. */
  const pausar = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || estadoRef.current !== 'tocando') return;
    setEstado('pausada');
    fadePara(0, FADE_PAUSA_MS, () => audio.pause());
  }, [fadePara]);

  /** Encerra com saída gradual e volta ao início da faixa. */
  const encerrar = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setEstado('parada');
    if (audio.paused) {
      audio.currentTime = 0;
      return;
    }
    fadePara(0, FADE_SAIDA_MS, () => {
      audio.pause();
      audio.currentTime = 0;
    });
  }, [fadePara]);

  /** Mantém a música tocando bem baixinho (usado na tela final). */
  const suavizar = useCallback(() => {
    if (estadoRef.current !== 'tocando') return;
    fadePara(volumeRef.current * 0.45, FADE_SAIDA_MS);
  }, [fadePara]);

  const definirVolume = useCallback(
    (v: number) => {
      const novo = Math.min(1, Math.max(0, v));
      volumeRef.current = novo;
      setVolumeState(novo);
      salvarPreferencia('volume', novo);
      const audio = audioRef.current;
      if (!audio) return;
      if (novo > 0 && audio.muted) {
        audio.muted = false;
        setMudo(false);
      }
      if (estadoRef.current === 'tocando') {
        cancelarFade();
        audio.volume = novo;
      }
    },
    [cancelarFade],
  );

  const alternarMudo = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMudo(audio.muted);
  }, []);

  return {
    estado,
    volume,
    mudo,
    indisponivel,
    bloqueada,
    tocar,
    pausar,
    encerrar,
    suavizar,
    definirVolume,
    alternarMudo,
  };
}

export type ControleMusica = ReturnType<typeof useBackgroundMusic>;
