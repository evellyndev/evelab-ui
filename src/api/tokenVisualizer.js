const endpointPath = '/token-visualizer'

function endpointUrl(baseUrl = import.meta.env.VITE_API_BASE_URL) {
  const normalizedBase = (baseUrl || '').replace(/\/+$/, '')
  return `${normalizedBase}${endpointPath}`
}

export class TokenVisualizerApiError extends Error {
  constructor(message = 'Token visualization request failed.') {
    super(message)
    this.name = 'TokenVisualizerApiError'
  }
}

export async function generateTokenVisualization({ prompt, locale }, { fetchImpl = fetch, baseUrl } = {}) {
  let response
  try {
    response = await fetchImpl(endpointUrl(baseUrl), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, top_k: 5, temperature: 0.0, mode: 'word', locale }),
    })
  } catch {
    throw new TokenVisualizerApiError()
  }
  if (!response.ok) throw new TokenVisualizerApiError()
  try {
    const data = await response.json()
    if (typeof data?.text !== 'string' || !Array.isArray(data?.tokenProbs) || !Array.isArray(data?.promptTokens)) throw new Error('Invalid response')
    return data
  } catch {
    throw new TokenVisualizerApiError()
  }
}

export { endpointUrl }
