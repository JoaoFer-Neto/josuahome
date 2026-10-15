import { ImageOff } from 'lucide-react';
import { useState, type CSSProperties, type ReactNode } from 'react';

interface Props {
  src: string;
  alt: string;
  /** Texto manuscrito na base da polaroid. */
  legenda?: ReactNode;
  inclinacao?: number;
  carregamento?: 'lazy' | 'eager';
  className?: string;
  /** Classe aplicada à fotografia (ex.: efeito Ken Burns). */
  fotoClassName?: string;
  fotoStyle?: CSSProperties;
}

/**
 * Fotografia em moldura de polaroid. A imagem nunca é cortada (`object-fit: contain`);
 * um fundo desfocado derivado da própria foto preenche eventuais espaços.
 */
export function Polaroid({
  src,
  alt,
  legenda,
  inclinacao = 0,
  carregamento = 'lazy',
  className = '',
  fotoClassName = '',
  fotoStyle,
}: Props) {
  const [erro, setErro] = useState(false);

  return (
    <figure className={`polaroid ${className}`} style={{ '--inclinacao': `${inclinacao}deg` } as CSSProperties}>
      <div className="polaroid__foto">
        {erro ? (
          <div className="polaroid__erro" role="img" aria-label="Fotografia indisponível">
            <ImageOff aria-hidden="true" strokeWidth={1.5} />
            <span>Fotografia indisponível</span>
          </div>
        ) : (
          <>
            <img className="polaroid__fundo" src={src} alt="" aria-hidden="true" loading={carregamento} decoding="async" />
            <img
              className={`polaroid__img ${fotoClassName}`}
              style={fotoStyle}
              src={src}
              alt={alt}
              loading={carregamento}
              decoding="async"
              draggable={false}
              onError={() => setErro(true)}
            />
          </>
        )}
      </div>
      <figcaption className="polaroid__legenda">{legenda}</figcaption>
    </figure>
  );
}
