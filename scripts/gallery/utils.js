const path = require("path");
const fs = require("fs-extra");
const sass = require("sass");
const postcss = require("postcss");
const cssnano = require("cssnano");
const { rollup } = require("rollup");
const virtual = require("@rollup/plugin-virtual");
const pkg = require("../../package.json");
const _ = require("lodash");
const prefixer = require("postcss-prefix-selector");

const toRootPrefix = "../../";
const fromRoot = (pathFromRoot) => toRootPrefix + pathFromRoot;
const filePath = (file) => path.join(__dirname, `${file}`);

const themes = require(fromRoot("src/themes/config"));

const buildScss = async ({ distPath, minify }) => {
  fs.ensureDirSync(filePath(distPath + "/js"));

  const result = {};
  let lazyCode = "module.exports={";

  console.log("compiling...");

  for (let [key, value] of Object.entries(themes)) {
    // console.log(key, "start");

    let file = filePath(fromRoot(`src/themes/${value.file}`));
    console.log(`compiling: ${file}`);

    let res = sass.renderSync({ file, sourceMap: false });
    // console.log(result.css)
    let css = res.css.toString();

    css = await wrapSelector({
      css: await setContainerSelector({ css, selector: ".markdown-body" }),
      prefix: ".markdown-body",
    })

    let minCss = css;
    if (minify === true) {
      minCss = (await cssnano.process(css)).css;
    }

    result[key] = { style: minCss, mode: value.mode };

    fs.writeFileSync(
      `${filePath(distPath)}/js/${key}.js`,
      `module.exports=${JSON.stringify(minCss)}`
    );
    lazyCode += `'${key}':{ style: () => import('./${key}') },`;

    // console.log(key, "end");
  }

  console.log("complie success");

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

// 选择器中的 CONTAINER_SELECTOR 换成 selector 
const setContainerSelector = async ({ css, selector }) => {
  const out = await postcss()
    .use(
      prefixer({
        prefix: selector,
        transform: function (prefix, selector, prefixedSelector) {
          return selector.replace("CONTAINER_SELECTOR", prefix)
        },
      })
    )
    .process(css, { from: undefined, hideNothingWarning: true });
  return out.css
}

// 所有选择器全部包一层 prefix; html, body 换成 prefix; 
const wrapSelector = async ({ css, prefix }) => {
  const out = await postcss()
    .use(
      prefixer({
        prefix,
        transform: function (prefix, selector, prefixedSelector) {
          if (selector.indexOf(prefix) != -1) {
            return selector;
          }
          if (selector === "body" || selector === "html") {
            return prefix;
          }
          return prefixedSelector;
        },
      })
    )
    .process(css, { from: undefined, hideNothingWarning: true });
  out.root.walk((node) => {
    if (
      node.type === "rule" &&
      node.selectors.some((s) => s.indexOf(prefix) == -1) &&
      node.parent.name !== "keyframes" // allow keyframes
    ) {
      console.warn(
        `This selector should add '${prefix}' selector: ${node.selectors}`
      );
      // throw new Error('Style must be wrapped with .markdown-body');
    }
  });
  return out.css;
};

module.exports = {
  fromRoot,
  filePath,
  buildScss,
  setContainerSelector,
  wrapSelector
};
