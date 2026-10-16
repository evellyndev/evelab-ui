export const experiments = [
  { id: '01', slug: 'token-visualizer', motif: 'tokens' },
  { id: '02', slug: 'text-visualizer', motif: 'text' },
  { id: '03', slug: 'hallucination-path', motif: 'path' },
  { id: '04', slug: 'image-visualizer', motif: 'image' },
]

export const experimentBySlug = Object.fromEntries(
  experiments.map((experiment) => [experiment.slug, experiment]),
)
