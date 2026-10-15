# PROJETO: MURAL INTERATIVO — HOMENAGEM AO DIA DOS PROFESSORES

Atue como um desenvolvedor Front-end Sênior especializado em React, TypeScript, Vite, UX/UI Design, animações e experiências audiovisuais interativas.

Quero que você desenvolva uma aplicação web completa, moderna, elegante e emocionante para homenagear os professores da **ECI João Suassuna**, em comemoração ao Dia dos Professores.

A aplicação será utilizada principalmente em uma televisão de tela grande, durante uma homenagem especial, mas também deve funcionar perfeitamente em computadores, tablets e celulares.

**Tecnologias obrigatórias:**
- Vite
- React
- TypeScript
- CSS moderno e responsivo
- Lucide React para ícones
- Framer Motion (Motion for React), caso necessário, para animações cinematográficas

Não utilize backend. A aplicação deve funcionar inteiramente no navegador e poder ser compilada para hospedagem estática.

---

## 1. CONCEITO VISUAL

Quero uma experiência audiovisual com aparência profissional, semelhante a uma apresentação comemorativa produzida por um designer especializado.

O estilo deve transmitir:

- Gratidão, reconhecimento e emoção.
- Elegância, delicadeza e acolhimento.
- Sensação de celebração e valorização profissional.
- Uma experiência visual moderna, sem excesso de elementos.

**Identidade visual:**
- Fundo em azul-marinho profundo, combinado com detalhes dourados suaves.
- Gradientes discretos e iluminação ambiente.
- Tipografia elegante e extremamente legível.
- Partículas luminosas suaves no fundo, sem prejudicar a leitura.
- Animações fluidas e delicadas.
- Efeito de profundidade nas fotografias.
- Design adequado à proporção 16:9 das televisões.

Evite interfaces com aparência de painel administrativo. Quero algo que transmita a sensação de uma homenagem especial.

## 2. MURAL PRINCIPAL — GALERIA DE PROFESSORES

A página inicial deve ser um mural com TODAS as fotografias existentes na pasta `fotos`.

Analise a estrutura atual do projeto e localize essa pasta.

Configure o Vite para importar automaticamente todas as imagens compatíveis, incluindo JPG, JPEG, PNG, WEBP e AVIF.

Você pode organizar as imagens em `src/assets/fotos`, se necessário, preservando os arquivos originais e documentando qualquer reorganização.

**Características do mural:**

- Exibir todas as fotografias em um grid responsivo.
- Fotografias organizadas de maneira harmoniosa.
- Cartões elegantes com bordas e efeitos sutis.
- Ao passar o mouse sobre uma fotografia, aplicar um pequeno zoom e iluminação suave.
- Exibir o nome do professor quando estiver disponível.
- Não inventar nomes com base na aparência das pessoas.
- Abaixo do título principal, apresentar a instrução:

**"Cada professor tem uma história, um legado e uma mensagem especial. Toque em uma fotografia para descobrir nossa homenagem."**

**Título principal:**

"Para quem transforma vidas através da educação"

**Subtítulo:**

"Uma homenagem especial aos professores da ECI João Suassuna."

Na região superior ou inferior do mural, incluir um botão principal destacado:

▶ INICIAR HOMENAGEM

Ao clicar, iniciar a apresentação automática de todas as fotografias com suas respectivas mensagens.

Também permitir que o usuário clique diretamente em qualquer fotografia para visualizar a homenagem individual.

O mural deve ser visualmente bonito mesmo quando houver muitas fotografias.

## 3. MENSAGENS EXCLUSIVAS PARA CADA PROFESSOR

**ESTA É UMA DAS PARTES MAIS IMPORTANTES DO PROJETO.**

Cada professor deve receber uma mensagem de homenagem verdadeiramente ÚNICA.

Não quero mensagens repetidas nem textos genéricos em que somente o nome do professor seja substituído.

Para cada fotografia, crie uma mensagem individual, sensível, humana, carinhosa e emocionante, valorizando a importância do professor na formação dos estudantes.

As mensagens devem apresentar variedade real de construção, vocabulário, perspectiva e sentimento.

Exemplos de abordagens:

- O professor como inspiração para os estudantes.
- O impacto de seus ensinamentos além da sala de aula.
- A capacidade de transformar dificuldades em oportunidades.
- A dedicação silenciosa de quem educa.
- A importância de acreditar no potencial de cada estudante.
- A contribuição dos professores para a construção do futuro.
- O conhecimento como instrumento de transformação.
- A marca que um educador deixa na vida das pessoas.
- O reconhecimento pelo compromisso com a educação.

Esses são apenas exemplos. Crie outras abordagens para que as mensagens não pareçam variações do mesmo texto.

**Regras importantes:**

1. Cada fotografia deverá estar vinculada a uma mensagem própria.
2. Não reutilizar mensagens nem simplesmente modificar algumas palavras.
3. Produzir textos com aproximadamente 35 a 65 palavras, permitindo leitura confortável na televisão.
4. Utilizar linguagem sensível, bonita, acolhedora e natural.
5. Evitar exageros, clichês excessivos e repetições.
6. Não atribuir características pessoais, acontecimentos ou conquistas específicas sem informações que as confirmem.
7. Se os nomes estiverem presentes nos arquivos, utilizá-los após verificar a correspondência.
8. Se não for possível identificar o professor pelo nome do arquivo, criar um campo de identificação editável, sem adivinhar sua identidade.
9. Todas as mensagens devem ser revisadas para garantir boa ortografia e originalidade.

Crie uma estrutura centralizada, como `src/data/professores.ts`, contendo:

- ID único
- Nome do professor
- Caminho da fotografia
- Mensagem exclusiva
- Ordem de exibição

A estrutura deve permitir alterar uma mensagem ou acrescentar uma fotografia facilmente.

**IMPORTANTE:** as mensagens devem estar prontas dentro do projeto. Não quero depender de chamadas a APIs de inteligência artificial durante a apresentação.

## 4. APRESENTAÇÃO INDIVIDUAL DAS FOTOGRAFIAS

Ao clicar em uma fotografia do mural, abrir uma visualização especial em tela inteira.

Cada homenagem deve apresentar:

**Fotografia do professor:**
- Imagem em destaque.
- Boa proporção visual.
- Respeitar a proporção original da fotografia.
- Nunca cortar rostos indevidamente.
- Utilizar `object-fit: contain` quando necessário.
- Adicionar fundo desfocado derivado da própria fotografia para preencher espaços vazios, criando profundidade.

**Nome do professor:**
- Exibido em destaque com tipografia elegante.
- Entrada animada suave.

**Mensagem individual:**
- Apresentada abaixo ou ao lado da fotografia, conforme a resolução da tela.
- Letras grandes e legíveis.
- Animação discreta de aparecimento gradual.
- Espaçamento confortável.
- Tempo suficiente para leitura.

**Assinatura discreta:**

"Com carinho e gratidão, ECI João Suassuna."

Prefiro que a fotografia fique de um lado da tela e a mensagem do outro em telas grandes.

Em telas menores, reorganize o conteúdo verticalmente.

A apresentação deve passar a sensação de um cartão de homenagem animado.

## 5. APRESENTAÇÃO AUTOMÁTICA — MODO CINEMATOGRÁFICO

Crie um sistema de slideshow automático que percorra todas as fotografias e mensagens.

**Funcionamento:**

1. O usuário clica em "Iniciar Homenagem".
2. A aplicação abre a apresentação.
3. A música de piano começa a tocar suavemente após a interação.
4. A primeira fotografia aparece com uma transição delicada.
5. O nome do professor é revelado.
6. A mensagem especial aparece com uma animação suave.
7. A imagem permanece visível por tempo suficiente para leitura.
8. Uma transição cinematográfica apresenta o próximo professor.
9. O processo continua até o último professor.

**Tempo de apresentação:**

- Tempo-base de aproximadamente 15 segundos por fotografia.
- Permitir ajustar a duração nas configurações.
- Quando uma mensagem for maior, ajustar automaticamente o tempo mínimo necessário para leitura.
- Evitar transições rápidas.
- Utilizar efeitos suaves de fade, zoom lento ou deslocamento discreto.

O contador da apresentação deve indicar o progresso, por exemplo:

"Professor 04 de 32"

A quantidade deve ser calculada automaticamente a partir das imagens existentes.

## 6. CONTROLES DA APRESENTAÇÃO

A interface deve contar com controles flutuantes elegantes, discretos e funcionais.

**Botões obrigatórios:**

- ▶ Reproduzir apresentação
- ⏸ Pausar
- ▶ Continuar de onde parou
- ⏮ Voltar à fotografia anterior
- ⏭ Avançar para a próxima fotografia
- ⛶ Entrar ou sair da tela cheia
- 🔊 Controlar volume da música
- 🔇 Silenciar ou ativar o áudio
- ⌂ Voltar ao mural principal
- ↻ Reiniciar a apresentação

**Comportamentos importantes:**

- Ao pausar, interromper tanto a contagem de tempo quanto as animações temporizadas.
- Ao continuar, preservar o tempo restante da fotografia atual.
- Ao avançar manualmente, reiniciar o tempo de exibição da nova fotografia.
- Evitar múltiplos temporizadores em execução.
- Garantir que os botões funcionem corretamente mesmo após várias pausas e retomadas.
- Os controles devem desaparecer suavemente durante a reprodução, podendo reaparecer com movimento do mouse ou toque na tela.
- Garantir que os controles permaneçam acessíveis em dispositivos com toque.

**Atalhos do teclado:**

- Espaço: pausar ou continuar.
- Seta direita: próxima fotografia.
- Seta esquerda: fotografia anterior.
- F: alternar tela cheia.
- M: silenciar ou ativar música.
- Esc: sair da tela cheia ou retornar ao mural, conforme o contexto.

## 7. MÚSICA DE FUNDO — PIANO SUAVE

A apresentação deverá possuir uma trilha sonora instrumental emocionante e delicada.

**Estilo desejado:**

- Piano solo suave.
- Melodia calma, acolhedora e inspiradora.
- Sem voz.
- Sem batidas fortes.
- Volume baixo para não prejudicar a experiência.
- Preferência por músicas instrumentais com licença de uso apropriada.

Implemente um sistema de áudio utilizando HTMLAudioElement e React.

Requisitos:

- Permitir utilizar um arquivo MP3 local em `public/audio/piano.mp3`.
- Iniciar a reprodução quando o usuário clicar para começar a homenagem.
- Reproduzir a música em loop.
- Aplicar entrada gradual do volume (fade-in).
- Volume inicial de aproximadamente 25%.
- Permitir ajustar ou silenciar a música.
- Ao pausar a apresentação, a música também deverá pausar.
- Ao continuar, a música deve retomar da posição anterior.
- Ao encerrar a homenagem, reduzir gradualmente o volume (fade-out).
- Tratar corretamente as restrições de reprodução automática dos navegadores.
- Caso o arquivo não exista, mostrar uma orientação discreta sem impedir a apresentação das fotografias.

Não inserir músicas comerciais protegidas por direitos autorais sem autorização.

## 8. ANIMAÇÕES E TRANSIÇÕES CINEMATOGRÁFICAS

Implemente animações cuidadosas, evitando exageros.

**Fotografias:**
- Entrada com fade-in.
- Pequena ampliação progressiva, semelhante ao efeito Ken Burns.
- Transição suave entre fotografias.
- Leve profundidade visual.

**Mensagens:**
- Entrada após a fotografia.
- Aparecimento gradual.
- Movimento sutil de baixo para cima.
- Priorizar a leitura: não utilizar efeitos de digitação excessivamente lentos.

**Nomes:**
- Aparecimento elegante.
- Destaque com tonalidade dourada suave.

**Fundo:**
- Gradientes animados discretos.
- Pequenos pontos de luz em movimento lento.
- Evitar efeitos que provoquem distração ou reduzam o desempenho.

Respeitar a preferência `prefers-reduced-motion`, reduzindo animações quando solicitado pelo sistema.

## 9. ENCERRAMENTO ESPECIAL

Ao terminar a apresentação de todos os professores, não retornar imediatamente ao mural.

Quero uma tela final emocionante com a mensagem:

**"A educação transforma vidas. E por trás de cada transformação, existe um professor que fez a diferença."**

Em seguida, exibir:

**"Feliz Dia dos Professores!"**

"Nosso reconhecimento, carinho e gratidão a cada educador que faz parte da história da ECIT João Suassuna."

A tela final deve apresentar uma composição visual especial utilizando as fotografias dos professores.

Sugestão: criar uma colagem animada com as fotografias, formando um grande mural de gratidão.

Adicionar os botões:

- Reassistir homenagem
- Voltar ao mural

A música deve terminar com um fade-out suave ou continuar discretamente até a interação do usuário.

## 10. FUNCIONALIDADES EXTRAS

Implemente também as seguintes melhorias:

**Barra de progresso:** indicador discreto do tempo restante da fotografia atual.

**Pré-carregamento:** carregar antecipadamente as próximas fotografias para evitar telas vazias durante as transições.

**Contador geral:** mostrar quantos professores estão participando da homenagem.

**Modo tela cheia:** ideal para exibição em televisores e projetores.

**Navegação individual:** permitir abrir qualquer fotografia no mural e iniciar a reprodução automática a partir dela.

**Retorno ao mural:** ao sair da homenagem, retornar ao mural sem recarregar a página.

**Responsividade:** adaptar automaticamente o layout para televisores Full HD/4K, notebooks, tablets e smartphones.

**Otimização:** utilizar carregamento preguiçoso das miniaturas do mural, pré-carregando apenas as imagens necessárias para o slideshow.

**Fallback:** se uma fotografia estiver corrompida, exibir um tratamento visual elegante e permitir que a apresentação continue.

## 11. ESTRUTURA DO PROJETO

Organize o código com uma arquitetura de componentes reutilizáveis.

Sugestão:

```text
src/
├── assets/
│   └── fotos/
├── components/
│   ├── Header.tsx
│   ├── PhotoMural.tsx
│   ├── TeacherCard.tsx
│   ├── TeacherSlide.tsx
│   ├── PresentationControls.tsx
│   ├── AudioPlayer.tsx
│   ├── ProgressBar.tsx
│   └── FinalTribute.tsx
├── data/
│   └── professores.ts
├── hooks/
│   ├── useSlideshow.ts
│   └── useBackgroundMusic.ts
├── types/
│   └── professor.ts
├── styles/
│   └── globals.css
├── App.tsx
└── main.tsx

public/
└── audio/
    └── piano.mp3
```

Adapte essa estrutura se houver uma organização melhor.

Use `import.meta.glob` do Vite para descobrir as fotografias automaticamente.

A estrutura de dados das mensagens deve permitir relacionar cada fotografia com o professor correto.

Quando novas fotografias forem adicionadas, o mural deverá reconhecê-las sem exigir alterações manuais na lista de importações. As mensagens ainda deverão ser cadastradas individualmente para garantir exclusividade.

## 12. QUALIDADE TÉCNICA

O projeto deve:

- Utilizar React funcional com hooks.
- Utilizar TypeScript com tipagem rigorosa.
- Evitar `any`.
- Separar dados, apresentação e lógica de reprodução.
- Prevenir vazamento de listeners e timers.
- Funcionar sem conexão com a internet após a compilação, desde que todos os recursos necessários estejam disponíveis localmente.
- Não depender de serviços externos para exibir fotografias ou mensagens.
- Evitar erros no console do navegador.
- Possuir transições fluidas, com bom desempenho em TVs Android.
- Implementar controles acessíveis com labels adequados.
- Funcionar adequadamente em navegadores modernos.

O estado do slideshow precisa ser confiável, principalmente nas operações de pausa, retomada, avanço manual, retorno e encerramento.

## 13. RESULTADO ESPERADO

Quero uma aplicação que realmente funcione, não apenas uma demonstração visual.

Execute as seguintes etapas:

1. Analise o projeto e identifique as fotografias disponíveis na pasta `fotos`.
2. Configure Vite, React e TypeScript, caso ainda não estejam configurados.
3. Crie a arquitetura de componentes e os estilos.
4. Implemente o mural com todas as fotografias.
5. Prepare os dados individuais dos professores.
6. Crie uma mensagem exclusiva para cada professor, respeitando as informações disponíveis e sem inventar identidades.
7. Implemente a visualização individual.
8. Implemente o slideshow automático.
9. Implemente todos os controles e atalhos.
10. Configure a reprodução de música instrumental.
11. Desenvolva a tela final de agradecimento.
12. Teste as interações, o comportamento responsivo e a reprodução da apresentação.
13. Execute a verificação de TypeScript e o build de produção, corrigindo quaisquer erros encontrados.
14. Crie um README explicando como adicionar fotografias, editar mensagens, configurar a música e executar o projeto.

**PRIORIDADE MÁXIMA:**

Quero que a homenagem seja emocionante, que cada professor se sinta valorizado e que todas as mensagens sejam realmente diferentes.

O resultado deve ser visualmente sofisticado, agradável de assistir e adequado para uma apresentação em uma televisão durante a comemoração do Dia dos Professores.

Não entregue apenas exemplos de código ou uma proposta de implementação. Desenvolva a aplicação completa, criando e modificando os arquivos necessários no projeto.