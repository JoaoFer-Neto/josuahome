import { House, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useMemo, useRef, type CSSProperties } from 'react';
import { ESCOLA } from '../lib/config';
import type { Homenagem } from '../types/professor';
import { Background } from './Background';
import { Polaroid } from './Polaroid';

interface Props {
  homenagens: Homenagem[];
  aoReassistir: () => void;
  aoMural: () => void;
}

const MINIMO_NA_COLAGEM = 30;
const INCLINACOES = [-4, 3, -2, 5, -3, 2, -5, 4, -1, 3, -3, 1];
const suave = [0.22, 1, 0.36, 1] as const;

/** Tela de encerramento: um grande mural de gratidão com todas as fotografias. */
export function FinalTribute({ homenagens, aoReassistir, aoMural }: Props) {
  const colagem = useMemo(() => {
    if (homenagens.length === 0) return [];
    const qtd = Math.max(homenagens.length, MINIMO_NA_COLAGEM);
    return Array.from({ length: qtd }, (_, i) => homenagens[i % homenagens.length]!);
  }, [homenagens]);

  const raizRef = useRef<HTMLElement>(null);
  useEffect(() => {
    raizRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !document.fullscreenElement) aoMural();
    };
    window.addEventListener('keydown', aoTeclar);
    return () => window.removeEventListener('keydown', aoTeclar);
  }, [aoMural]);

  return (
    <section ref={raizRef} tabIndex={-1} className="final" aria-labelledby="final-titulo">
      <Background />
      <div className="final__colagem" aria-hidden="true">
        {colagem.map((h, i) => (
          <motion.div
            key={`${h.id}-${i}`}
            className="final__item"
            style={{ '--atraso': `${-(i % 7) * 2}s` } as CSSProperties}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.2 + (i % 15) * 0.09, ease: suave }}
          >
            <Polaroid src={h.thumb} alt="" inclinacao={INCLINACOES[i % INCLINACOES.length]} />
          </motion.div>
        ))}
      </div>
      <div className="final__veu" aria-hidden="true" />

      <div className="final__conteudo">
        <motion.p
          className="final__frase"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.6, ease: suave }}
        >
          A educação transforma vidas. E por trás de cada transformação, existe um professor que fez a diferença.
        </motion.p>
        <motion.div
          className="ornamento ornamento--centro"
          aria-hidden="true"
          initial={{ opacity: 0, scaleX: 0.5 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.8, ease: suave }}
        >
          <span />
          <i />
          <span />
        </motion.div>
        <motion.h1
          id="final-titulo"
          className="final__titulo"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 2.2, ease: suave }}
        >
          Feliz Dia dos Professores!
        </motion.h1>
        <motion.p
          className="final__texto"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 3, ease: suave }}
        >
          Nosso reconhecimento, carinho e gratidão a cada educador que faz parte da história da {ESCOLA}.
        </motion.p>
        <motion.div
          className="final__acoes"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 3.7, ease: suave }}
        >
          <button type="button" className="botao-principal botao-principal--compacto" onClick={aoReassistir}>
            <RotateCcw aria-hidden="true" size={20} strokeWidth={2} />
            Reassistir homenagem
          </button>
          <button type="button" className="botao-secundario" onClick={aoMural}>
            <House aria-hidden="true" size={20} strokeWidth={1.75} />
            Voltar ao mural
          </button>
        </motion.div>
      </div>
    </section>
  );
}
