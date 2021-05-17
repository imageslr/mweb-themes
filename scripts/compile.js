// compile all themes, from scss to css

const fs = require('fs')
const sass = require("sass")
const path = require("path")

const themeDir = 'src/themes'
const distDir = 'dist/themes'

let compileAll = () => {
  fs.readdirSync(themeDir).forEach(file => compileOne(`${themeDir}/${file}`));
}

let compileOne = filePath => {
  if (!filePath.match(/\.scss/)) return
  const fileName = path.basename(filePath)
  const outFile = `${distDir}/${fileName.substr(0, fileName.length - 5)}.css`
  try {
    console.log(`编译中：${filePath}`)
    let result = sass.renderSync({ file: filePath, outFile, sourceMap: false });
    fs.writeFile(outFile, result.css, error => {
      if (error) console.log(`写入文件失败：${outFile}`);
      else console.log(`输出：${outFile}`);
    });
  } catch (err) {
      console.log("sass 编译失败：", err);
      process.exit(1);
  }
}

let args = process.argv.slice(2)
if (args.length > 0) {
  fileName = args[0]
  compileOne(fileName)
} else {
  compileAll()
}