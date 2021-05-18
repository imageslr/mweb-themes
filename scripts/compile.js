// compile all themes, from scss to css

const fs = require("fs-extra");
const sass = require("sass");
const path = require("path");
const { wrapSelector } = require("./gallery/utils");
const minimist = require("minimist");

const args = minimist(process.argv.slice(2), {
  string: ["file", "platform", "themeDir", "distDir"],
  default: {
    platform: "mweb",
    themeDir: "src/themes",
    distDir: "dist/themes",
  },
});

const platformConfig = {
  default: {
    namer: (filename) => `${path.parse(filename).name}.css`,
    wrap: false
  },
  mweb: {
    namer: (filename) => `${path.parse(filename).name}.css`,
    wrap: false
  },
  juejin: {
    namer: (filename) => 
    `${path.parse(filename).name.replace(/^(mweb-)/, "")}.css`, // 替换 mweb- 前缀
    wrap: true
  },
  typora: {
    namer: (filename) => 
    `${path.parse(filename).name.replace(/^(mweb-)/, "")}.css`,
    wrap: true
  }
}

let compile = async ({ filePath }) => {
  try {
    console.log(`编译中：${filePath}`);
    fs.ensureDirSync(args.distDir);
    let css = sass.renderSync({ file: filePath, sourceMap: false }).css;
    if (platformConfig[args.platform] && platformConfig[args.platform].wrap) {
      css = await wrapSelector(css);
    }
    return css;
  } catch (err) {
    console.log("sass 编译失败：", err);
    process.exit(1);
  }
};

const writeFile = ({ filePath, css }) => {
  const { namer } = platformConfig[args.platform] || platformConfig.default;
  const filename = path.basename(filePath);
  const outFile = `${args.distDir}/${namer(filename)}`;
  fs.writeFile(outFile, css, (error) => {
    if (error) console.log(`写入文件失败：${outFile}`);
    else console.log(`输出：${outFile}`);
  });
};

fs.removeSync(args.distDir)

const files = args.file
  ? [args.file]
  : fs
      .readdirSync(args.themeDir)
      .filter((filename) => filename.match(/\.scss/))
      .map((file) => `${args.themeDir}/${file}`);

files.forEach(async (filePath) => {
  const css = await compile({ filePath });
  writeFile({ filePath, css });
});
