class TypingTest {
  /**
   * @param {string[]} wordArray The array
   * @param {Element} elementForOutput
    */
  constructor(wordArray, elementForOutput){
    this._arrayLenght = wordArray.length
    this._currentArrayPosition = 0
    this._sanitizeArrayWords = wordArray.map(item => {
      return item.split('')
        .map((item, index) => ({letter: item, isHighlighted: false, id: index}))
    })
    this._letterListen = 0

    this._currentWord = this._sanitizeArrayWords[this._currentArrayPosition]
    this._elementForOutput = elementForOutput
  }

  generateTextOutput(){
    this._elementForOutput.innerHTML = ""
    return this._currentWord
      .map(item => {
        const p = document.createElement('p')
        p.id = item.id
        p.innerHTML = item.letter
        if(item.isHighlighted) {p.classList.add('highlighted-letter')}
        return this._elementForOutput.appendChild(p)
      })
  }
  
  /**
   * @param {string} key
   */
  listen(key){
    if(this._letterListen === this._currentWord.length) {
      this._currentWord = this._sanitizeArrayWords[++this._currentArrayPosition]
      this._letterListen = 0
      this.generateTextOutput()
      return
    }
    if(this._currentWord[this._letterListen].letter === key){
      this._currentWord[this._letterListen].isHighlighted = true
      this._letterListen++
      this.generateTextOutput()
    }
  }

}