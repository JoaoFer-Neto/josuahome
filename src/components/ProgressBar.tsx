interface Props {
  ciclo: number;
  duracao: number;
  reproduzindo: boolean;
  indice: number;
  total: number;
}

/**
 * Barra discreta com o tempo da fotografia atual. Usa uma animação CSS que pausa e
 * retoma junto com a apresentação, e reinicia a cada nova fotografia (`key`).
 */
export function ProgressBar({ ciclo, duracao, reproduzindo, indice, total }: Props) {
  return (
    <>
      <div className="pontos" aria-hidden="true">
        {Array.from({ length: total }, (_, i) => (
          <span key={i} className={i < indice ? 'pontos__feito' : i === indice ? 'pontos__atual' : undefined} />
        ))}
      </div>
      <div className="progresso" aria-hidden="true">
        <div
          key={ciclo}
          className="progresso__barra"
          style={{ animationDuration: `${duracao}ms`, animationPlayState: reproduzindo ? 'running' : 'paused' }}
        />
      </div>
    </>
  );
}
