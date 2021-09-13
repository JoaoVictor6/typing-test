const word = [
  "teste",
  "soja",
  "labirinto"
]
const outputText = document.querySelector('.output__text')

const typing = new TypingTest(word, outputText)

typing.generateTextOutput(outputText)

document.addEventListener('keypress', event => {
  const key = event.key
  typing.listen(key)
})