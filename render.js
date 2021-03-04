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
  typeText('', handleClick)
}
if (window.obsstudio || new URLSearchParams(location.search).get('force') !== null) {
  main()
} else {
  const textboxContainer = document.getElementById('textboxContainer')
  textboxContainer.style.backgroundImage = 'none'
  textboxContainer.style.color = 'black'
  const computedStyle = window.getComputedStyle(textboxContainer)
  document.getElementById('width').innerText = computedStyle.width.replace('px', '')
  document.getElementById('height').innerText = computedStyle.height.replace('px', '')
}
