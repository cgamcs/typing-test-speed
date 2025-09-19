const $time = document.querySelector('time')
const $paragraph = document.querySelector('p')
const $input = document.querySelector('input')

const INITIAL_TIME = 30

const TEXT = 'the quick brown fox jumps over the lazy dog and midudev is trying to clone monkey type for fun and profit using vanilla js for the tying test spedd'

let words = []
let currentTime = INITIAL_TIME

initGame()
initialEvenets()

function initGame() {
  words = TEXT.split(' ').slice(0, 32)
  currentTime = INITIAL_TIME

  $time.textContent = currentTime

  $paragraph.innerHTML = words.map((word, index) => {
    const letters = word.split('')

    return `
      <word>
        ${letters.map(letter => `<letter>${letter}</letter>`).join('')}
      </word>
    `
  }).join('')

  const $firstWord = $paragraph.querySelector('word')
  $firstWord.classList.add('active')
  const $firstLetter = $firstWord.querySelector('letter')
  $firstLetter.classList.add('active')

  const intervalId = setInterval(() => {
    currentTime--
    $time.textContent = currentTime

    if (currentTime === 0) {
      clearInterval(intervalId)
      gameOver()
    }
  }, 1000)
}

function initialEvenets() {
  document.addEventListener('keydown', () => {
    $input.focus()
  })

  $input.addEventListener('keydown', oneKeyDown)
  $input.addEventListener('keyup', onKeyUp)
}

function oneKeyDown(e) {
  // recuperar los elementos actuales
  const $currentWord = $paragraph.querySelector('word.active')
  const $currentLetter = $currentWord.querySelector('letter.active')

  const { key } = e
  if (key === ' ') {
    e.preventDefault()

    $currentWord.classList.remove('active', 'marked')
    $currentLetter.classList.remove('active')

    const $nextWord = $currentWord.nextElementSibling
    const $nextLetter = $nextWord.querySelector('letter')

    $nextWord.classList.add('active')
    $nextLetter.classList.add('active')

    $input.value = ''

    const hasMissedLetters = $currentWord.querySelectorAll('letter:not(.correct)').length > 0

    const classToAdd = hasMissedLetters ? 'marked' : 'correct'
    $currentWord.classList.add(classToAdd)
  }
}

function onKeyUp() {
  // recuperar los elementos actuales
  const $currentWord = $paragraph.querySelector('word.active')
  const $currentLetter = $currentWord.querySelector('letter.active')

  const currentWord = $currentWord.innerText.trim()
  $input.maxLength = currentWord.length

  const $allLetters = $currentWord.querySelectorAll('letter')

  $allLetters.forEach($letter => $letter.classList.remove('correct', 'incorrect'))

  $input.value.split('').forEach((char, index) => {
    const $letter = $allLetters[index]
    const letterToCheck = currentWord[index]

    const isCorrect = char === letterToCheck
    const letterClass = isCorrect ? 'correct' : 'incorrect'

    $letter.classList.add(letterClass)
  })

  $currentLetter.classList.remove('active', 'last-one')
  const inputLength = $input.value.length
  const $nextActiveLetter = $allLetters[inputLength]

  if ($nextActiveLetter) {
    $nextActiveLetter.classList.add('active')
  } else {
    $currentLetter.classList.add('active', 'last-one')
    // todo: mostrar game over
  }
}

function gameOver() {
  console.log('game over')
}