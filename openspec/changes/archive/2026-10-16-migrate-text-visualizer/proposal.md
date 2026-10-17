## Why

O experimento “Visualizador de texto” ainda apresenta uma tela de construção, embora o serviço de geração de texto completo já esteja disponível. A migração transforma o experimento em uma forma fiel e interativa de observar como uma resposta é construída token a token.

## What Changes

- Substituir a tela de construção de `/experiments/text-visualizer` por um espaço de geração e inspeção de respostas completas.
- Enviar prompts ao endpoint configurado `/text-visualizer` e apresentar os estados de geração, validação e falha.
- Renderizar tokens retornados pelo serviço como unidades separadas e selecionáveis, preservando fragmentos, espaços e quebras de linha.
- Exibir o prompt submetido, a resposta em ordem de leitura e os candidatos/probabilidades do token selecionado.

## Capabilities

### New Capabilities

- `text-visualizer-workspace`: geração e inspeção acessível de respostas completas, token a token.

### Modified Capabilities

- Nenhuma.

## Impact

- Interface da rota `/experiments/text-visualizer`, textos localizados e estilos do espaço de trabalho.
- Novo cliente de requisição para o endpoint configurado `/text-visualizer`.
- Sem alteração do contrato do backend ou do visualizador de tokens de palavra única.
