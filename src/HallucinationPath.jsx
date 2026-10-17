import { useMemo, useState } from 'react'
import { generateHallucinationPath, verifyHallucinationPath } from './api/hallucinationPath.js'
import HallucinationDecisionTree from './HallucinationDecisionTree.jsx'
import './hallucination-path.css'
import './hallucination-decision-layout.css'

const shown = value => (value || '').replaceAll(' ', '␠').replaceAll('\t', '⇥').replaceAll('\n', '↵') || '∅'
const pct = value => new Intl.NumberFormat(undefined, { style: 'percent', maximumFractionDigits: 1 }).format(value)

export default function HallucinationPath({ navigate, locale }) {
  const pt = locale !== 'en'
  const t = pt ? ['Caminho de alucinação', 'Afirmação factual falsa', 'Iniciar caminho', 'Próximo token', 'Finalizar exploração', 'Verificar alucinação'] : ['Hallucination Path', 'False factual statement', 'Start path', 'Next token', 'Finish exploration', 'Verify hallucination']
  const [prompt, setPrompt] = useState('')
  const [submitted, setSubmitted] = useState('')
  const [nodes, setNodes] = useState({})
  const [active, setActive] = useState(null)
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const [final, setFinal] = useState(null)
  const [verification, setVerification] = useState(null)
  const node = nodes[active]
  const response = useMemo(() => {
    let text = '', current = node
    while (current?.parentId) { text = current.token + text; current = nodes[current.parentId] }
    return text
  }, [node, nodes])
  const options = node?.segment?.[node.index]?.top_logprobs || []

  async function load(id, prefix, premise) {
    setLoading(true)
    try {
      const segment = await generateHallucinationPath({ premise, responsePrefix: prefix, locale })
      setNodes(current => ({ ...current, [id]: { ...current[id], segment, index: 0 } }))
      setStatus('')
    } catch {
      setStatus(pt ? 'Não foi possível gerar candidatos.' : 'Candidates could not be generated.')
    } finally {
      setLoading(false)
    }
  }

  async function start() {
    if (!prompt.trim()) { setStatus(pt ? 'Digite uma afirmação para continuar.' : 'Enter a statement to continue.'); return }
    setNodes({ root: { id: 'root', children: [], segment: [], index: 0 } })
    setActive('root')
    setSubmitted(prompt)
    setFinal(null)
    setVerification(null)
    await load('root', '', prompt)
  }

  async function choose(candidate) {
    if (!node || loading || final) return
    const decision = node.segment[node.index]
    if (!decision) return
    const original = candidate.token === decision.selected_token
    const id = 'n' + Date.now()
    const prefix = response + candidate.token
    setNodes(current => ({
      ...current,
      [active]: { ...current[active], children: [...current[active].children, id] },
      [id]: { id, parentId: active, children: [], token: candidate.token, probability: candidate.probability, segment: original ? node.segment : [], index: original ? node.index + 1 : 0 },
    }))
    setActive(id)
    if (!original) await load(id, prefix, submitted)
  }

  async function verify() {
    try { setVerification(await verifyHallucinationPath({ premise: final.premise, response: final.response, locale })) }
    catch { setVerification({ message: pt ? 'Não foi possível concluir a verificação.' : 'Verification could not be completed.' }) }
  }

  return <main className="path-workspace">
    <header><button onClick={() => navigate('/')} type="button">← Evelab</button><p>Experimento 03 / árvore de decisões</p><h1>{t[0]}</h1><p>{pt ? 'Explore continuações plausíveis sem tratar a premissa como fato.' : 'Explore plausible continuations without treating the premise as fact.'}</p></header>
    <section className="path-input"><label>{t[1]}<small>{pt ? 'O experimento não confirma a premissa.' : 'The experiment does not confirm the premise.'}</small><textarea disabled={!!final} onChange={event => setPrompt(event.target.value)} rows="4" value={prompt} /></label><div className="path-controls"><button className="path-primary" disabled={loading || !!final} onClick={start} type="button">{t[2]}</button><p className="path-status">{status}</p></div></section>
    <section className="path-reading"><div><p>{t[1]}</p><strong>{submitted}</strong></div><div><p>{pt ? 'Resposta do assistant' : 'Assistant response'}</p><strong>{response}</strong></div><button disabled={!response || !!final} onClick={() => setFinal({ premise: submitted, response })} type="button">{t[4]}</button></section>
    <div className="path-grid"><section className="path-observation">
      <div className="path-heading"><div><p>Resposta do assistant</p><h2>{t[3]}</h2></div><span>{pt ? 'Escolha um token para continuar a geração.' : 'Choose a token to continue generation.'}</span></div>
      <div className="candidate-dock"><div><p>Alternativas</p><h2>{t[3]}</h2></div><div className="candidates">{!final && options.map((candidate, index) => <button className={index === 0 ? 'is-primary-choice' : ''} key={candidate.token + index} onClick={() => choose(candidate)} type="button"><strong>{shown(candidate.token)}</strong><small>{pct(candidate.probability)}</small></button>)}</div></div>
      <section className="path-history"><div><p>Histórico da geração</p><h2>{pt ? 'Explore o caminho de tokens que levou à resposta.' : 'Explore the token path that led to the response.'}</h2></div><div className="path-tree"><HallucinationDecisionTree active={active} nodes={nodes} premise={submitted} /></div></section>
    </section></div>
    <section className="path-verify"><div><p>Verificação manual</p><h2>{pt ? 'Finalize o caminho antes de consultar evidências externas.' : 'Finish the path before consulting external evidence.'}</h2></div><div><button disabled={!final} onClick={verify} type="button">{t[5]}</button>{verification && <div role="status">{verification.message}</div>}</div></section>
  </main>
}
