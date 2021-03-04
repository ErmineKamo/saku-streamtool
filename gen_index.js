const fs = require('fs')
const scripts = ['Tsubasa', 'Hane', 'Saku']
let out = ''
for (const i of scripts) {
  out += `<h1>${i}</h1>`
  for (const file of fs.readdirSync(`scripts/${i}`)) {
    out += '<a href="render.html?file='
    out += encodeURIComponent(`scripts/${i}/${file}`)
    out += `">${file.replace('.txt', '')}</a><br>`
  }
}
fs.writeFileSync('index.html', out, 'utf-8')
