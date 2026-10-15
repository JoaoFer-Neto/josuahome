import { Music, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface Props {
  indisponivel: boolean;
  bloqueada: boolean;
  aoAtivar: () => void;
}

/** Avisos discretos sobre a trilha sonora. Nunca impedem a apresentação. */
export function AudioPlayer({ indisponivel, bloqueada, aoAtivar }: Props) {
  const [dispensado, setDispensado] = useState(false);

  useEffect(() => {
    if (!indisponivel) return;
    const id = window.setTimeout(() => setDispensado(true), 9_000);
    return () => window.clearTimeout(id);
  }, [indisponivel]);

  const mostrarAusente = indisponivel && !dispensado;
  const mostrarBloqueio = bloqueada && !indisponivel;

  return (
    <div className="avisos" role="status" aria-live="polite">
      <AnimatePresence>
        {mostrarAusente && (
          <motion.div
            key="ausente"
            className="aviso"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5 }}
          >
            <span className="aviso__icone">
              <Music aria-hidden="true" size={18} strokeWidth={1.75} />
            </span>
            <span className="aviso__texto">
              <strong>Música não encontrada</strong>
              A homenagem continua sem trilha. Para ativar, adicione <code>public/audio/piano.mp3</code>.
            </span>
            <button type="button" className="aviso__fechar" onClick={() => setDispensado(true)} aria-label="Fechar aviso">
              <X aria-hidden="true" size={16} />
            </button>
          </motion.div>
        )}
        {mostrarBloqueio && (
          <motion.button
            key="bloqueio"
            type="button"
            className="aviso aviso--botao"
            onClick={aoAtivar}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5 }}
          >
            <span className="aviso__icone">
              <Music aria-hidden="true" size={18} strokeWidth={1.75} />
            </span>
            <span className="aviso__texto">
              <strong>Ativar música</strong>O navegador bloqueou o áudio. Toque aqui para ouvir o piano.
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
