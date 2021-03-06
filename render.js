/* eslint-env browser */
const speed = 30
function typeText (text, blockHandler) {
  document.getElementById('textboxContainer').style.color = 'white'
  const textboxRoot = document.getElementById('textbox') // The actual textbox element
  let textbox = textboxRoot // The element where text is actually being output (may be child)
  textbox.innerText = ''
  let i = 0
  function typeInner () {
    document.body.removeEventListener('click', blockHandler)
    if (i < text.length) {
      const colorHex = text.substring(i + 1, i + 7)
      if (text[i] === '#' && colorHex.match(/[0-9a-fA-F]{6}/)) {
        const colorSpan = document.createElement('span')
        colorSpan.style.color = `#${colorHex}`
        textboxRoot.appendChild(colorSpan)
        textbox = colorSpan
        i += 6
      } else {
        textbox.textContent += text[i]
      }
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
  let maxLine = 0
  function handleClick () {
    currentLine = maxLine
    typeText(script[currentLine], handleClick)
    currentLine++
    maxLine++
  }
  document.body.addEventListener('wheel', event => {
    document.getElementById('textboxContainer').style.color = 'yellow'
    if (event.deltaY < 0) {
      currentLine--
    } else if (currentLine < maxLine) {
      currentLine++
    }
    if (currentLine < 0) currentLine = 0
    document.getElementById('textbox').textContent = script[currentLine]
  })
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
