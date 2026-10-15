import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Background } from './components/Background';
import { FinalTribute } from './components/FinalTribute';
import { Header } from './components/Header';
import { PhotoMural } from './components/PhotoMural';
import { Presentation } from './components/Presentation';
import { useBackgroundMusic } from './hooks/useBackgroundMusic';
import { useFullscreen } from './hooks/useFullscreen';
import { useSettings } from './hooks/useSettings';
import { ASSINATURA, AUDIO_SRC, VOLUME_INICIAL } from './lib/config';
import { homenagens } from './lib/homenagens';

type Tela =
  | { tipo: 'mural' }
  | { tipo: 'apresentacao'; inicio: number; autoplay: boolean; sessao: number }
  | { tipo: 'final' };

const transicaoTela = { duration: 0.9, ease: 'easeInOut' } as const;

export default function App() {
  const [tela, setTela] = useState<Tela>({ tipo: 'mural' });
  const sessaoRef = useRef(0);
  const focoAnteriorRef = useRef<HTMLElement | null>(null);

  const musica = useBackgroundMusic(AUDIO_SRC, VOLUME_INICIAL);
  const telaCheia = useFullscreen();
  const { config, definirDuracao, definirAjuste } = useSettings();

  const abrirApresentacao = useCallback(
    (inicio: number, autoplay: boolean) => {
      const ativo = document.activeElement;
      if (ativo instanceof HTMLElement && ativo.closest('.pagina-mural')) focoAnteriorRef.current = ativo;
      sessaoRef.current += 1;
      if (autoplay) musica.tocar();
      setTela({ tipo: 'apresentacao', inicio, autoplay, sessao: sessaoRef.current });
    },
    [musica],
  );

  const voltarAoMural = useCallback(() => {
    musica.encerrar();
    setTela({ tipo: 'mural' });
  }, [musica]);

  const terminar = useCallback(() => {
    musica.suavizar();
    setTela({ tipo: 'final' });
  }, [musica]);

  const sobreposicaoAberta = tela.tipo !== 'mural';

  // Trava a rolagem do mural enquanto a homenagem está aberta e devolve o foco ao sair.
  useEffect(() => {
    document.documentElement.classList.toggle('sem-rolagem', sobreposicaoAberta);
    if (!sobreposicaoAberta) {
      focoAnteriorRef.current?.focus({ preventScroll: true });
      focoAnteriorRef.current = null;
    }
  }, [sobreposicaoAberta]);

  return (
    <MotionConfig reducedMotion="user">
      <Background />
      <main className="pagina-mural" inert={sobreposicaoAberta}>
        <Header
          total={homenagens.length}
          telaCheia={telaCheia.ativa}
          telaCheiaSuportada={telaCheia.suportada}
          aoAlternarTelaCheia={telaCheia.alternar}
          aoIniciar={() => abrirApresentacao(0, true)}
        />
        <PhotoMural homenagens={homenagens} aoAbrir={(i) => abrirApresentacao(i, false)} />
        <footer className="rodape">{ASSINATURA}</footer>
      </main>

      <AnimatePresence>
        {tela.tipo === 'apresentacao' && (
          <motion.div
            key={`apresentacao-${tela.sessao}`}
            className="sobreposicao"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transicaoTela}
          >
            <Presentation
              homenagens={homenagens}
              inicio={tela.inicio}
              autoplay={tela.autoplay}
              config={config}
              aoDefinirDuracao={definirDuracao}
              aoDefinirAjuste={definirAjuste}
              musica={musica}
              telaCheia={telaCheia}
              aoTerminar={terminar}
              aoMural={voltarAoMural}
            />
          </motion.div>
        )}
        {tela.tipo === 'final' && (
          <motion.div
            key="final"
            className="sobreposicao"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
          >
            <FinalTribute
              homenagens={homenagens}
              aoReassistir={() => abrirApresentacao(0, true)}
              aoMural={voltarAoMural}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
