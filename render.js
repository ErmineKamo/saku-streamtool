/* eslint-env browser */
const speed = 30
function typeText (text, blockHandler) {
  const textbox = document.getElementById('textbox')
  textbox.innerText = ''
  let i = 0
  function typeInner () {
    document.body.removeEventListener('click', blockHandler)
    if (i < text.length) {
      textbox.textContent += text[i]
      i++
      setTimeout(typeInner, speed)
    } else {
      document.body.addEventListener('click', blockHandler)
    }
  }
  typeInner()
}

async function main () {
  const script = (
    await (
      await fetch(new URLSearchParams(location.search).get('file'))).text()
  ).split('\n').filter(x => x.trim())
  let currentLine = 0
  function handleClick () {
    typeText(script[currentLine], handleClick)
    currentLine++
  }
  typeText('Click to begin...', handleClick)
}
if (window.obsstudio || new URLSearchParams(location.search).get('force') !== null) {
  main()
} else {
  const textbox = document.getElementById('textbox')
  textbox.style.backgroundImage = 'none'
  textbox.style.color = 'black'
  const computedStyle = window.getComputedStyle(textbox)
  document.getElementById('width').innerText = computedStyle.width.replace('px', '')
  document.getElementById('height').innerText = computedStyle.height.replace('px', '')
}
