#!/usr/bin/env node

const koa = require('koa');
const koaRouter = require('koa-router');
const views = require('koa-views');
const statics = require('koa-static');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const child_process = require('child_process');
const chokidar = require('chokidar');
const fs = require('fs');

const defaultThemePath = 'themes/mweb-default.scss'
const outputPath = 'static/mweb.css'
const watchPath = 'static/*.css'
const staticDir = 'static'

// 实例化 koa 和路由
const app = new koa();
const router = new koaRouter();

let socketItem;
const filePath = file => path.join(__dirname, `${file}`);

let isExisted = async function (filePath) {
  return new Promise((resolve, reject) => {
    fs.access(filePath, (err) => {
      err ? reject(false) : resolve(true);
    });
  }).catch(err => err);
};

async function run(args) {
  let fileName = ''
  let tempFilePath = '';
  if (args.length > 0) {
    fileName = args[0]
    console.log(`当前使用主题：${fileName}`);
  } else {
    fileName = defaultThemePath
    console.log(`当前使用主题：${fileName}`);
    console.log('如需指定主题文件，请执行：\x1B[96mnpm run dev <theme_file_path>\x1B[39m\n');
  }

  tempFilePath = path.resolve(__dirname, fileName);
  if (!await isExisted(tempFilePath)) {
    console.error('未能读取正确的样式文件，请检查文件名和路径是否正确');
    return;
  }

  watchFile(tempFilePath);
  koaServer();

  console.log('\x1B[32m监听主题文件更改中...\x1B[39m\n');

  const server = http.createServer(app.callback());
  const io = socketio(server);
  io.on('connection', socket => { socketItem = socket; });

  server.listen(3000, () => { console.log('在浏览器中打开: \x1B[96mhttp://localhost:3000\x1B[39m'); });
}

function watchFile(file) {

  // 启用子线程执行 scss 监听
  const execCmd = `npx sass --watch ${file}:${path.resolve(__dirname, outputPath)}`;
  child_process.exec(execCmd);

  // 监听编译后的文件变化
  const watcherFile = chokidar.watch([filePath(watchPath)], {});
  watcherFile.on('change', path => { app.emit('change'); });
}

function koaServer() {
  let changing = false;
  // 静态文件服务 & 模板服务
  app.use(statics(filePath(staticDir)));
  app.use(views(filePath('./'), { map: { html: 'ejs' } }));

  // 路由
  router.get('/', async ctx => { await ctx.render('index'); });

  app.on('change', async () => {
    if (!changing) {
      socketItem.emit('reload');
      changing = true;
      let st = setTimeout(() => {
        changing = false;
        clearTimeout(st);
      }, 2000);
    }
  });

  app.use(router.routes());
  app.use(router.allowedMethods());
}

run(process.argv.slice(2));