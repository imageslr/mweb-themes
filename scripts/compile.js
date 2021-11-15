// compile all themes, from scss to css

/**
 * 生成 mweb 3.x 主题 (只会处理 mweb-xxx.scss)：
 *  npm run compile
 *
 * 生成 mweb 4.x 主题 (只会处理 mweb-xxx.scss)：
 *  npm run compile -- --platform mweb4 --distDir dist/mweb4-themes
 *
 * 生成 typora 主题 (只会处理 typora-xxx.scss)：
 *  npm run compile -- --platform typora --distDir dist/typora-themes
 *
 */

const fs = require("fs-extra");
const sass = require("sass");
const path = require("path");
const minimist = require("minimist");
const sassExtract = require("sass-extract");
const themeConfig = require("../src/themes/config");
const { adjust } = require("./utils");
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
    filter: (filename) => /^mweb-/.test(filename), // 过滤需要编译的 scss 文件
    namer: (filename) => `${path.parse(filename).name}.css`, // scss 编译后写入的文件名
  },
  typora: {
    filter: (filename) => /^typora-/.test(filename),
    namer: (filename) => `${path.parse(filename).name}.css`,
  },
  mweb4: {
    filter: (filename) => /^mweb-/.test(filename),
    namer: (filename) => `${path.parse(filename).name}.mwebtheme`,
    compiler: compilerForMWeb4,
  },
};

async function compile({ filePath }) {
  let css = sass.renderSync({ file: filePath, sourceMap: false }).css;
  if (platformConfig[args.platform] && platformConfig[args.platform].postcss) {
    css = await platformConfig[args.platform].postcss(css);
  }
  return css;
}

function compilerForMWeb4({ filePath }) {
  let t = {
    blockCode: {
      isBold: false,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "09844f",
    },
    footnoteDef: {
      isBold: false,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "555555",
    },
    linkLink: {
      isBold: false,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "",
    },
    ol: {
      isBold: false,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "0595bf",
    },
    editor: {
      "app-row-content-color": "4c4c4c",
      "app-row-icon-color": "1996bc",
      "app-row-separator-color": "e0e0e2",
      currentLineBgColor: "f8f8f8",
      bgColor: "ffffff",
      caretColor: "00b9ff",
      color: "333333",
      "app-row-selected-bgColor": "1996bc",
      "app-row-info-color": "333333",
      selectionColor: "",
      selectionBgColor: "",
      "app-icon-color": "1996bc",
      "app-group-color": "7f7f7f",
      "app-group-bgColor": "efeff4",
      "app-row-bgColor": "ffffff",
      "app-row-title-color": "333333",
    },
    h1: {
      isBold: true,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "0595bf",
    },
    inlineCode: {
      isBold: false,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "09844f",
    },
    image: {
      isBold: false,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "0366dd",
    },
    h2: {
      isBold: true,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "0595bf",
    },
    table: {
      isBold: false,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "333333",
    },
    h3: {
      isBold: true,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "0595bf",
    },
    link: {
      isBold: false,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "0366dd",
    },
    strikethrough: {
      isBold: false,
      isItalic: false,
      isStrikethrough: true,
      isUnderline: false,
      color: "999999",
    },
    h4: {
      isBold: true,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "0595bf",
    },
    footnoteRef: {
      isBold: false,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "555555",
    },
    isAutoGenCSS: false,
    "codeblock-string": {
      isBold: false,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "d32d26",
    },
    "codeblock-preprocessor": {
      isBold: false,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "784830",
    },
    h5: {
      isBold: true,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "0595bf",
    },
    underline: {
      isBold: false,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: true,
      color: "1a1a1a",
    },
    inlineHTML: {
      isBold: false,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "555555",
    },
    strong: {
      isBold: true,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "333333",
    },
    blockHTML: {
      isBold: false,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "555555",
    },
    "codeblock-attribute": {
      isBold: false,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "967d41",
    },
    h6: {
      isBold: true,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "0595bf",
    },
    quote: {
      isBold: false,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "bbbbbb",
    },
    "codeblock-keyword": {
      isBold: false,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "bc319c",
    },
    ul: {
      isBold: false,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "0595bf",
    },
    "codeblock-comment": {
      isBold: false,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "008327",
    },
    emph: {
      isBold: false,
      isItalic: true,
      isStrikethrough: false,
      isUnderline: false,
      color: "333333",
    },
    "codeblock-character": {
      isBold: false,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "2834ce",
    },
    "codeblock-number": {
      isBold: false,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "2834ce",
    },
    hr: {
      isBold: false,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "555555",
    },
  };
  const css = sass.renderSync({ file: filePath }).css;
  const themeName = filePath.match(/mweb-(.*)\.scss$/)[1]; // eg: ayu, lark, etc.
  const isMWeb4EditorThemeCompatible =
    themeConfig[themeName].isMWeb4EditorThemeCompatible;

  if (isMWeb4EditorThemeCompatible) {
    // sass-extract 有 bug，import 优先级不正确，算出来的 final value 不正确，都是 bear-default.scss 里定义的。
    // 所以这里不解析入口文件，只计算 bear-palettes 里的变量值。
    const rendered = (() => {
      let variablePath = `bear-palettes/${themeName}`;
      // 简单的适配几个特殊主题
      switch (themeName) {
        case "bear-default":
          variablePath = `bear-palettes/default`;
          break;
        case "lark-bold-color":
        case "lark":
          variablePath = `mweb-lark`; // 这个可以直接解析入口文件，因为没有 import bear-default.scss
          break;
        default:
          break;
      }
      return sassExtract.renderSync({
        file: `${args.themeDir}/${variablePath}.scss`,
      });
    })();
    const getColor = (variable, defaultValue) => {
      try {
        return rendered.vars.global[variable].value.hex.slice(1);
      } catch (err) {
        if (defaultValue) return defaultValue;
        throw err;
      }
    };
    const isDark = themeConfig[themeName].mode == "dark";
    t.editor.bgColor = getColor("$body-bg-color"); // 编辑器背景
    t.editor.caretColor = getColor("$font-color"); // 编辑器光标
    t.editor.color = getColor("$font-color"); // 编辑器文字
    // t.editor.selectionBgColor // 编辑器选择的文字的颜色
    // t.editor.selectionColor   // 编辑器选择的文字的背景颜色
    t.editor.currentLineBgColor = adjust(
      getColor("$body-bg-color"),
      isDark ? 10 : -10
    ).slice(1); // 编辑器当前行的背景颜色
    let headColor = getColor("$head-color", getColor("$font-color")); // 标题 1～6
    t.h1.color = headColor;
    t.h2.color = headColor;
    t.h3.color = headColor;
    t.h4.color = headColor;
    t.h5.color = headColor;
    t.h6.color = headColor;
    t.link.color = getColor("$link-color"); // 链接文本
    t.linkLink.color = getColor("$link-color"); // 链接
    t.image.color = getColor("$link-color"); // 图片语法
    t.ol.color = getColor("$primary-color"); // 有序列表
    t.ul.color = getColor("$primary-color"); // 无序列表
    t.quote.color = getColor("$primary-color"); // 引用
    t.strikethrough.color = getColor(
      "$del-font-color",
      getColor("$font-color")
    ); // 删除线
    t.strong.color = getColor("$accent-color", getColor("$primary-color")); // 加粗
    t.emph.color = getColor("$accent-color", getColor("$primary-color")); // 斜体
    t.hr.color = getColor("$border-color"); // 分割线
    t.inlineCode.color = getColor("$code-font-color", getColor("$font-color")); // 行内代码
    t.blockCode.color = getColor("$code-font-color", getColor("$font-color")); // 代码块
    t.table.color = getColor("$code-font-color", getColor("$font-color")); // 表格
    t.inlineHTML.color = adjust(
      getColor("$font-color"),
      isDark ? 80 : -80
    ).slice(1); // 行内 HTML
    t.blockHTML.color = adjust(
      getColor("$font-color"),
      isDark ? 80 : -80
    ).slice(1); // HTML 块
    t.footnoteDef.color = adjust(
      getColor("$code-font-color", getColor("$font-color")),
      isDark ? 80 : -80
    ).slice(1); // 脚注定义
    t.footnoteRef.color = getColor("$link-color"); // 脚注引用
    t["codeblock-number"].color = getColor("$prism-color-number");
    t["codeblock-comment"].color = getColor("$prism-color-comment");
    t["codeblock-keyword"].color = getColor("$prism-color-keyword");
    t["codeblock-attribute"].color = getColor("$prism-color-attr-name");
    t["codeblock-character"].color = getColor("$prism-color-char");
    t["codeblock-string"].color = getColor("$prism-color-selector");
    t["codeblock-preprocessor"].color = getColor("$prism-color-selector");
  }

  let editorThemeStr = JSON.stringify(t, null, 2);
  // 每个 key 后面加一个空格
  editorThemeStr = editorThemeStr.replace(/"(.*)":/g, '"$1" :');

  return `${editorThemeStr}



=============================================



${css}`;
}

function writeFile({ filePath, css }) {
  const { namer } = platformConfig[args.platform];
  const filename = path.basename(filePath);
  const outFile = `${args.distDir}/${namer(filename)}`;
  fs.writeFile(outFile, css, (error) => {
    if (error) {
      console.log(`写入文件失败：${outFile}`, error);
      process.exit(1);
    } else console.log(`输出：${outFile}`);
  });
}

function main() {
  fs.removeSync(args.distDir);
  fs.ensureDirSync(args.distDir);

  const cfg = platformConfig[args.platform];
  const files = args.file
    ? [args.file]
    : fs
        .readdirSync(args.themeDir)
        .filter((filename) => filename.match(/\.scss/))
        .filter(cfg.filter)
        .map((file) => `${args.themeDir}/${file}`);

  files.forEach(async (filePath) => {
    try {
      console.log(`编译中：${filePath}`);
      let css = cfg.compiler
        ? await cfg.compiler({ filePath })
        : await compile({ filePath });
      writeFile({ filePath, css });
    } catch (err) {
      console.log("sass 编译失败：", err);
      process.exit(1);
    }
  });
}

main();
