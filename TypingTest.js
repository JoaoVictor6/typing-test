/**
 * @param {string[]} arr
 * @returns {{
 *  letter:string
 *  id: number
 *  isHighlighted: boolean
 * }[]}
 */
function wordSanitize(arr){
  const sanitized = arr.map(item => {
    return item.split('')
    .map((item, index) => ({letter: item, isHighlighted: false, id: index}))
  })
  return sanitized
}
/**
 * 
 * @param {Element} domArea 
 * @param {string[]} sanitizeWords
 */
function renderWords(domArea, sanitizeWords){
  domArea.innerHTML = ''
  sanitizeWords.forEach(item => {
    const paragraph = document.createElement('p')
    paragraph.id = item.id
    paragraph.innerHTML = item.letter
    if(item.isHighlighted) {paragraph.classList.add('highlighted-letter')}
    return domArea.appendChild(paragraph)
  })
}

/**
 * @param {{
 *  letter:string
 *  id: number
 *  isHighlighted: boolean
 * }[][]} wordsArr
 */
function renderScore(wordsArr){
  const scoreOutput = document.querySelector('.score-area')
  
  scoreOutput.innerHTML = ''
  wordsArr.forEach(item => {
    const isHighlighted = item.every(item => item.isHighlighted)
    if(isHighlighted){
      const paragraph = document.createElement('p')
      paragraph.textContent = item.reduce((prev,curr) => prev+curr.letter,'')
      scoreOutput.appendChild(paragraph)
    }
  })
}

/**
  * @param {string[]} arr
  * @param {Element} outputArea
*/
function typingGame(arr, outputArea) {
  let words = wordSanitize(arr)
  
  const currWord = new Proxy({
    current: 0,
    currentLetter: 0
  }, {
    set: (obj, prop, value) => {
      if(prop === 'currentLetter' || prop === 'current'){
        if(words[obj.current].length-1 <= obj.currentLetter){
          
          if(!words[obj.current+1]){
            words = wordSanitize(arr)
            obj.current = 0
            obj.currentLetter = 0
            renderWords(outputArea, words[obj.current])
            renderScore(words)
            return
          }
          obj.current += 1
          obj.currentLetter = 0
          renderWords(outputArea, words[obj.current])
          renderScore(words)
          return
        }
        // renderScore(words)
        renderWords(outputArea, words[obj.current])
      }

      obj[prop] = value

      return true
    }
  })

  renderWords(outputArea, words[currWord.current])
  return {
    listen:(key) => {
      length = words[currWord.current].length
      currLetter = words[currWord.current][currWord.currentLetter]

      if(length < currWord.currentLetter){
        currWord.currentLetter = 0
      }
      if(words[currWord.current][currWord.currentLetter].letter === key){
        words[currWord.current][currWord.currentLetter].isHighlighted = true
        currWord.currentLetter += 1

        if(words[currWord.current].length === currWord.currentLetter){
          currWord.current += 1
        } 
      }
    }
  }
}