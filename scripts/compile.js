// compile all themes, from scss to css

const fs = require("fs-extra");
const sass = require("sass");
const path = require("path");
const { setContainerSelector, wrapSelector } = require("./gallery/utils");
const minimist = require("minimist");

const args = minimist(process.argv.slice(2), {
  string: ["file", "platform", "themeDir", "distDir"],
  default: {
    platform: "mweb", // juejin, typora
    themeDir: "src/themes",
    distDir: "dist/themes",
  },
});

const platformConfig = {
  mweb: {
    filter: (filename) => /^mweb-/.test(filename),
    namer: (filename) => `${path.parse(filename).name}.css`,
  },
  typora: {
    filter: (filename) => /^typora-/.test(filename),
    namer: (filename) => `${path.parse(filename).name}.css`,
    postcss: async (css) => wrapSelector({ css, prefix: "#write" }),
  },
};

let compile = async ({ filePath }) => {
  try {
    console.log(`编译中：${filePath}`);
    fs.ensureDirSync(args.distDir);
    let css = sass.renderSync({ file: filePath, sourceMap: false }).css;
    if (
      platformConfig[args.platform] &&
      platformConfig[args.platform].postcss
    ) {
      css = await platformConfig[args.platform].postcss(css);
    }
    return css;
  } catch (err) {
    console.log("sass 编译失败：", err);
    process.exit(1);
  }
};

const writeFile = ({ filePath, css }) => {
  const { namer } = platformConfig[args.platform];
  const filename = path.basename(filePath);
  const outFile = `${args.distDir}/${namer(filename)}`;
  fs.writeFile(outFile, css, (error) => {
    if (error) console.log(`写入文件失败：${outFile}`);
    else console.log(`输出：${outFile}`);
  });
};

fs.removeSync(args.distDir);

const cfg = platformConfig[args.platform];

const files = args.file
  ? [args.file]
  : fs
      .readdirSync(args.themeDir)
      .filter((filename) => filename.match(/\.scss/))
      .filter(cfg.filter)
      .map((file) => `${args.themeDir}/${file}`);

files.forEach(async (filePath) => {
  const css = await compile({ filePath });
  writeFile({ filePath, css });
});
