import { useCallback, useEffect, useState } from 'react';

const telaCheiaAtiva = (): boolean => document.fullscreenElement !== null;

export function useFullscreen() {
  const [ativa, setAtiva] = useState(telaCheiaAtiva);
  const suportada = typeof document !== 'undefined' && document.fullscreenEnabled;

  useEffect(() => {
    const aoMudar = () => setAtiva(telaCheiaAtiva());
    document.addEventListener('fullscreenchange', aoMudar);
    return () => document.removeEventListener('fullscreenchange', aoMudar);
  }, []);

  const alternar = useCallback(() => {
    if (!document.fullscreenEnabled) return;
    const pedido = telaCheiaAtiva()
      ? document.exitFullscreen()
      : document.documentElement.requestFullscreen({ navigationUI: 'hide' });
    pedido.catch(() => {
      /* o navegador recusou (ex.: sem gesto do usuário) */
    });
  }, []);

  const sair = useCallback(() => {
    if (telaCheiaAtiva()) document.exitFullscreen().catch(() => undefined);
  }, []);

  return { ativa, suportada, alternar, sair };
}
