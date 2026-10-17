const track = document.querySelector('.carousel-track')
const slides = [...document.querySelectorAll('.carousel-slide')]
const choices = [...document.querySelectorAll('[data-target]')]
let current = 5
function show(index) { current = Math.max(0, Math.min(index, slides.length - 1)); slides[current].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' }); choices.forEach((choice, item) => { const active = item === current; choice.classList.toggle('is-selected', active); choice.setAttribute('aria-pressed', active) }) }
choices.forEach((choice) => choice.addEventListener('click', () => show(Number(choice.dataset.target))))
document.querySelectorAll('[data-direction]').forEach((button) => button.addEventListener('click', () => show(current + (button.dataset.direction === 'next' ? 1 : -1))))
track.addEventListener('keydown', (event) => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); show(current + (event.key === 'ArrowRight' ? 1 : -1)) } })
track.scrollLeft = track.scrollWidth
