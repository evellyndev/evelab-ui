import assert from 'node:assert/strict'
import test from 'node:test'
import { ImageVisualizerApiError, generateImageVisualization } from '../src/api/imageVisualizer.js'

const png = 'iVBORw0KGgo='
const payload = { prompt: 'Uma cidade futurista ao pôr do sol', num_inference_steps: 20, captured_steps: [{ step: 10, timestep: 400, png_base64: png }], final_image_png_base64: png }

test('posts the normal image generation contract', async () => {
  let request
  await generateImageVisualization({ prompt: 'cidade' }, { baseUrl: 'https://api.example/', fetchImpl: async (url, options) => { request = { url, options }; return new Response(JSON.stringify({ ...payload, captured_steps: [] })) } })
  assert.equal(request.url, 'https://api.example/image-visualizer/generate')
  assert.deepEqual(JSON.parse(request.options.body), { prompt: 'cidade' })
  assert.equal(request.options.headers['Content-Type'], 'application/json')
})

test('posts captured image settings and preserves stage order', async () => {
  const data = await generateImageVisualization({ prompt: 'cidade', captureSteps: true, captureEvery: 10 }, { baseUrl: '', fetchImpl: async (_url, options) => { assert.deepEqual(JSON.parse(options.body), { prompt: 'cidade', capture_steps: true, capture_every: 10 }); return new Response(JSON.stringify(payload)) } })
  assert.equal(data.capturedSteps[0].step, 10)
  assert.equal(data.finalImage.src, `data:image/png;base64,${png}`)
})

test('rejects malformed PNG response data', async () => {
  await assert.rejects(() => generateImageVisualization({ prompt: 'cidade' }, { baseUrl: '', fetchImpl: async () => new Response(JSON.stringify({ ...payload, final_image_png_base64: 'not valid!' })) }), ImageVisualizerApiError)
})
