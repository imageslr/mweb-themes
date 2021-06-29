const fs = require("fs-extra")

/**
 * usage:
 *   node tools/bear.js
 */

const bearThemes = [
  "ayu",
  "ayu-mirage",
  "charcoal",
  "cobalt",
  "contrast",
  "d-boring",
  "dark-graphite",
  "dieci",
  "dracula",
  "duotone-heat",
  "duotone-light",
  "gandalf",
  "gotham",
  "lighthouse",
  "nord",
  "olive-dunk",
  "panic",
  "red-graphite",
  "solarized-dark",
  "solarized-light",
  "toothpaste",
]

const themeDir = "src/themes"

bearThemes.forEach((themeName) => {
  console.log("themeName: ", themeName)
  fs.ensureDirSync(themeDir)
  let fp = themeDir + `/mweb-${themeName}.scss`
  try {
    fs.writeFileSync(fp, getMwebContent(themeName));
    console.log("generate: ", fp);
  } catch (e) {
    console.log(`写入文件失败：${fp}`, e);
  }
  try {
    fp = themeDir + `/typora-${themeName}.scss`
    fs.writeFileSync(fp, getTyporaContent(themeName));
    console.log("generate: ", fp);
  } catch (e) {
    console.log(`写入文件失败：${fp}`, e);
  }
});

function getMwebContent(theme) {
  return `@import "prism-themes/default.scss";
@import "variables/bear-default.scss";
@import "bear-palettes/${theme}.scss";
@import "core/mweb-bear.scss";`
}


function getTyporaContent(theme) {
  return `@import "variables/typora-bear-default.scss";
  @import "bear-palettes/${theme}.scss";
  @import "core/typora-bear.scss";;`
}