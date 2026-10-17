# text-visualizer-workspace Specification

## Purpose

Permitir que pessoas submetam um prompt e investiguem, de forma fiel e acessível, como o modelo construiu uma resposta completa token a token.

## Requirements

### Requirement: Text Visualizer provides a localized response-generation workspace

O sistema SHALL substituir a tela de construção em `/experiments/text-visualizer` por um espaço de trabalho funcional no idioma português (Brasil) ou inglês ativo. O espaço SHALL apresentar um campo de prompt, uma ação explícita para gerar uma resposta e uma área de observação para o resultado.

#### Scenario: Open Text Visualizer
- **WHEN** uma pessoa abre `/experiments/text-visualizer`
- **THEN** o sistema apresenta controles localizados para submeter um prompt e iniciar a visualização de uma resposta completa

#### Scenario: Preserve active locale
- **WHEN** uma pessoa altera o idioma ativo e gera uma resposta
- **THEN** os controles, estados e textos de apoio do espaço de trabalho permanecem no idioma ativo

### Requirement: Text Visualizer uses the configured text-generation contract

O sistema SHALL enviar um prompt válido para `POST /text-visualizer` no URL-base configurado, com `prompt`, `top_k: 5`, `temperature: 0.0` e o locale ativo. O navegador SHALL NOT enviar credenciais de provedor. O sistema SHALL aceitar uma resposta que contenha `text`, `tokenProbs` e `promptTokens`.

#### Scenario: Generate a text response
- **WHEN** uma pessoa submete um prompt não vazio
- **THEN** o sistema envia uma única requisição usando o contrato de geração de texto e representa que a resposta está sendo gerada até a requisição terminar

#### Scenario: Reject an incomplete response payload
- **WHEN** o serviço retorna uma resposta sem `text`, `tokenProbs` ou `promptTokens` válidos
- **THEN** o sistema apresenta um estado de falha seguro e permite uma nova tentativa sem apagar o prompt

### Requirement: Text Visualizer renders the provider token sequence faithfully

O sistema SHALL renderizar cada item de `tokenProbs` como uma unidade selecionável, na ordem recebida, sem dividir, agrupar ou sintetizar tokens no navegador. A apresentação SHALL tornar espaços, tabulações e quebras de linha distinguíveis sem alterar seus valores subjacentes. Fragmentos que não correspondem a uma palavra inteira SHALL permanecer visualmente separados.

#### Scenario: Inspect a word composed of fragments
- **WHEN** a resposta recebida contém tokens consecutivos que compõem apenas parte e o restante de uma palavra
- **THEN** o sistema mostra cada token como uma unidade distinta e selecionável na ordem da resposta

#### Scenario: Render a space or line break token
- **WHEN** um token escolhido representa um espaço, tabulação ou quebra de linha
- **THEN** o sistema fornece uma representação visual inequívoca para esse token e preserva a ordem e a estrutura textual da resposta

### Requirement: Text Visualizer provides contextual token inspection

O sistema SHALL selecionar o primeiro token retornado após uma geração bem-sucedida e SHALL permitir a seleção de qualquer token por ponteiro ou teclado. Para o token selecionado, o sistema SHALL mostrar o valor do token, sua probabilidade selecionada e os candidatos ordenados com suas probabilidades. O sistema SHALL exibir o prompt submetido acima dos detalhes da resposta observada.

#### Scenario: Select a later token
- **WHEN** uma pessoa seleciona um token posterior da resposta
- **THEN** o inspetor passa a mostrar persistentemente a probabilidade e os candidatos desse token sem modificar a sequência recebida

#### Scenario: Review submitted prompt
- **WHEN** uma geração é concluída com sucesso
- **THEN** o sistema mostra o prompt que originou a resposta antes da visualização dos tokens de saída

### Requirement: Text Visualizer exposes clear request states

O sistema SHALL distinguir os estados inicial, carregando, sucesso, erro de validação e falha de requisição com texto e sinais que não dependam apenas de cor. Durante uma requisição pendente, o sistema SHALL impedir submissões duplicadas e SHALL preservar o texto do prompt.

#### Scenario: Submit an empty prompt
- **WHEN** uma pessoa tenta gerar uma resposta com um prompt vazio ou composto somente por espaços
- **THEN** o sistema impede a requisição e apresenta uma mensagem localizada associada ao campo de prompt

#### Scenario: Request failure
- **WHEN** a requisição de geração falha
- **THEN** o sistema apresenta uma mensagem localizada de recuperação, preserva o prompt e permite uma nova submissão
