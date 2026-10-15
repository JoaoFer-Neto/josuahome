import type { CSSProperties } from 'react';

interface Particula {
  x: number;
  y: number;
  tamanho: number;
  duracao: number;
  atraso: number;
  opacidade: number;
}

// Posições fixas (determinísticas) para evitar saltos entre renderizações.
const PARTICULAS: Particula[] = [
  { x: 6, y: 18, tamanho: 5, duracao: 26, atraso: 0, opacidade: 0.55 },
  { x: 14, y: 72, tamanho: 4, duracao: 32, atraso: 4, opacidade: 0.45 },
  { x: 22, y: 38, tamanho: 3, duracao: 28, atraso: 9, opacidade: 0.4 },
  { x: 31, y: 88, tamanho: 6, duracao: 36, atraso: 2, opacidade: 0.35 },
  { x: 41, y: 12, tamanho: 3, duracao: 30, atraso: 12, opacidade: 0.45 },
  { x: 52, y: 64, tamanho: 4, duracao: 34, atraso: 6, opacidade: 0.3 },
  { x: 60, y: 28, tamanho: 5, duracao: 29, atraso: 15, opacidade: 0.4 },
  { x: 68, y: 82, tamanho: 3, duracao: 27, atraso: 3, opacidade: 0.45 },
  { x: 77, y: 16, tamanho: 6, duracao: 38, atraso: 8, opacidade: 0.4 },
  { x: 84, y: 54, tamanho: 4, duracao: 31, atraso: 11, opacidade: 0.5 },
  { x: 92, y: 30, tamanho: 3, duracao: 25, atraso: 5, opacidade: 0.45 },
  { x: 95, y: 78, tamanho: 5, duracao: 35, atraso: 14, opacidade: 0.4 },
  { x: 47, y: 44, tamanho: 2, duracao: 24, atraso: 7, opacidade: 0.35 },
  { x: 3, y: 50, tamanho: 3, duracao: 33, atraso: 10, opacidade: 0.4 },
];

/** Fundo claro com luz ambiente e pontos de luz dourados em movimento lento. */
export function Background() {
  return (
    <div className="fundo" aria-hidden="true">
      <div className="fundo__luz fundo__luz--a" />
      <div className="fundo__luz fundo__luz--b" />
      <div className="fundo__luz fundo__luz--c" />
      {PARTICULAS.map((p, i) => (
        <span
          key={i}
          className="particula"
          style={
            {
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.tamanho,
              height: p.tamanho,
              '--duracao': `${p.duracao}s`,
              '--atraso': `-${p.atraso}s`,
              '--opacidade': p.opacidade,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
