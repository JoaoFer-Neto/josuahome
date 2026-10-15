import { House, Pause } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { ControleMusica } from '../hooks/useBackgroundMusic';
import { useIdle } from '../hooks/useIdle';
import { usePreloadImages } from '../hooks/usePreloadImages';
import type { Configuracoes } from '../hooks/useSettings';
import { useSlideshow } from '../hooks/useSlideshow';
import { duracaoDaHomenagem } from '../lib/config';
import type { Homenagem } from '../types/professor';
import { AudioPlayer } from './AudioPlayer';
import { Background } from './Background';
import { PresentationControls } from './PresentationControls';
import { ProgressBar } from './ProgressBar';
import { TeacherSlide } from './TeacherSlide';

interface Props {
  homenagens: Homenagem[];
  inicio: number;
  autoplay: boolean;
  config: Configuracoes;
  aoDefinirDuracao: (s: number) => void;
  aoDefinirAjuste: (ativo: boolean) => void;
  musica: ControleMusica;
  telaCheia: { ativa: boolean; suportada: boolean; alternar: () => void; sair: () => void };
  aoTerminar: () => void;
  aoMural: () => void;
}

export function Presentation({
  homenagens,
  inicio,
  autoplay,
  config,
  aoDefinirDuracao,
  aoDefinirAjuste,
  musica,
  telaCheia,
  aoTerminar,
  aoMural,
}: Props) {
  const total = homenagens.length;
  const [iniciada, setIniciada] = useState(autoplay);
  const [configAberta, setConfigAberta] = useState(false);
  const raizRef = useRef<HTMLDivElement>(null);

  // Leva o foco para a apresentação (tira-o do botão do mural, que reagiria ao Espaço).
  useEffect(() => {
    raizRef.current?.focus({ preventScroll: true });
  }, []);

  const duracaoDe = useCallback(
    (i: number) => duracaoDaHomenagem(homenagens[i]?.mensagem ?? null, config.duracaoS, config.ajusteAutomatico),
    [homenagens, config.duracaoS, config.ajusteAutomatico],
  );

  const show = useSlideshow({ total, inicio, autoplay, duracaoDe, aoTerminar });
  const atual = homenagens[show.indice];

  const controlesVisiveis = useIdle(3_500, show.reproduzindo && !configAberta);

  usePreloadImages(
    [homenagens[show.indice + 1]?.src, homenagens[show.indice + 2]?.src, homenagens[show.indice - 1]?.src].filter(
      (s): s is string => Boolean(s),
    ),
  );

  const alternar = useCallback(() => {
    if (show.reproduzindo) {
      show.pausar();
      musica.pausar();
    } else {
      setIniciada(true);
      show.reproduzir();
      musica.tocar();
    }
  }, [show, musica]);

  const reiniciar = useCallback(() => {
    setIniciada(true);
    show.reiniciar();
    musica.tocar();
  }, [show, musica]);

  // O listener é registrado uma única vez e lê sempre o tratador mais recente.
  // (Re-registrá-lo durante o próprio evento faria o navegador ignorar a tecla.)
  const aoTeclarRef = useRef<(e: KeyboardEvent) => void>(() => undefined);
  useEffect(() => {
    aoTeclarRef.current = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      const alvo = e.target instanceof HTMLElement ? e.target : null;
      const emCampo = alvo?.tagName === 'INPUT';
      switch (e.key) {
        case ' ':
          if (emCampo) return;
          e.preventDefault();
          alternar();
          break;
        case 'ArrowRight':
          if (emCampo) return;
          e.preventDefault();
          show.proxima();
          break;
        case 'ArrowLeft':
          if (emCampo) return;
          e.preventDefault();
          show.anterior();
          break;
        case 'f':
        case 'F':
          telaCheia.alternar();
          break;
        case 'm':
        case 'M':
          musica.alternarMudo();
          break;
        case 'Escape':
          if (configAberta) setConfigAberta(false);
          else if (telaCheia.ativa) telaCheia.sair();
          else aoMural();
          break;
        default:
          return;
      }
    };
  });

  useEffect(() => {
    const aoTeclar = (e: KeyboardEvent) => aoTeclarRef.current(e);
    window.addEventListener('keydown', aoTeclar);
    return () => window.removeEventListener('keydown', aoTeclar);
  }, []);

  if (!atual) return null;

  const segundosRestantes = Math.max(1, Math.ceil(show.restantePausado / 1000));

  return (
    <div
      ref={raizRef}
      tabIndex={-1}
      role="region"
      aria-label="Apresentação da homenagem"
      className={`apresentacao ${controlesVisiveis ? '' : 'apresentacao--ociosa'}`}
    >
      <Background />

      <AnimatePresence>
        <TeacherSlide
          key={show.ciclo}
          homenagem={atual}
          indice={show.indice}
          total={total}
          duracao={show.duracao}
          reproduzindo={show.reproduzindo}
        />
      </AnimatePresence>

      <div className={`apresentacao__topo ${controlesVisiveis ? '' : 'controles--oculto'}`}>
        <div className="apresentacao__topo-esq">
          <button type="button" className="pilula" onClick={aoMural}>
            <House aria-hidden="true" size={18} strokeWidth={1.75} />
            Voltar ao mural
          </button>
          {!show.reproduzindo && iniciada && (
            <span className="chip">
              <Pause aria-hidden="true" size={13} fill="currentColor" strokeWidth={0} />
              Pausado · {String(segundosRestantes).padStart(2, '0')} s restantes
            </span>
          )}
          {!iniciada && <span className="chip chip--neutro">Pressione ▶ para iniciar a apresentação daqui</span>}
        </div>
      </div>

      <AudioPlayer indisponivel={musica.indisponivel} bloqueada={musica.bloqueada} aoAtivar={musica.tocar} />

      <ProgressBar
        ciclo={show.ciclo}
        duracao={show.duracao}
        reproduzindo={show.reproduzindo}
        indice={show.indice}
        total={total}
      />

      <PresentationControls
        visiveis={controlesVisiveis}
        reproduzindo={show.reproduzindo}
        iniciada={iniciada}
        primeira={show.indice === 0}
        musica={musica}
        telaCheia={telaCheia.ativa}
        telaCheiaSuportada={telaCheia.suportada}
        configAberta={configAberta}
        config={config}
        aoAlternar={alternar}
        aoAnterior={show.anterior}
        aoProxima={show.proxima}
        aoReiniciar={reiniciar}
        aoMural={aoMural}
        aoTelaCheia={telaCheia.alternar}
        aoConfig={() => setConfigAberta((v) => !v)}
        aoDefinirDuracao={aoDefinirDuracao}
        aoDefinirAjuste={aoDefinirAjuste}
      />
    </div>
  );
}
