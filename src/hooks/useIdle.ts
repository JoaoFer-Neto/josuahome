import { useCallback, useEffect, useRef, useState } from 'react';

const EVENTOS = ['pointermove', 'pointerdown', 'touchstart', 'keydown', 'wheel'] as const;

/**
 * Retorna `true` enquanto houver atividade recente do usuário.
 * Quando `habilitado` é falso (ex.: apresentação pausada), permanece sempre `true`.
 */
export function useIdle(tempoMs: number, habilitado: boolean): boolean {
  const [ativo, setAtivo] = useState(true);
  const timerRef = useRef<number | null>(null);

  const limpar = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!habilitado) {
      limpar();
      setAtivo(true);
      return;
    }
    const agendar = () => {
      limpar();
      timerRef.current = window.setTimeout(() => setAtivo(false), tempoMs);
    };
    const aoAgir = () => {
      setAtivo(true);
      agendar();
    };
    agendar();
    EVENTOS.forEach((e) => window.addEventListener(e, aoAgir, { passive: true }));
    return () => {
      limpar();
      EVENTOS.forEach((e) => window.removeEventListener(e, aoAgir));
    };
  }, [habilitado, tempoMs, limpar]);

  return ativo;
}
