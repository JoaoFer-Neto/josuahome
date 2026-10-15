import {
  House,
  Maximize,
  Minimize,
  Pause,
  Play,
  RotateCcw,
  Settings,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import type { ControleMusica } from '../hooks/useBackgroundMusic';
import type { Configuracoes } from '../hooks/useSettings';
import { SettingsPanel } from './SettingsPanel';

interface Props {
  visiveis: boolean;
  reproduzindo: boolean;
  iniciada: boolean;
  primeira: boolean;
  musica: ControleMusica;
  telaCheia: boolean;
  telaCheiaSuportada: boolean;
  configAberta: boolean;
  config: Configuracoes;
  aoAlternar: () => void;
  aoAnterior: () => void;
  aoProxima: () => void;
  aoReiniciar: () => void;
  aoMural: () => void;
  aoTelaCheia: () => void;
  aoConfig: () => void;
  aoDefinirDuracao: (s: number) => void;
  aoDefinirAjuste: (ativo: boolean) => void;
}

const ICONE = { size: 22, strokeWidth: 1.75, 'aria-hidden': true } as const;

export function PresentationControls(p: Props) {
  const rotuloPrincipal = p.reproduzindo
    ? 'Pausar apresentação'
    : p.iniciada
      ? 'Continuar de onde parou'
      : 'Reproduzir apresentação';
  const semSom = p.musica.mudo || p.musica.volume === 0;

  return (
    <div className={`controles ${p.visiveis ? '' : 'controles--oculto'}`} role="toolbar" aria-label="Controles da apresentação">
      <AnimatePresence>
        {p.configAberta && (
          <SettingsPanel config={p.config} aoDefinirDuracao={p.aoDefinirDuracao} aoDefinirAjuste={p.aoDefinirAjuste} />
        )}
      </AnimatePresence>

      <button type="button" className="controle" onClick={p.aoMural} aria-label="Voltar ao mural principal" title="Voltar ao mural (Esc)">
        <House {...ICONE} />
      </button>
      <button type="button" className="controle" onClick={p.aoReiniciar} aria-label="Reiniciar apresentação" title="Reiniciar">
        <RotateCcw {...ICONE} />
      </button>
      <span className="separador" aria-hidden="true" />
      <button
        type="button"
        className="controle"
        onClick={p.aoAnterior}
        disabled={p.primeira}
        aria-label="Fotografia anterior"
        title="Anterior (←)"
      >
        <SkipBack {...ICONE} />
      </button>
      <button type="button" className="controle controle--principal" onClick={p.aoAlternar} aria-label={rotuloPrincipal} title={`${rotuloPrincipal} (Espaço)`}>
        {p.reproduzindo ? (
          <Pause size={26} aria-hidden="true" fill="currentColor" strokeWidth={0} />
        ) : (
          <Play size={26} aria-hidden="true" fill="currentColor" strokeWidth={0} className="icone-play" />
        )}
      </button>
      <button type="button" className="controle" onClick={p.aoProxima} aria-label="Próxima fotografia" title="Próxima (→)">
        <SkipForward {...ICONE} />
      </button>
      <span className="separador" aria-hidden="true" />
      <button
        type="button"
        className="controle"
        onClick={p.musica.alternarMudo}
        aria-label={p.musica.mudo ? 'Ativar música' : 'Silenciar música'}
        aria-pressed={p.musica.mudo}
        title="Silenciar (M)"
        disabled={p.musica.indisponivel}
      >
        {semSom ? <VolumeX {...ICONE} /> : <Volume2 {...ICONE} />}
      </button>
      <label className="volume">
        <span className="sr-only">Volume da música</span>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={Math.round(p.musica.volume * 100)}
          disabled={p.musica.indisponivel}
          onChange={(e) => p.musica.definirVolume(Number(e.target.value) / 100)}
          aria-valuetext={`${Math.round(p.musica.volume * 100)}%`}
        />
        <span className="volume__valor" aria-hidden="true">
          {Math.round(p.musica.volume * 100)}%
        </span>
      </label>
      <span className="separador" aria-hidden="true" />
      <button
        type="button"
        className={`controle ${p.configAberta ? 'controle--ativo' : ''}`}
        onClick={p.aoConfig}
        aria-label="Configurações"
        aria-expanded={p.configAberta}
      >
        <Settings {...ICONE} />
      </button>
      {p.telaCheiaSuportada && (
        <button
          type="button"
          className="controle"
          onClick={p.aoTelaCheia}
          aria-label={p.telaCheia ? 'Sair da tela cheia' : 'Entrar em tela cheia'}
          title="Tela cheia (F)"
        >
          {p.telaCheia ? <Minimize {...ICONE} /> : <Maximize {...ICONE} />}
        </button>
      )}
    </div>
  );
}
