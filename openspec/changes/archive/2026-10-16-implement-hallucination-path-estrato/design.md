## Context

Veja `proposal.md` para a motivação e `specs/hallucination-path-workspace/spec.md` para o contrato. O catálogo já encaminha experimentos migrados para rotas React; Token Visualizer e Text Visualizer estabelecem o padrão de locale, cliente API sem credenciais e workspaces acessíveis. A versão legada mantém a árvore no navegador, recebe segmentos contínuos de tokens e usa verificação manual após a finalização.

## Goals / Non-Goals

**Goals:**

- Migrar o fluxo completo para um componente de workspace sem alterar os contratos de geração e verificação existentes.
- Implementar a composição Estrato: rail de controle estável, campo amplo de árvore, escolhas próximas à árvore e faixa separada para premissa/resposta.
- Manter uma árvore de estado fiel, incluindo ramos, sequência pré-gerada, seleção de nó e snapshot final imutável.
- Reutilizar a disciplina de estados, localização e acessibilidade do Evelab.

**Non-Goals:**

- Não verificar automaticamente se a premissa é falsa nem transformar o resultado em um veredito factual durante a exploração.
- Não persistir árvores ou snapshots entre sessões.
- Não implementar comparação entre múltiplas execuções completas nem editar os serviços de geração/verificação.

## Decisions

### Modelar a árvore como dados normalizados no cliente

O workspace manterá nós por id, com `parentId`, token original, probabilidade, prefixo de resposta, segmento contínuo, índice da próxima etapa e ids de filhos. O estado também mantém o nó ativo, premissa submetida, estado de solicitação e snapshot final. A resposta ativa será derivada dos valores originais dos nós entre raiz e seleção, não de texto exibido.

Essa abordagem preserva espaços e permite retomar qualquer nó sem reconstituir ramos. Uma lista linear de escolhas foi descartada porque não mostra causalidade nem suporta ramificação de forma confiável.

### Tratar sequência prevista e ramo alternativo de modos distintos

Ao escolher o token previsto, o filho herda o segmento do pai e avança o índice local; não ocorre rede. Ao escolher uma alternativa, o filho recebe o prefixo atualizado e inicia uma nova solicitação de segmento. O cliente valida a forma mínima da resposta antes de torná-la selecionável.

Usar uma requisição por token foi descartado por perder a continuidade e aumentar latência. Tratar toda escolha como já pré-gerada impediria que alternativas criassem novos ramos válidos.

### Compor Estrato por papéis de experimento

O desktop usará rail de contexto/ação à esquerda e observação dominante à direita. A árvore usa conectores estruturais, token com marcador visível de espaço e probabilidade tabular; o caminho ativo combina rótulo, posição e violeta/amarelo. A dock de candidatos fica junto ao campo de observação. Premissa e resposta se mantêm separadas em uma faixa abaixo, seguida pela verificação.

Em telas compactas, a observação e a resposta aparecem antes de um rail colapsável ou reposicionado. Uma grade de cartões uniformes foi descartada porque dilui a relação entre decisão, estrutura e leitura.

### Finalizar antes de verificar

Finalizar congela um objeto `{ prompt, response, activeNodeId }` e bloqueia alterações de árvore. A verificação é uma ação independente e usa apenas esse snapshot. O resultado é renderizado como texto e links criados pelo cliente, com estado de carregamento e falha separado.

Verificar em cada escolha e permitir edição após a verificação foram descartados: misturam geração e evidência, aumentam custo e tornam a proveniência do resultado ambígua.

### Isolar clientes de API e mensagens de interface

Um cliente dedicado encapsulará a URL-base configurada e os payloads de `POST /hallucination-path/generate` e `POST /hallucination-path/verify`; o componente não conhece credenciais. As cópias localizadas incluem estado inicial, validação, geração, seleção, resultado desatualizado, finalização e verificação. Testes usam respostas determinísticas e não requerem provedores externos.

## Risks / Trade-offs

- [Árvore cresce além da largura disponível] → o campo terá overflow consciente e, em compacto, preservará seleção/retorno com lista linear acessível complementar.
- [Trocar de nó durante uma solicitação gera resultado fora de contexto] → associar cada requisição ao id do nó e descartar ou armazenar o resultado sem roubar a seleção ativa.
- [Mudança de premissa deixa o resultado ambíguo] → marcar resultado desatualizado e exigir nova geração para continuar ou finalizar o novo contexto.
- [Fontes retornadas são ausentes ou frágeis] → exibir a limitação da resposta recebida, sem fabricar uma classificação determinada.
- [HTML ou URL não confiável do serviço] → renderizar mensagem como texto e validar URLs antes de criar links externos.

## Migration Plan

1. Adicionar a entrada do experimento, rota e mensagens localizadas, preservando os destinos atuais.
2. Implementar o cliente API e a máquina de estado da árvore com testes unitários de sequência, ramo, snapshot e falhas.
3. Implementar o workspace e a composição Estrato, incluindo estados responsivos e operação por teclado.
4. Validar fluxos com respostas determinísticas e uma integração contra o URL-base configurado em ambiente de desenvolvimento.
5. Implantar como nova rota; rollback remove o encaminhamento do catálogo, pois não há dados persistidos ou migração de dados.
