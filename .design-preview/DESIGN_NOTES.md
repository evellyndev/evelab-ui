# Hallucination Path — direções de design

## 01 · Estrato

**Tokens:** `#191622` canvas, `#110F18` campo de observação, `#231F2F` controles, `#6C4CF1` seleção/ação, `#A78BFA` contexto, `#FFD166` continuação prevista, `#FF6B6B` aviso.

**Tipo:** Inter para interface e leitura; números de probabilidade usam figuras tabulares do sistema quando disponíveis.

**Composição:** rail de controle de 280 px à esquerda e um campo amplo de árvore à direita. A resposta e a premissa ficam em uma faixa de confirmação abaixo, para não competir com o grafo.

```text
premissa + iniciar |          árvore de decisões
                  |   nó ── nó ── nó
                  |          └── ramo
                  | escolhas do próximo token
------------------+--------------------------------
premissa observada | resposta observada | finalizar
```

Memória visual: um estrato de decisões. Melhor quando ramificação e retorno a um nó anterior são a pergunta central.

## 02 · Leitura forense

**Tokens:** os mesmos anchors Evelab; `#FFD166` só assinala o candidato de maior probabilidade, e `#FF6B6B` o aviso sobre a premissa.

**Tipo:** Inter com escala editorial — resposta em construção como a maior leitura da página; metadados técnicos em tamanho menor, sem transformar a interface em terminal.

**Composição:** input estreito, texto construído no campo dominante, e traço de decisões à direita.

```text
premissa       |     resposta em construção      | traço
e orientação   |     escolhas de continuação     | de decisões
               |     congelar texto               | versões
```

Memória visual: uma leitura anotada. Melhor para ensino e revisão cuidadosa de como uma sequência plausível se forma.

## 03 · Mesa de evidência

**Tokens:** mesma paleta. A borda amarela introduz a etapa de checagem; não há cor de “sucesso”, pois a interface não presume um resultado factual.

**Tipo:** Inter, com títulos compactos para manter o foco na sequência e em sua proveniência.

**Composição:** contexto, sequência e linhagem são três papéis distintos, não cards intercambiáveis. A verificação se estende abaixo como uma etapa deliberada do método.

```text
contexto / premissa | sequência sob inspeção | linhagem
                    | tokens e decisão       | árvore
--------------------------------------------------------
checagem externa (somente após finalizar)
```

Memória visual: uma bancada de investigação. Melhor para pessoas que alternam entre geração, ramos e a preparação da verificação.

## Revisão de especificidade

O padrão de dashboard foi descartado: não há métricas introdutórias, cartões uniformes, gradiente decorativo ou animação ambiente. As diferenças entre as alternativas derivam da operação que cada uma prioriza — navegar estrutura, ler formação textual ou preparar evidência. Em todas, a visualização ocupa mais área que os controles, estados têm rótulo além de cor, e a ação primária é explícita.
