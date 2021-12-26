"use strict"
const wordTeste = [
  "teste",
  "soja",
  "labirinto"
]
const outputText = document.querySelector('.output__text')

const typing = typingGame(wordTeste, outputText)

document.addEventListener('keypress', event => {
  const key = event.key
  typing.listen(key)
})