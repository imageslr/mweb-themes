const path = require("path");
const fs = require("fs-extra");
const ejs = require("ejs");
const sass = require("sass");
const postcss = require("postcss");
const cssnano = require("cssnano");
const { rollup } = require("rollup");
const virtual = require("@rollup/plugin-virtual");
const themes = require("../../static/js/themes");
const pkg = require("../../package.json");
const _ = require("lodash");
const prefixer = require("postcss-prefix-selector");

// utils
const toRootPrefix = "../../";
const fromRoot = (pathFromRoot) => toRootPrefix + pathFromRoot;
const filePath = (file) => path.join(__dirname, `${file}`);

// const path
const templatePath = fromRoot("src/views/gallery.html");
const exampleMdPath = fromRoot("example.md");
const distPath = fromRoot("dist/gallery");

const run = async (args) => {
  await buildScss();
  await buildHtml();
};

const buildScss = async () => {
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

    // check external url
    const out = await postcss()
      .use(
        prefixer({
          prefix: ".markdown-body",
          transform: function (prefix, selector, prefixedSelector) {
            if (selector.startsWith(prefix)) {
              return selector;
            }
            if (selector === "body" || selector === "html") {
              return prefix;
            } else {
              return prefixedSelector;
            }
          },
        })
      )
      .process(css, { from: undefined, hideNothingWarning: true });
    out.root.walk((node) => {
      if (
        node.type === "rule" &&
        node.selectors.some((s) => !s.startsWith(".markdown-body")) &&
        node.parent.name !== "keyframes" // allow keyframes
      ) {
        console.log(node.selectors);
        // throw new Error('Style must be wrapped with .markdown-body');
      }
    });

    css = out.css;

    const { css: minCss } = await cssnano.process(css);

    result[key] = { style: minCss };

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

const buildHtml = () => {
  let data = encodeURI(fs.readFileSync(filePath(exampleMdPath)));
  let html = fs.readFileSync(filePath(templatePath), "utf-8");
  html = ejs.render(html, { data, watching: false });
  // console.log(html)
  fs.writeFileSync(`${filePath(distPath)}/index.html`, html);
};

module.exports.run = run;
