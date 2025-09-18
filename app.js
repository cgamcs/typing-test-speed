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

    if(currentTime === 0) {
      clearInterval(intervalId)
      gameOver()
    }
  }, 1000)
}

function initialEvenets() {}

function gameOver() {
  console.log('game over')
}