## 开发主题

本项目提供了一个标准样式模板，可以通过设置变量（颜色、字号等）的方式快速开发一个新的**预览主题**。

可以从其他工具 / 平台的主题中获取灵感：
* 掘金的主题：https://github.com/xitu/juejin-markdown-themes
* typora 的主题：http://theme.typora.io/
* Hexo 的主题：https://hexo.io/themes/
* ...

欢迎贡献新的主题 🎉 ！


### 目录结构

```
example.md                    // 预览模板
src
├── views                     // HTML
└── themes                    // 主题目录
    ├── bear-palettes/        // bear 不同主题的配色方案
    ├── core/                 // 基础样式模板
    ├── prism-themes/         // prism 代码高亮主题
    ├── variables/            // 不同主题的 scss 变量
    ├── mweb-xxx.scss         // mweb 主题
    └── typora-xxx.scss       // typora 主题
```

### 安装

环境：node v12 及以上。

```
# 克隆本仓库
git clone imageslr/mweb-themes 

# 进入此目录
cd mweb-themes

# 安装依赖
npm install
```

### 运行

```
# 编译并预览 mweb 主题：
npm run watch <theme_file_path>

# 编译并预览 typora 主题： 
npm run typora-watch <theme_file_path>
```

`<theme_file_path>` 是主题文件的路径，例如 `src/themes/mweb-default.scss`。运行后，终端会输出一个地址，例如 `http://localhost:3000`。在浏览器中打开，即可预览主题。之后更改主题文件，浏览器会实时刷新。

### 新增主题

1. 在 `src/themes` 目录下创建新的主题文件 `mweb-xxx.scss` 或 `typora-xxx.scss`
2. 编写样式内容
3. 如果是 MWeb 主题，还需要在 `src/themes/config.js` 中增加主题配置项

### 生成 CSS 文件

代码使用 SCSS 编写，需要编译为 `.css` 文件才能在 MWeb 或 Typora 中使用：

```
npm run compile # 生成 MWeb 的 css 文件
npm run compile -- --platform typora --distDir dist/typora # 生成 Typora 的 css 文件
```

参数：
- `--file`：编译特定的主题文件，默认为空，即生成所有主题文件
- `--themeDir`：主题文件所在目录，默认为 `src/themes`
- `--distDir`：生成的 CSS 文件所在目录，默认为 `dist/themes`
- `--platform`：生成哪个平台的主题，默认为 `mweb` (处理 `mweb-xxx.scss`)，支持 `typora` (处理 `typora-xxx.scss`)

注意：传递参数时，必须添加 `--` 分隔符。

## Q & A

### 如何自定义代码块的主题？

MWeb 使用 PrismJS 来高亮代码块中的语法，可以自己查找 PrismJS 主题并配置颜色代码。

1. 在 [PrismJS 官网](https://prismjs.com/) 选择一个主题，进入[下载页](https://prismjs.com/download.html)查看其 CSS 代码（拉到下载页底部就可以看到）
2. 在 `themes/prism-themes` 目录下创建文件 `xxx.scss`
3. 按需更改[颜色代码](src/themes/prism-themes/default.scss)
4. 更改 `mweb-xxx.scss` 中引用的 prism 主题文件
   
社区提供的 PrismJS 主题：
* [Github - PrismJS/prism-themes](https://github.com/PrismJS/prism-themes)
* [最佳 Prism.js 代码高亮主题集合](https://ourcodeworld.com/articles/read/477/collection-of-the-best-open-source-prism-js-code-highlight-themes)

### 代码块语法没有正确高亮？

这是因为 MWeb 3.x 使用了基础版的 PrismJS，只支持部分语言，需要自行更新。

1. 前往 [PrismJS 官网](https://prismjs.com/download.html)，在 `Languages` 下方勾选 `Select/unselect all`，然后拉到底部点击 `Download JS`
2. 把下载的 `prism.js` 文件移动到 `/Applications/MWeb.app/Contents/Resources/PreviewAsset/prism` 文件夹
3. 重启 MWeb

### 如何自定义 MWeb 编辑器主题？

编辑器主题是 `.style` 文件，内容和 CSS 大同小异，请自行更改。
