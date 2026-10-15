import { motion } from 'motion/react';
import { useId } from 'react';
import { DURACOES_DISPONIVEIS } from '../lib/config';
import type { Configuracoes } from '../hooks/useSettings';

interface Props {
  config: Configuracoes;
  aoDefinirDuracao: (s: number) => void;
  aoDefinirAjuste: (ativo: boolean) => void;
}

export function SettingsPanel({ config, aoDefinirDuracao, aoDefinirAjuste }: Props) {
  const tituloId = useId();
  const ajusteId = useId();
  return (
    <motion.div
      className="configuracoes"
      role="dialog"
      aria-labelledby={tituloId}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.35 }}
    >
      <h2 id={tituloId} className="configuracoes__titulo">
        Configurações
      </h2>
      <div className="configuracoes__grupo">
        <span className="configuracoes__rotulo" id={`${tituloId}-duracao`}>
          Tempo por professor
        </span>
        <div className="segmentos" role="radiogroup" aria-labelledby={`${tituloId}-duracao`}>
          {DURACOES_DISPONIVEIS.map((s) => (
            <button
              key={s}
              type="button"
              role="radio"
              aria-checked={config.duracaoS === s}
              className={config.duracaoS === s ? 'segmentos__ativo' : undefined}
              onClick={() => aoDefinirDuracao(s)}
            >
              {s} s
            </button>
          ))}
        </div>
      </div>
      <label className="interruptor" htmlFor={ajusteId}>
        <span>
          Ajustar tempo para mensagens longas
          <small>Garante tempo mínimo de leitura conforme o tamanho do texto</small>
        </span>
        <input
          id={ajusteId}
          type="checkbox"
          role="switch"
          checked={config.ajusteAutomatico}
          onChange={(e) => aoDefinirAjuste(e.target.checked)}
        />
      </label>
      <p className="configuracoes__nota">As mudanças valem a partir da próxima fotografia.</p>
    </motion.div>
  );
}
