const endpointPath = '/image-visualizer/generate'

function endpointUrl(baseUrl = import.meta.env.VITE_API_BASE_URL) {
  return `${(baseUrl || '').replace(/\/+$/, '')}${endpointPath}`
}

export class ImageVisualizerApiError extends Error {
  constructor(message = 'Image visualization request failed.') { super(message); this.name = 'ImageVisualizerApiError' }
}

function pngDataUrl(base64) {
  if (typeof base64 !== 'string' || !base64.trim() || !/^[A-Za-z0-9+/]+={0,2}$/.test(base64) || base64.length % 4 !== 0) throw new ImageVisualizerApiError('Invalid PNG data.')
  return `data:image/png;base64,${base64}`
}

function parseResponse(data) {
  if (typeof data?.prompt !== 'string' || !Number.isFinite(data?.num_inference_steps) || typeof data?.final_image_png_base64 !== 'string') throw new ImageVisualizerApiError('Malformed image visualization response.')
  const capturedSteps = data.captured_steps == null ? [] : data.captured_steps
  if (!Array.isArray(capturedSteps)) throw new ImageVisualizerApiError('Malformed captured steps.')
  return {
    prompt: data.prompt,
    numInferenceSteps: data.num_inference_steps,
    finalImage: { pngBase64: data.final_image_png_base64, src: pngDataUrl(data.final_image_png_base64) },
    capturedSteps: capturedSteps.map((stage) => {
      if (!Number.isFinite(stage?.step) || !Number.isFinite(stage?.timestep) || typeof stage?.png_base64 !== 'string') throw new ImageVisualizerApiError('Malformed captured step.')
      return { step: stage.step, timestep: stage.timestep, pngBase64: stage.png_base64, src: pngDataUrl(stage.png_base64) }
    }),
  }
}

export async function generateImageVisualization({ prompt, captureSteps = false, captureEvery }, { fetchImpl = fetch, baseUrl } = {}) {
  const body = captureSteps ? { prompt, capture_steps: true, capture_every: captureEvery } : { prompt }
  let response
  try { response = await fetchImpl(endpointUrl(baseUrl), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }) } catch { throw new ImageVisualizerApiError() }
  if (!response.ok) throw new ImageVisualizerApiError()
  try { return parseResponse(await response.json()) } catch (error) { if (error instanceof ImageVisualizerApiError) throw error; throw new ImageVisualizerApiError() }
}

export { endpointUrl }
