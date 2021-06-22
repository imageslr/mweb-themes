/**
 * npm run gallery-watch
 */

const koa = require("koa");
const koaRouter = require("koa-router");
const views = require("koa-views");
const statics = require("koa-static");
const http = require("http");
const socketio = require("socket.io");
const chokidar = require("chokidar");
const fs = require("fs-extra");
const { fromRoot, filePath, buildScss } = require('./utils')

// const path
const templatePath = fromRoot("src/views/gallery.html");
const exampleMdPath = fromRoot("example.md");
const distPath = fromRoot("dist/gallery");
const scssDir = fromRoot("src/themes")

const app = new koa();
const router = new koaRouter();
let socketItem;

const run = async (args) => {
  await buildScss({ distPath, minify: false });
  serve();
  sync();
  watch();
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
