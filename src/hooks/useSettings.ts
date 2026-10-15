import { useCallback, useState } from 'react';
import { DURACAO_PADRAO_S } from '../lib/config';
import { lerPreferencia, salvarPreferencia } from '../lib/preferencias';

export interface Configuracoes {
  duracaoS: number;
  ajusteAutomatico: boolean;
}

export function useSettings() {
  const [config, setConfig] = useState<Configuracoes>(() => ({
    duracaoS: lerPreferencia('duracao', DURACAO_PADRAO_S),
    ajusteAutomatico: lerPreferencia('ajusteAutomatico', true),
  }));

  const definirDuracao = useCallback((duracaoS: number) => {
    salvarPreferencia('duracao', duracaoS);
    setConfig((c) => ({ ...c, duracaoS }));
  }, []);

  const definirAjuste = useCallback((ajusteAutomatico: boolean) => {
    salvarPreferencia('ajusteAutomatico', ajusteAutomatico);
    setConfig((c) => ({ ...c, ajusteAutomatico }));
  }, []);

  return { config, definirDuracao, definirAjuste };
}
