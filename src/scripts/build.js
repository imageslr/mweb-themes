const fs = require('fs')
const sass = require("sass")

const themeDir = 'themes'
const distDir = '../themes'

let build = () => {
  fs.readdirSync(themeDir).forEach(filename => {
    if (!filename.match(/\.scss/)) return
    const file = `themes/${filename}`
    const outFile = `${distDir}/${filename.substr(0, filename.length - 5)}.css`
    try {
      console.log(`编译中：${file}`)
      let result = sass.renderSync({ file, outFile, sourceMap: false });
      fs.writeFile(outFile, result.css, error => {
        if (error) console.log(`写入文件失败：${outFile}`);
        else console.log(`输出：${outFile}`);
      });
    } catch (err) {
        console.log("sass 编译失败：", err);
    }
  });
}

build()