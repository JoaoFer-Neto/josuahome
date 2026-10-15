import type { Homenagem } from '../types/professor';
import { TeacherCard } from './TeacherCard';

interface Props {
  homenagens: Homenagem[];
  aoAbrir: (indice: number) => void;
}

export function PhotoMural({ homenagens, aoAbrir }: Props) {
  if (homenagens.length === 0) {
    return (
      <p className="mural__vazio">
        Nenhuma fotografia encontrada. Adicione imagens à pasta <code>Fotos/</code> e recarregue a página.
      </p>
    );
  }
  return (
    <ul className="mural" aria-label="Mural de professores">
      {homenagens.map((h, i) => (
        <TeacherCard key={h.id} homenagem={h} posicao={i} total={homenagens.length} aoAbrir={() => aoAbrir(i)} />
      ))}
    </ul>
  );
}
