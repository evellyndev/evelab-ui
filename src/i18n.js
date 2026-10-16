import { createContext, createElement, useContext, useEffect, useMemo, useState } from 'react'

const storageKey = 'evelab.locale'
const defaultLocale = 'pt-BR'

export const locales = [
  { code: 'pt-BR', label: 'PT' },
  { code: 'en', label: 'EN' },
]

const messages = {
  'pt-BR': {
    documentTitle: 'Evelab — Experimentos computacionais',
    catalog: {
      eyebrow: 'Índice de experimentos',
      title: 'Instrumentos em preparação',
      count: '04 estudos iniciais',
      availability: 'Em construção',
      open: 'Abrir experimento',
      language: 'Idioma',
      footer: 'Evelab / laboratório computacional',
      footerStatus: 'Coleção inicial',
    },
    placeholder: {
      eyebrow: 'Experimento em preparação',
      title: 'Em construção',
      body: 'Este instrumento ainda não está disponível. A visualização e seus controles serão adicionados em uma etapa futura.',
      back: 'Voltar ao índice',
    },
    tokenVisualizer: {
      eyebrow: 'Experimento 01 / estrutura de tokens', title: 'Visualizador de tokens', introduction: 'Submeta um contexto e examine as unidades escolhidas para formar a próxima palavra.',
      promptLabel: 'Contexto', promptHint: 'Escreva uma frase para o modelo continuar com uma palavra.', promptPlaceholder: 'Ex.: A pesquisa começa com uma boa', generate: 'Gerar visualização', generating: 'Gerando palavra', idle: 'Aguardando um contexto para iniciar o experimento.', loading: 'Consultando as probabilidades de tokens…', validation: 'Escreva um contexto antes de gerar.', failure: 'Não foi possível gerar esta visualização. Revise o contexto e tente novamente.', result: 'Resultado observado', outputTokens: 'Tokens de saída', promptTokens: 'Tokens do contexto', selectToken: 'Inspecionar token', selectedProbability: 'Probabilidade selecionada', alternatives: 'Alternativas ordenadas', noAlternatives: 'Nenhuma alternativa foi retornada.', tokenId: 'ID', bytes: 'Bytes', decoded: 'Texto', byteFallback: 'bytes não decodificáveis isoladamente',
    },
    experiments: {
      'token-visualizer': {
        title: 'Visualizador de tokens',
        summary: 'Observe como um texto é segmentado em unidades que um modelo pode processar.',
        focus: 'Estrutura de tokens',
      },
      'text-visualizer': {
        title: 'Visualizador de texto',
        summary: 'Acompanhe as estruturas que compõem uma resposta em linguagem natural.',
        focus: 'Traço de construção',
      },
      'hallucination-path': {
        title: 'Caminho de alucinação',
        summary: 'Examine como uma premissa imprecisa pode conduzir a continuações plausíveis.',
        focus: 'Mapa de ramificações',
      },
      'image-visualizer': {
        title: 'Visualizador de imagem',
        summary: 'Estude as etapas visuais de um experimento de geração de imagens.',
        focus: 'Estudo de progressão',
      },
    },
  },
  en: {
    documentTitle: 'Evelab — Computational experiments',
    catalog: {
      eyebrow: 'Experiment index',
      title: 'Instruments in preparation',
      count: '04 initial studies',
      availability: 'Under construction',
      open: 'Open experiment',
      language: 'Language',
      footer: 'Evelab / computational laboratory',
      footerStatus: 'Initial collection',
    },
    placeholder: {
      eyebrow: 'Experiment in preparation',
      title: 'Under construction',
      body: 'This instrument is not available yet. Its visualization and controls will be added in a future step.',
      back: 'Back to index',
    },
    tokenVisualizer: {
      eyebrow: 'Experiment 01 / token structure', title: 'Token Visualizer', introduction: 'Submit context and inspect the units selected to form the next word.',
      promptLabel: 'Context', promptHint: 'Write a phrase for the model to continue with one word.', promptPlaceholder: 'E.g. Research begins with a good', generate: 'Generate visualization', generating: 'Generating word', idle: 'Waiting for context to start the experiment.', loading: 'Retrieving token probabilities…', validation: 'Write context before generating.', failure: 'This visualization could not be generated. Review the context and try again.', result: 'Observed result', outputTokens: 'Output tokens', promptTokens: 'Context tokens', selectToken: 'Inspect token', selectedProbability: 'Selected probability', alternatives: 'Ranked alternatives', noAlternatives: 'No alternatives were returned.', tokenId: 'ID', bytes: 'Bytes', decoded: 'Text', byteFallback: 'bytes not independently decodable',
    },
    experiments: {
      'token-visualizer': {
        title: 'Token Visualizer',
        summary: 'Inspect how text is segmented into units a model can process.',
        focus: 'Token structure',
      },
      'text-visualizer': {
        title: 'Text Visualizer',
        summary: 'Follow the structures that make up a natural-language response.',
        focus: 'Construction trace',
      },
      'hallucination-path': {
        title: 'Hallucination Path',
        summary: 'Examine how an inaccurate premise can lead to plausible continuations.',
        focus: 'Branching map',
      },
      'image-visualizer': {
        title: 'Image Visualizer',
        summary: 'Study the visual stages of an image-generation experiment.',
        focus: 'Progression study',
      },
    },
  },
}

function getInitialLocale() {
  try {
    const stored = window.localStorage.getItem(storageKey)
    return messages[stored] ? stored : defaultLocale
  } catch {
    return defaultLocale
  }
}

const LocaleContext = createContext(null)

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState(getInitialLocale)

  useEffect(() => {
    document.documentElement.lang = locale
    document.title = messages[locale].documentTitle

    try {
      window.localStorage.setItem(storageKey, locale)
    } catch {
      // Browser storage is optional; the in-memory selection remains usable.
    }
  }, [locale])

  const value = useMemo(() => ({
    locale,
    setLocale,
    messages: messages[locale],
  }), [locale])

  return createElement(LocaleContext.Provider, { value }, children)
}

export function useLocale() {
  const context = useContext(LocaleContext)

  if (!context) {
    throw new Error('useLocale must be used inside LocaleProvider')
  }

  return context
}
