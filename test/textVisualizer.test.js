import assert from 'node:assert/strict'
import test from 'node:test'
import { TextVisualizerApiError, generateTextVisualization } from '../src/api/textVisualizer.js'

const payload = { text: 'pequenos', tokenProbs: [{ selected_token: 'pequ', selected_prob: .8, top_logprobs: [] }], promptTokens: [{ id: 1, bytes: [112] }] }

test('posts the text-visualizer contract without mode', async () => {
  let options
  await generateTextVisualization({ prompt: 'teste', locale: 'pt-BR' }, { baseUrl: 'http://api.test/', fetchImpl: async (_, value) => { options = value; return new Response(JSON.stringify(payload), { status: 200 }) } })
  assert.deepEqual(JSON.parse(options.body), { prompt: 'teste', top_k: 5, temperature: 0, locale: 'pt-BR' })
})

test('rejects malformed payloads and request failures', async () => {
  await assert.rejects(() => generateTextVisualization({ prompt: 'teste' }, { baseUrl: '', fetchImpl: async () => new Response('{}') }), TextVisualizerApiError)
  await assert.rejects(() => generateTextVisualization({ prompt: 'teste' }, { baseUrl: '', fetchImpl: async () => { throw new Error('offline') } }), TextVisualizerApiError)
})
