import { motion } from 'motion/react';
import { ESCOLA, doisDigitos } from '../lib/config';
import type { Homenagem } from '../types/professor';
import { Polaroid } from './Polaroid';

interface Props {
  homenagem: Homenagem;
  indice: number;
  total: number;
  duracao: number;
  reproduzindo: boolean;
}

const suave = [0.22, 1, 0.36, 1] as const;

/** Cartão de homenagem animado: polaroid de um lado, mensagem do outro. */
export function TeacherSlide({ homenagem, indice, total, duracao, reproduzindo }: Props) {
  const inclinacao = indice % 2 === 0 ? -1.6 : 1.4;
  const estadoAnimacao = reproduzindo ? 'running' : 'paused';

  return (
    <motion.section
      className="slide"
      aria-roledescription="homenagem"
      aria-label={`Homenagem ${indice + 1} de ${total}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
    >
      <div className="slide__ambiente" aria-hidden="true">
        <img src={homenagem.src} alt="" decoding="async" />
      </div>

      <div className="slide__conteudo">
        <motion.div
          className="slide__foto"
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.2, ease: suave }}
        >
          <Polaroid
            src={homenagem.src}
            alt={`Fotografia do professor homenageado ${indice + 1} de ${total}`}
            inclinacao={inclinacao}
            carregamento="eager"
            fotoClassName="ken-burns"
            fotoStyle={{ animationDuration: `${duracao}ms`, animationPlayState: estadoAnimacao }}
            legenda={
              <>
                <span>Com carinho e gratidão,</span>
                <span>{ESCOLA}.</span>
              </>
            }
          />
        </motion.div>

        <div className="slide__texto">
          <motion.p
            className="slide__contador"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: suave }}
          >
            Professor {doisDigitos(indice + 1)} <span>de {doisDigitos(total)}</span>
          </motion.p>
          <motion.div
            className="ornamento"
            aria-hidden="true"
            initial={{ opacity: 0, scaleX: 0.6 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.8, ease: suave }}
          >
            <span />
            <i />
            <span />
          </motion.div>
          {homenagem.mensagem && (
            <motion.blockquote
              className="slide__mensagem"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.3, delay: 1.1, ease: suave }}
            >
              {homenagem.mensagem}
            </motion.blockquote>
          )}
        </div>
      </div>
    </motion.section>
  );
}
