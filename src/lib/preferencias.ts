const PREFIXO = 'homenagem-professores:';

/** Lê uma preferência do navegador; se o armazenamento estiver indisponível, usa o padrão. */
export function lerPreferencia<T extends number | boolean>(chave: string, padrao: T): T {
  try {
    const bruto = window.localStorage.getItem(PREFIXO + chave);
    if (bruto === null) return padrao;
    const valor: unknown = JSON.parse(bruto);
    return typeof valor === typeof padrao ? (valor as T) : padrao;
  } catch {
    return padrao;
  }
}

export function salvarPreferencia(chave: string, valor: number | boolean): void {
  try {
    window.localStorage.setItem(PREFIXO + chave, JSON.stringify(valor));
  } catch {
    /* armazenamento indisponível: a preferência vale só nesta sessão */
  }
}
