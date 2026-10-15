# Homenagem aos Professores · ECI João Suassuna

Mural interativo e apresentação audiovisual para o Dia dos Professores, feito com
Vite, React, TypeScript, Motion e Lucide. Funciona inteiramente no navegador, sem
backend, e pode ser publicado em qualquer hospedagem estática (ou aberto direto
da pasta `dist/` em um servidor local, sem internet).

## Como executar

```bash
npm install        # instala as dependências (uma vez)
npm run dev        # modo de desenvolvimento: http://localhost:5173
npm run build      # verifica o TypeScript e gera a versão final em dist/
npm run preview    # serve a versão final: http://localhost:4173
```

Para a TV: abra o endereço no navegador da TV ou de um computador ligado a ela,
clique em **⛶** (ou tecle **F**) para tela cheia e depois em **▶ Iniciar homenagem**.

## Deploy na Vercel

O projeto já está configurado (`vercel.json`, `.nvmrc`, `.vercelignore`):
build com `npm run build`, saída em `dist/`, Node 22+ e cache longo para fotos,
fontes e scripts (os arquivos têm hash no nome, então atualizações aparecem na hora).

**Pelo GitHub (recomendado):** envie o projeto para um repositório, incluindo a
pasta `Fotos/` e `public/audio/piano.mp3`. Na Vercel, escolha **Add New → Project**,
importe o repositório e clique em **Deploy**, sem alterar nenhuma configuração.
Cada novo push gera um novo deploy.

**Pela linha de comando:**

```bash
npx vercel          # primeira vez: faz login e cria o projeto (deploy de pré-visualização)
npx vercel --prod   # publica na URL de produção
```

Atenção: a URL da Vercel é pública. Se não quiser que as fotos fiquem acessíveis a
qualquer pessoa com o link, ative **Deployment Protection** nas configurações do
projeto, ou use a versão local (`npm run build` + `npm run preview`) no dia do evento.

## Fotografias

As fotografias ficam na pasta **`Fotos/`**, na raiz do projeto, e são descobertas
automaticamente (`import.meta.glob` em `src/lib/fotos.ts`). Formatos aceitos:
JPG, JPEG, PNG, WEBP e AVIF.

- Os arquivos originais **não são alterados**. No build, o `vite-imagetools` gera
  versões WebP otimizadas: uma miniatura leve para o mural e uma versão maior para
  a apresentação. As 20 fotos passaram de ~40 MB para ~2,5 MB.
- A ordem padrão segue o nome do arquivo (`Professor_01`, `Professor_02`…).
- As fotos são exibidas inteiras, em moldura de polaroid, sem cortar rostos
  (`object-fit: contain` com fundo desfocado da própria foto).

### Adicionar uma fotografia

1. Copie o arquivo para `Fotos/` (ex.: `Professor_21.jpg`).
2. Cadastre uma mensagem exclusiva em `src/data/professores.ts` (veja abaixo).
3. Rode `npm run build` novamente para publicar.

Uma foto sem mensagem cadastrada já aparece no mural e na apresentação, mas sem
texto. No modo de desenvolvimento, o console avisa quais fotos estão sem mensagem.

## Mensagens

Todas as mensagens estão em **`src/data/professores.ts`**. Cada item tem:

| Campo      | Descrição                                                     |
| ---------- | ------------------------------------------------------------- |
| `id`       | identificador único (ex.: `professor-21`)                     |
| `foto`     | nome exato do arquivo dentro de `Fotos/`                      |
| `mensagem` | texto da homenagem (ideal: 35 a 65 palavras)                  |
| `ordem`    | posição na apresentação (menor aparece primeiro)              |

Para alterar uma mensagem, edite apenas o campo `mensagem`. Os nomes dos
professores não são exibidos: cada homenagem mostra só a fotografia, a mensagem e
o contador ("Professor 04 de 20").

## Música

A trilha fica em **`public/audio/piano.mp3`**. O projeto já inclui uma peça
original para piano solo, composta e sintetizada especialmente para esta
homenagem (sem direitos autorais de terceiros).

Para trocar, substitua o arquivo por outro MP3 com o mesmo nome. Prefira músicas
instrumentais com licença de uso livre (por exemplo, faixas de piano com licença
Pixabay ou Creative Commons que permitam uso). Não use músicas comerciais sem
autorização.

Comportamento:

- começa com entrada gradual (fade-in) quando a homenagem é iniciada, a 25% de volume;
- toca em loop, pausa e retoma junto com a apresentação, do ponto em que parou;
- na tela final continua bem baixinho e encerra com fade-out ao voltar ao mural;
- se o arquivo não existir, aparece um aviso discreto e as fotos seguem normalmente;
- se o navegador bloquear o áudio, aparece um botão para ativá-lo.

## Apresentação e controles

- **Tempo por foto:** 15 s por padrão, com opções de 10, 15, 20 e 25 s no botão de
  configurações (⚙). Com "Ajustar tempo para mensagens longas" ligado, mensagens
  maiores ganham automaticamente o tempo mínimo de leitura. As escolhas ficam
  salvas no navegador.
- **Controles:** mural, reiniciar, anterior, reproduzir/pausar/continuar, próxima,
  silenciar, volume, configurações e tela cheia. Eles somem durante a reprodução e
  voltam ao mover o mouse ou tocar na tela.
- **Atalhos:** `Espaço` pausar/continuar · `←` `→` navegar · `F` tela cheia ·
  `M` silenciar · `Esc` sair da tela cheia ou voltar ao mural.
- Clicar em uma foto do mural abre a homenagem individual; o botão ▶ inicia a
  apresentação automática a partir dela.
- Ao final, uma tela de encerramento com a colagem de todas as fotos oferece
  **Reassistir homenagem** e **Voltar ao mural**.
- `prefers-reduced-motion` é respeitado: zoom lento, partículas e deslocamentos
  são desligados, mantendo apenas transições de opacidade.

## Estrutura

```text
Fotos/                     fotografias originais (descobertas automaticamente)
public/audio/piano.mp3     trilha sonora
src/
├── App.tsx                telas: mural, apresentação e encerramento
├── main.tsx               entrada + fontes locais (@fontsource)
├── components/
│   ├── Background.tsx         fundo claro com luz ambiente e partículas
│   ├── Header.tsx             título, instrução, contador e botão principal
│   ├── PhotoMural.tsx         grid de polaroids
│   ├── TeacherCard.tsx        cartão de uma foto no mural
│   ├── Polaroid.tsx           moldura polaroid + fallback de imagem com erro
│   ├── Presentation.tsx       orquestra slideshow, música, teclado e controles
│   ├── TeacherSlide.tsx       cartão animado: polaroid + mensagem
│   ├── PresentationControls.tsx  controles flutuantes
│   ├── SettingsPanel.tsx      duração e ajuste automático
│   ├── ProgressBar.tsx        barra de tempo da foto atual + indicadores
│   ├── AudioPlayer.tsx        avisos de música ausente ou bloqueada
│   └── FinalTribute.tsx       tela de encerramento com colagem
├── data/professores.ts    mensagens exclusivas
├── hooks/
│   ├── useSlideshow.ts        temporizador único com pausa/retomada precisa
│   ├── useBackgroundMusic.ts  HTMLAudioElement com fades
│   ├── useFullscreen.ts, useIdle.ts, usePreloadImages.ts, useSettings.ts
├── lib/                   config, descoberta de fotos, união fotos + mensagens
├── types/professor.ts
└── styles/globals.css     tema claro (marfim, azul suave e dourado)
```

Fontes: EB Garamond (títulos e mensagens), Manrope (interface) e Caveat (legenda
manuscrita da polaroid), todas empacotadas localmente.
