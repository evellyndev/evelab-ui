import { useEffect, useMemo, useRef, useState } from 'react'
import { generateImageVisualization } from './api/imageVisualizer.js'
import './image-visualizer.css'

const copy = {
  'pt-BR': { eyebrow: 'Experimento 04 / processo de imagem', title: 'Compare antes de concluir.', intro: 'Uma folha de contato para encontrar em que momento o assunto, a luz e a composição passaram a se estabilizar.', prompt: 'Descrição da imagem', placeholder: 'Ex.: Uma cidade futurista ao pôr do sol', capture: 'Capturar etapas de denoising', interval: 'Intervalo de captura', generate: 'Gerar imagem', generating: 'Gerando imagem…', result: 'Em foco', noResult: 'Gere uma imagem para observar o resultado.', final: 'Imagem final', download: 'Baixar imagem final', stages: 'Estados observados', carousel: 'Carrossel de etapas', previous: 'Etapa anterior', next: 'Próxima etapa', selected: 'Etapa selecionada', timestep: 'timestep', validation: 'Descreva a imagem antes de gerar.', invalidInterval: 'Use um intervalo inteiro maior que zero.', failure: 'Não foi possível gerar a imagem. Revise os parâmetros e tente novamente.', success: 'Imagem gerada. O resultado está disponível para inspeção.', stale: 'O resultado usa os parâmetros anteriores. Gere novamente para atualizar.', noStages: 'Esta geração não registrou etapas intermediárias.' },
  en: { eyebrow: 'Experiment 04 / image process', title: 'Compare before concluding.', intro: 'A contact sheet for finding the moment when subject, light, and composition began to stabilize.', prompt: 'Image description', placeholder: 'E.g. A futuristic city at sunset', capture: 'Capture denoising steps', interval: 'Capture interval', generate: 'Generate image', generating: 'Generating image…', result: 'In focus', noResult: 'Generate an image to observe the result.', final: 'Final image', download: 'Download final image', stages: 'Observed states', carousel: 'Stage carousel', previous: 'Previous stage', next: 'Next stage', selected: 'Selected stage', timestep: 'timestep', validation: 'Describe the image before generating.', invalidInterval: 'Use a whole-number interval greater than zero.', failure: 'The image could not be generated. Review the parameters and try again.', success: 'Image generated. The result is ready for inspection.', stale: 'The result uses previous parameters. Generate again to update it.', noStages: 'This generation did not record intermediate stages.' },
}

export default function ImageVisualizer({ navigate, locale }) {
  const t = copy[locale] || copy['pt-BR']
  const [prompt, setPrompt] = useState('')
  const [captureSteps, setCaptureSteps] = useState(true)
  const [captureEvery, setCaptureEvery] = useState('10')
  const [status, setStatus] = useState('idle')
  const [result, setResult] = useState(null)
  const [submitted, setSubmitted] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const trackRef = useRef(null)
  const interval = Number(captureEvery)
  const params = useMemo(() => ({ prompt, captureSteps, captureEvery: captureSteps ? interval : null }), [prompt, captureSteps, interval])
  const stale = Boolean(result && submitted && (params.prompt !== submitted.prompt || params.captureSteps !== submitted.captureSteps || params.captureEvery !== submitted.captureEvery))
  const selected = result?.capturedSteps[selectedIndex]

  useEffect(() => { trackRef.current?.querySelector(`[data-stage-index="${selectedIndex}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' }) }, [selectedIndex])
  const select = (index) => result && setSelectedIndex(Math.max(0, Math.min(index, result.capturedSteps.length - 1)))

  async function submit(event) {
    event.preventDefault()
    if (!prompt.trim()) { setStatus('validation'); return }
    if (captureSteps && (!Number.isInteger(interval) || interval <= 0)) { setStatus('interval'); return }
    setStatus('loading')
    try {
      const next = await generateImageVisualization({ prompt: prompt.trim(), captureSteps, captureEvery: interval })
      setResult(next); setSubmitted({ prompt: prompt.trim(), captureSteps, captureEvery: captureSteps ? interval : null }); setSelectedIndex(Math.max(0, next.capturedSteps.length - 1)); setStatus('success')
    } catch { setStatus('failure') }
  }

  function download() { if (!result) return; const link = document.createElement('a'); link.href = result.finalImage.src; link.download = 'evelab-image.png'; link.click() }
  const message = status === 'loading' ? t.generating : status === 'validation' ? t.validation : status === 'interval' ? t.invalidInterval : status === 'failure' ? t.failure : status === 'success' ? t.success : stale ? t.stale : ''

  return <main className="image-workspace contact-workspace"><header className="image-workspace__header"><button className="image-workspace__back" onClick={() => navigate('/')} type="button">← Evelab</button><p className="eyebrow">{t.eyebrow}</p><h1>{t.title}</h1><p>{t.intro}</p></header><div className="contact-lab">
    <form className="contact-rail" noValidate onSubmit={submit}><label htmlFor="image-prompt">{t.prompt}</label><textarea aria-describedby="image-status" aria-invalid={status === 'validation'} id="image-prompt" onChange={(event) => setPrompt(event.target.value)} placeholder={t.placeholder} rows="4" value={prompt} /><label className="capture-toggle"><input checked={captureSteps} onChange={(event) => setCaptureSteps(event.target.checked)} type="checkbox" /><span aria-hidden="true" /><strong>{t.capture}</strong></label>{captureSteps && <label className="interval-field" htmlFor="capture-interval"><span>{t.interval}</span><input id="capture-interval" inputMode="numeric" min="1" onChange={(event) => setCaptureEvery(event.target.value)} type="number" value={captureEvery} /><small>{captureEvery || '—'} steps</small></label>}<button className="image-generate" disabled={status === 'loading'} type="submit">{status === 'loading' ? t.generating : t.generate}</button></form>
    <p aria-live="polite" className={`image-status is-${status}${stale ? ' is-stale' : ''}`} id="image-status" role={status === 'failure' || status === 'validation' || status === 'interval' ? 'alert' : 'status'}>{message}</p>
    <section className="image-selection" aria-labelledby="image-result-title"><div><p className="eyebrow">{t.result}</p><h2 id="image-result-title">{selected ? `step ${selected.step}` : t.final}</h2>{selected && <p>{t.timestep}: {selected.timestep}</p>}{!result && <p>{t.noResult}</p>}{stale && <p className="stale-notice">{t.stale}</p>}{result && <button className="image-download" onClick={download} type="button">↓ {t.download}</button>}</div><div className="image-frame">{result ? <img alt={t.final} src={result.finalImage.src} /> : <div aria-hidden="true" className="image-empty-frame" />}</div></section>
    {result && <section className="contact-field" aria-labelledby="stage-carousel-title"><div className="contact-field__heading"><div><p className="eyebrow">{t.stages}</p><h2 id="stage-carousel-title">{t.carousel}</h2></div>{result.capturedSteps.length > 0 && <div className="carousel-actions"><button aria-label={t.previous} disabled={selectedIndex === 0} onClick={() => select(selectedIndex - 1)} type="button">←</button><button aria-label={t.next} disabled={selectedIndex === result.capturedSteps.length - 1} onClick={() => select(selectedIndex + 1)} type="button">→</button></div>}</div>{result.capturedSteps.length ? <><div aria-label={t.carousel} className="carousel-track" onKeyDown={(event) => { if (event.key === 'ArrowLeft') { event.preventDefault(); select(selectedIndex - 1) } if (event.key === 'ArrowRight') { event.preventDefault(); select(selectedIndex + 1) } }} ref={trackRef} tabIndex="0">{result.capturedSteps.map((stage, index) => <article className="carousel-slide" data-stage-index={index} key={`${stage.step}-${stage.timestep}`}><img alt={`step ${stage.step}, ${t.timestep} ${stage.timestep}`} src={stage.src} /><div><strong>step {stage.step}</strong><span>{t.timestep}: {stage.timestep}</span></div></article>)}</div><div aria-label={t.selected} className="thumbnail-strip">{result.capturedSteps.map((stage, index) => <button aria-label={`step ${stage.step}`} aria-pressed={selectedIndex === index} className={selectedIndex === index ? 'is-selected' : ''} key={`${stage.step}-${stage.timestep}`} onClick={() => select(index)} type="button"><img alt="" src={stage.src} /><span>{stage.step}</span></button>)}</div></> : <p className="no-stages" role="status">{t.noStages}</p>}</section>}
  </div></main>
}
