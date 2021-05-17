const path = require("path");
const fs = require("fs-extra");
const sass = require("sass");
const postcss = require("postcss");
const cssnano = require("cssnano");
const { rollup } = require("rollup");
const virtual = require("@rollup/plugin-virtual");
const themes = require("../../static/js/themes");
const pkg = require('../../package.json');
const _ = require("lodash")
const prefixer = require('postcss-prefix-selector')

const toRootPrefix = "../../";
const fromRoot = (pathFromRoot) => toRootPrefix + pathFromRoot;
const filePath = (file) => path.join(__dirname, `${file}`);

const buildScss= async ({ distPath, minify }) => {
  fs.ensureDirSync(filePath(distPath + "/js"))

  const result = {};
  let lazyCode = "module.exports={";

  console.log("compiling...")

  for (let [key, value] of Object.entries(themes)) {
    // console.log(key, "start");

    let file = filePath(fromRoot(`src/themes/${value.file}`));
    console.log(`compiling: ${file}`);

    let res = sass.renderSync({ file, sourceMap: false });
    // console.log(result.css)
    let css = res.css.toString();

    // 所有选择器全部包一层 .markdown-body
    const out = await postcss()
      .use(prefixer({
        prefix: '.markdown-body',
        transform: function (prefix, selector, prefixedSelector) {
          if (selector.startsWith(prefix)) {
            return selector
          }
          if (selector === 'body' || selector === 'html') {
            return prefix;
          }
          return prefixedSelector;
        }
      }))
      .process(css, { from: undefined, hideNothingWarning: true })
    out.root.walk((node) => {
      if (
        node.type === "rule" &&
        node.selectors.some((s) => !s.startsWith(".markdown-body")) &&
        node.parent.name !== "keyframes" // allow keyframes
      ) {
        console.warning(`This selector should add .markdown-body prefix: ${node.selectors}`);
        // throw new Error('Style must be wrapped with .markdown-body');
      }
    });

    css = out.css
    let minCss =css
    if (minify === true) {
       minCss  = (await cssnano.process(css)).css
    }

    result[key] = { style: minCss, mode: value.mode };

    fs.writeFileSync(
      `${filePath(distPath)}/js/${key}.js`,
      `module.exports=${JSON.stringify(minCss)}`
    );
    lazyCode += `'${key}':{ style: () => import('./${key}') },`;

    // console.log(key, "end");
  }

  console.log("complie success")

  lazyCode += "}";

  // write index.js
  const up = await rollup({
    input: pkg.name,
    plugins: [
      virtual({
        [pkg.name]: "export default " + JSON.stringify(result, null, 2),
      }),
    ],
  });
  await up.write({
    format: "umd",
    name: _.camelCase(pkg.name),
    file: filePath(distPath + "/js/index.js"),
  });

  // write lazy.js
  fs.writeFileSync(filePath(distPath + "/js/lazy.js"), lazyCode);

  // gallery
  fs.writeFileSync(
    filePath(distPath + "/js/themes.js"),
    "window.themes=" + JSON.stringify(result)
  );
};

module.exports = {
  fromRoot, filePath, buildScss
}