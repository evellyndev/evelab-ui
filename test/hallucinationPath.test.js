import assert from 'node:assert/strict'
import test from 'node:test'
import { HallucinationPathApiError, generateHallucinationPath, verifyHallucinationPath } from '../src/api/hallucinationPath.js'

test('posts the continuous path contract', async () => {
  let url, options
  const data = await generateHallucinationPath({ premise: 'premissa', responsePrefix: ' ela', locale: 'pt-BR' }, async (requestUrl, requestOptions) => { url = requestUrl; options = requestOptions; return new Response(JSON.stringify({ tokenProbs: [{ selected_token: ' reflete', selected_prob: .72, top_logprobs: [] }] })) })
  assert.equal(url, '/hallucination-path/generate')
  assert.deepEqual(JSON.parse(options.body), { premise: 'premissa', response_prefix: ' ela', top_k: 5, temperature: 0, locale: 'pt-BR' })
  assert.equal(data[0].selected_token, ' reflete')
})

test('posts verification and rejects invalid provider responses', async () => {
  let url
  const result = await verifyHallucinationPath({ premise: 'premissa', response: ' resposta', locale: 'en' }, async (requestUrl) => { url = requestUrl; return new Response(JSON.stringify({ message: 'Needs verification', sources: [] })) })
  assert.equal(url, '/hallucination-path/verify')
  assert.equal(result.message, 'Needs verification')
  await assert.rejects(() => generateHallucinationPath({ premise: 'x', locale: 'en' }, async () => new Response('{}')), HallucinationPathApiError)
  await assert.rejects(() => verifyHallucinationPath({ premise: 'x', response: ' y', locale: 'en' }, async () => { throw new Error('offline') }), HallucinationPathApiError)
})
