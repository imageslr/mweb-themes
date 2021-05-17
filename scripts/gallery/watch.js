const koa = require("koa");
const koaRouter = require("koa-router");
const views = require("koa-views");
const statics = require("koa-static");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const chokidar = require("chokidar");
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

// utils
const toRootPrefix = "../../";
const fromRoot = (pathFromRoot) => toRootPrefix + pathFromRoot;
const filePath = (file) => path.join(__dirname, `${file}`);

// const path
const templatePath = fromRoot("src/views/gallery.html");
const exampleMdPath = fromRoot("example.md");
const distPath = fromRoot("dist/gallery");
const scssDir = fromRoot("src/themes")

const app = new koa();
const router = new koaRouter();
let socketItem;

const run = async (args) => {
  await build();
  serve();
  sync();
  watch();
};

const build = async () => {
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

    // check external url
    const out = await postcss()
      .use(prefixer({
        prefix: '.markdown-body',
        transform: function (prefix, selector, prefixedSelector) {
          if (selector.startsWith(prefix)) {
            return selector
          }
          if (selector === 'body' || selector === 'html') {
            return prefix;
          } else {
            return prefixedSelector;
          }
        }
      }))
      .process(css, { from: undefined, hideNothingWarning: true })
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

    css = out.css

    const { css: minCss } = await cssnano.process(css);

    result[key] = { style: minCss };

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

const watch = () => {
  chokidar
    .watch([filePath(templatePath), filePath(exampleMdPath)], {})
    .on("change", (_) => {
      app.emit("change");
    });

  chokidar
    .watch([filePath(scssDir)], {})
    .on("change", async (_) => {
      await build()
      app.emit("change");
    });
};

const serve = () => {
  // 静态文件服务 & 模板服务
  app.use(statics(filePath(distPath)));
  app.use(views(filePath("./"), { map: { html: "ejs" } }));

  let data = encodeURI(fs.readFileSync(filePath(exampleMdPath)));

  // 路由
  router.get("/", async (ctx) => {
    await ctx.render(templatePath, { data, watching: true });
  });

  app.on("change", async () => {
    data = encodeURI(fs.readFileSync(filePath(exampleMdPath)));
    socketItem && socketItem.emit("reload");
  });

  app.use(router.routes());
  app.use(router.allowedMethods());
};

const sync = () => {
  const server = http.createServer(app.callback());
  const io = socketio(server);
  io.on("connection", (socket) => {
    socketItem = socket;
  });
  server.listen(3001, () => {
    console.log("在浏览器中打开: \x1B[96mhttp://localhost:3001\x1B[39m");
  });
};

module.exports.run = run;
