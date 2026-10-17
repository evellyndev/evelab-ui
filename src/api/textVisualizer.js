const endpointPath = '/text-visualizer'

function endpointUrl(baseUrl = import.meta.env.VITE_API_BASE_URL) {
  return `${(baseUrl || '').replace(/\/+$/, '')}${endpointPath}`
}

export class TextVisualizerApiError extends Error {
  constructor(message = 'Text visualization request failed.') { super(message); this.name = 'TextVisualizerApiError' }
}

export async function generateTextVisualization({ prompt, locale }, { fetchImpl = fetch, baseUrl } = {}) {
  let response
  try {
    response = await fetchImpl(endpointUrl(baseUrl), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt, top_k: 5, temperature: 0.0, locale }) })
  } catch { throw new TextVisualizerApiError() }
  if (!response.ok) throw new TextVisualizerApiError()
  try {
    const data = await response.json()
    if (typeof data?.text !== 'string' || !Array.isArray(data?.tokenProbs) || !Array.isArray(data?.promptTokens)) throw new Error('Invalid response')
    return data
  } catch { throw new TextVisualizerApiError() }
}

export { endpointUrl }
