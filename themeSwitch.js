const switchTheme = document.querySelector('.switch-theme')
const mainDiv = document.querySelector('main')
const moon = document.querySelector('.moon')
const sun = document.querySelector('.sun')

const themes = {
  'light-theme': () => {
    mainDiv.classList.value = ''
    mainDiv.classList.add('dark-theme')
    sun.style.display = 'none'
    moon.style.display = 'block'

  },
  'dark-theme': () => {
    mainDiv.classList.value = ''
    mainDiv.classList.add('light-theme')
    sun.style.display = 'block'
    moon.style.display = 'none'
  }
}

switchTheme.addEventListener('click', () => {
  const classes = mainDiv.classList.value.split(' ')
  classes.map(classCSS => {
    themes[classCSS] && themes[classCSS]() 
  })
})