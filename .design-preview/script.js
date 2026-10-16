const copies = {
  pt: { back:'Experimentos', title:'Visualizador de tokens', local:'Prévia local — sem modelo conectado', contextLabel:'Contexto', promptLabel:'Texto de entrada', promptPlaceholder:'Digite um contexto para observar a próxima palavra.', methodLabel:'Leitura', method:'Selecione um token da resposta para comparar as alternativas consideradas naquele passo.', run:'Atualizar prévia', responseLabel:'Resposta prevista', responseTitle:'Uma palavra, construída em etapas', selected:'Token selecionado', contextBefore:'Contexto antes da escolha', candidatesLabel:'Candidatos', probabilityTitle:'Distribuição local', note:'A tabela representa os candidatos mais prováveis; a soma não precisa atingir 100%.' },
  en: { back:'Experiments', title:'Token Visualizer', local:'Local preview — no model connected', contextLabel:'Context', promptLabel:'Input text', promptPlaceholder:'Enter context to inspect the next word.', methodLabel:'Reading', method:'Select a response token to compare the alternatives considered at that step.', run:'Refresh preview', responseLabel:'Predicted response', responseTitle:'One word, built in steps', selected:'Selected token', contextBefore:'Context before selection', candidatesLabel:'Candidates', probabilityTitle:'Local distribution', note:'The table shows the most likely candidates; their total does not need to reach 100%.' },
}

const candidates = [
  [['␠the', .91], ['␠a', .05], ['␠its', .02], ['␠this', .01], ['␠our', .01]],
  [['␠main', .67], ['␠central', .14], ['␠largest', .08], ['␠primary', .06], ['␠only', .03]],
  [['␠stage', .84], ['␠space', .07], ['␠room', .04], ['␠area', .03], ['␠venue', .01]],
  [['␠for', .42], ['␠where', .31], ['␠that', .14], ['␠with', .08], ['␠of', .03]],
  [['␠ideas', .79], ['␠talks', .09], ['␠people', .05], ['␠events', .04], ['␠work', .02]],
  [['.', .63], ['␠today', .18], [',', .09], ['␠now', .05], ['!', .02]],
]

const contexts = ['The conference hall is where', 'The conference hall is where the', 'The conference hall is where the main', 'The conference hall is where the main stage', 'The conference hall is where the main stage for', 'The conference hall is where the main stage for ideas']

const list = document.querySelector('#candidate-list')
const stage = document.querySelector('#token-stage')
const selectedToken = document.querySelector('#selected-token')
const selectedStep = document.querySelector('#selected-step')
const contextBefore = document.querySelector('#context-before')

function renderCandidates(index) {
  const token = stage.querySelector(`[data-index="${index}"] span`).textContent
  selectedToken.textContent = token
  selectedStep.textContent = String(index + 1).padStart(2, '0')
  contextBefore.textContent = contexts[index]
  list.innerHTML = candidates[index].map(([candidate, probability], candidateIndex) => `
    <div class="candidate ${candidateIndex === 0 ? 'is-chosen' : ''}" role="listitem">
      <span class="candidate-token">${candidate}</span><span class="candidate-prob">${(probability * 100).toFixed(1)}%</span>
      <span class="candidate-bar"><i style="width:${probability * 100}%"></i></span>
    </div>`).join('')
}

stage.addEventListener('click', (event) => {
  const token = event.target.closest('.response-token')
  if (!token) return
  stage.querySelectorAll('.response-token').forEach((item) => item.classList.toggle('is-selected', item === token))
  renderCandidates(Number(token.dataset.index))
})

document.querySelectorAll('.concept-tab').forEach((tab) => tab.addEventListener('click', () => {
  document.querySelectorAll('.concept-tab').forEach((item) => item.classList.toggle('is-active', item === tab))
  document.querySelector('.workbench').dataset.conceptView = tab.dataset.concept
  document.querySelectorAll('[data-note]').forEach((note) => { note.hidden = note.dataset.note !== tab.dataset.concept })
}))

document.querySelectorAll('.locale-button').forEach((button) => button.addEventListener('click', () => {
  const locale = button.dataset.locale
  document.documentElement.lang = locale === 'pt' ? 'pt-BR' : 'en'
  document.querySelectorAll('.locale-button').forEach((item) => { item.classList.toggle('is-active', item === button); item.setAttribute('aria-pressed', String(item === button)) })
  document.querySelectorAll('[data-copy]').forEach((element) => { element.textContent = copies[locale][element.dataset.copy] })
  document.querySelector('#prompt').placeholder = copies[locale].promptPlaceholder
}))

document.querySelector('#run-button').addEventListener('click', () => {
  const button = document.querySelector('#run-button')
  button.classList.add('is-updated')
  stage.querySelectorAll('.response-token').forEach((token) => token.classList.remove('is-selected'))
  stage.querySelector('[data-index="0"]').classList.add('is-selected')
  renderCandidates(0)
  setTimeout(() => button.classList.remove('is-updated'), 360)
})

renderCandidates(0)
