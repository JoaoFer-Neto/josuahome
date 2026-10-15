import { motion } from 'motion/react';
import type { Homenagem } from '../types/professor';
import { Polaroid } from './Polaroid';

interface Props {
  homenagem: Homenagem;
  posicao: number;
  total: number;
  aoAbrir: () => void;
}

// Pequenas inclinações alternadas dão a sensação de um mural de fotos real.
const INCLINACOES = [-2.2, 1.6, -1.1, 2.4, -1.8, 1.2, -2.6, 1.9, -0.9, 2.1];

export function TeacherCard({ homenagem, posicao, total, aoAbrir }: Props) {
  const inclinacao = INCLINACOES[posicao % INCLINACOES.length] ?? 0;
  return (
    <motion.li
      className="mural__item"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.5 + Math.min(posicao, 24) * 0.04, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        type="button"
        className="cartao"
        onClick={aoAbrir}
        aria-label={`Abrir homenagem ${posicao + 1} de ${total}`}
      >
        <Polaroid src={homenagem.thumb} alt="" inclinacao={inclinacao} />
      </button>
    </motion.li>
  );
}
