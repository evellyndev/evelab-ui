## Purpose

Permitir explorar como escolhas de tokens constroem e ramificam uma continuação plausível a partir de uma premissa não verificada, mantendo o caminho e a verificação manual claramente separados.

## ADDED Requirements

### Requirement: Workspace Estrato localizado
O sistema SHALL disponibilizar Hallucination Path como um workspace funcional no idioma português (Brasil) ou inglês ativo. O workspace SHALL apresentar uma orientação de que a pessoa deve informar uma afirmação factual falsa ou enganosa e que o experimento não confirma automaticamente essa premissa. A composição SHALL manter controles de contexto em um rail e uma área de observação dominante para a árvore de caminhos.

#### Scenario: Abrir o experimento
- **WHEN** uma pessoa abre o destino Hallucination Path
- **THEN** o sistema apresenta o campo de premissa, a orientação localizada e a área de árvore antes de iniciar uma geração

#### Scenario: Submeter uma premissa vazia
- **WHEN** uma pessoa tenta iniciar o caminho sem texto ou somente com espaços
- **THEN** o sistema não envia a requisição, mantém o foco de trabalho e expõe uma mensagem localizada associada ao campo

### Requirement: Geração contínua e escolha de token
O sistema SHALL enviar uma premissa válida para `POST /hallucination-path/generate` no URL-base configurado, usando o modo `path`, `top_k: 5`, `temperature: 0.0` e o locale ativo, sem expor credenciais no navegador. O sistema SHALL mostrar os candidatos ordenados, com token e probabilidade, e SHALL preservar espaços, tabulações e quebras de linha em cada token sem normalizar o seu valor.

#### Scenario: Iniciar uma sequência
- **WHEN** uma pessoa inicia uma exploração com uma premissa válida
- **THEN** o sistema mostra que a geração está em andamento e, ao receber uma sequência válida, oferece os candidatos da primeira etapa

#### Scenario: Seguir o token originalmente escolhido
- **WHEN** uma pessoa escolhe o token originalmente selecionado para a etapa ativa
- **THEN** o sistema acrescenta o token ao caminho e revela os candidatos pré-gerados da etapa seguinte sem enviar uma nova geração

#### Scenario: Falha de geração
- **WHEN** o serviço de geração falha ou retorna uma sequência inválida
- **THEN** o sistema apresenta uma falha localizada com instrução de recuperação, preserva a premissa e permite nova tentativa

### Requirement: Árvore ramificada e caminho ativo
O sistema SHALL representar cada token escolhido como um nó com sua probabilidade, conectado à premissa-raiz. O caminho ativo SHALL ser identificável por texto e estrutura, além de cor. A pessoa SHALL poder selecionar um nó não final para retomar o prefixo correspondente e escolher uma alternativa, preservando os ramos existentes.

#### Scenario: Criar uma ramificação
- **WHEN** uma pessoa escolhe um candidato diferente do token originalmente selecionado em uma etapa
- **THEN** o sistema cria um filho alternativo do nó ativo, o torna o caminho ativo e solicita uma nova sequência usando a premissa e o prefixo desse ramo

#### Scenario: Retomar um nó existente
- **WHEN** uma pessoa seleciona um nó anterior da árvore antes da finalização
- **THEN** o sistema atualiza o caminho ativo, a resposta observada e as escolhas disponíveis para aquele nó sem apagar filhos já existentes

### Requirement: Leitura e finalização imutável do caminho
O sistema SHALL manter a premissa e a resposta construída em áreas visuais separadas. A resposta SHALL conter somente os valores originais dos tokens do caminho ativo, em ordem. A ação de finalizar SHALL criar um snapshot imutável da premissa e resposta ativas e SHALL impedir seleção, ramificação e geração subsequentes.

#### Scenario: Finalizar exploração
- **WHEN** uma pessoa finaliza um caminho que possui ao menos um token escolhido
- **THEN** o sistema comunica que a exploração foi congelada e preserva a árvore, a premissa e a resposta exibidas sem classificá-las como verdadeiras ou falsas

#### Scenario: Alterações antes da finalização
- **WHEN** uma pessoa altera a premissa após iniciar uma exploração e antes de finalizar
- **THEN** o sistema marca o resultado como desatualizado ou exige uma nova execução antes de permitir que ele seja tratado como o caminho atual

### Requirement: Verificação manual posterior
O sistema SHALL mostrar uma seção de verificação abaixo do workspace de árvore, com ação indisponível até existir um snapshot final. Após uma ação explícita da pessoa, o sistema SHALL enviar o snapshot para `POST /hallucination-path/verify` no URL-base configurado e SHALL apresentar o motivo e as fontes retornadas sem modificar o caminho finalizado.

#### Scenario: Verificar caminho finalizado
- **WHEN** uma pessoa aciona a verificação de uma exploração finalizada
- **THEN** o sistema previne solicitações duplicadas enquanto ela está pendente e apresenta o resultado localizado, incluindo links seguros para as fontes disponíveis

#### Scenario: Falha na verificação
- **WHEN** a verificação falha ou não retorna um resultado válido
- **THEN** o sistema informa que a avaliação não foi concluída e preserva integralmente o snapshot final

### Requirement: Operação acessível e estados explícitos
O sistema SHALL permitir operar campo, candidatos, nós da árvore, finalização e verificação por teclado. Estados de carregamento, seleção, erro, resultado desatualizado e finalização SHALL ter texto ou estrutura além de cor, e mudanças relevantes SHALL ser anunciadas sem mover foco inesperadamente.

#### Scenario: Inspecionar e escolher sem ponteiro
- **WHEN** uma pessoa navega por candidatos ou nós da árvore usando teclado
- **THEN** ela consegue identificar foco e seleção, ativar a escolha ou retomada e receber o estado atualizado no mesmo contexto de trabalho
