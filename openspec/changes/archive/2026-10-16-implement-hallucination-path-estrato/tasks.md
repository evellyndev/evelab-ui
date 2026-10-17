## 1. Integração do experimento

- [x] 1.1 Adicionar Hallucination Path ao catálogo, roteamento e mensagens pt-BR/en, verificando que o destino abre no idioma ativo sem afetar Token Visualizer e Text Visualizer.
- [x] 1.2 Criar o cliente de API para `POST /hallucination-path/generate` e `POST /hallucination-path/verify` no URL-base configurado, verificando com testes que os payloads incluem modo `path`, parâmetros fixos, locale e nenhuma credencial no navegador.

## 2. Estado de exploração

- [x] 2.1 Implementar o estado normalizado de nós, seleção ativa e resposta derivada do caminho, verificando com testes unitários a preservação de token, espaço, tabulação, quebra de linha e probabilidade.
- [x] 2.2 Implementar avanço pela sequência pré-gerada e criação de ramo por alternativa, verificando que a escolha prevista não faz nova requisição e que uma alternativa preserva filhos existentes e solicita somente o novo segmento.
- [x] 2.3 Implementar validação, carregamento, falha e resultado desatualizado da geração, verificando que o prompt é preservado, submissões duplicadas são bloqueadas e cada estado tem mensagem localizada.

## 3. Workspace Estrato

- [x] 3.1 Implementar o layout de rail de contexto, campo dominante de árvore, dock de candidatos e faixa separada de premissa/resposta, verificando visualmente em largura ampla e compacta contra o protótipo Estrato.
- [x] 3.2 Renderizar nós conectados com caminho ativo, token visível e probabilidade tabular, verificando que seleção por ponteiro e teclado atualiza a resposta e as opções do nó sem depender somente de cor.
- [x] 3.3 Aplicar os estados de foco, seleção, carregamento, erro e caminho desatualizado conforme os guidelines Evelab, verificando foco visível, anúncios de status e preferência de movimento reduzido.

## 4. Finalização e evidência

- [x] 4.1 Implementar a finalização idempotente e o snapshot imutável do caminho ativo, verificando que árvore, premissa e resposta não podem ser alteradas após congelar.
- [x] 4.2 Implementar a seção de verificação manual posterior, verificando que ela permanece indisponível antes da finalização, previne solicitações duplicadas e apresenta texto seguro, falha recuperável e links de fontes após a resposta.

## 5. Verificação integrada

- [ ] 5.1 Adicionar testes de interface para início, avanço contínuo, ramificação, retomada de nó, finalização e verificação, executando `npm test` com sucesso.
- [ ] 5.2 Executar a suíte de produção e revisar o workspace em desktop e compacto, verificando `npm run build` e a navegação completa sem avisos de console ou regressões nos experimentos migrados.
