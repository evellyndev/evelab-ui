## Why

O Evelab já migrou experiências de token e texto para workspaces interativos, mas Hallucination Path continua indisponível na nova aplicação. A experiência precisa preservar a exploração ramificada da versão legada e enquadrá-la como investigação, não como uma confirmação automática de fatos.

## What Changes

- Adicionar a rota funcional Hallucination Path com a composição visual Estrato: rail de contexto e controle, campo dominante para a árvore e faixa de leitura do caminho ativo.
- Integrar a geração contínua de candidatos e a criação de ramificações, preservando tokens e probabilidades em cada nó.
- Permitir selecionar um nó anterior, visualizar a resposta correspondente e finalizar um snapshot imutável do caminho ativo.
- Incluir verificação manual somente após a finalização, com resultado e fontes apresentados sem alterar a árvore congelada.
- Localizar controles, estados, erros e avisos em português (Brasil) e inglês, com operação por teclado e sinais que não dependem apenas de cor.

## Capabilities

### New Capabilities

- `hallucination-path-workspace`: exploração localizada e acessível de caminhos de tokens ramificados, com finalização e verificação manual.

### Modified Capabilities

- Nenhuma.

## Impact

- Afeta o catálogo e roteamento de experimentos, mensagens de localização e novos componentes/estilos do workspace.
- Introduz clientes para `POST /hallucination-path/generate` e `POST /hallucination-path/verify` no URL-base de API configurado; nenhuma credencial de provedor é enviada pelo navegador.
- Reutiliza os princípios visuais e de acessibilidade já estabelecidos nos workspaces Token Visualizer e Text Visualizer.
