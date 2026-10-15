import { Maximize, Minimize, Play, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { ESCOLA } from '../lib/config';

interface Props {
  total: number;
  telaCheia: boolean;
  telaCheiaSuportada: boolean;
  aoAlternarTelaCheia: () => void;
  aoIniciar: () => void;
}

const entrada = (atraso: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay: atraso, ease: [0.22, 1, 0.36, 1] as const },
});

export function Header({ total, telaCheia, telaCheiaSuportada, aoAlternarTelaCheia, aoIniciar }: Props) {
  return (
    <header className="cabecalho">
      <div className="cabecalho__barra">
        <div className="marca">
          <span className="marca__selo" aria-hidden="true">JS</span>
          <span className="marca__texto">
            <strong>{ESCOLA}</strong>
            <span>Dia dos Professores · 15 de outubro</span>
          </span>
        </div>
        <div className="cabecalho__acoes">
          <span className="contador-geral">
            <Users aria-hidden="true" size={18} strokeWidth={1.75} />
            <span>
              <strong>{total}</strong> {total === 1 ? 'professor homenageado' : 'professores homenageados'}
            </span>
          </span>
          {telaCheiaSuportada && (
            <button
              type="button"
              className="botao-icone"
              onClick={aoAlternarTelaCheia}
              aria-label={telaCheia ? 'Sair da tela cheia' : 'Entrar em tela cheia'}
            >
              {telaCheia ? <Minimize size={18} strokeWidth={1.75} /> : <Maximize size={18} strokeWidth={1.75} />}
            </button>
          )}
        </div>
      </div>

      <div className="cabecalho__hero">
        <motion.p className="sobretitulo" {...entrada(0.1)}>
          <span className="sobretitulo__linha" aria-hidden="true" />
          Homenagem {new Date().getFullYear()}
          <span className="sobretitulo__linha sobretitulo__linha--inv" aria-hidden="true" />
        </motion.p>
        <motion.h1 className="titulo" {...entrada(0.2)}>
          Para quem transforma vidas através da <em>educação</em>
        </motion.h1>
        <motion.p className="subtitulo" {...entrada(0.35)}>
          Uma homenagem especial aos professores da {ESCOLA}.
        </motion.p>
        <motion.p className="instrucao" {...entrada(0.45)}>
          Cada professor tem uma história, um legado e uma mensagem especial. Toque em uma fotografia para descobrir
          nossa homenagem.
        </motion.p>
        <motion.div {...entrada(0.55)}>
          <button type="button" className="botao-principal" onClick={aoIniciar} disabled={total === 0}>
            <Play aria-hidden="true" size={20} fill="currentColor" strokeWidth={0} />
            Iniciar homenagem
          </button>
        </motion.div>
      </div>
    </header>
  );
}
