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
3. 在 `src/themes/mweb-config.js` 或 `src/themes/typora-config.js` 中增加主题配置项

### 生成 CSS 文件

代码使用 SCSS 编写，需要编译为 `.css` 文件才能在 MWeb 或 Typora 中使用：

```
npm run compile # 生成 MWeb3 的 css 文件
npm run compile -- --platform mweb4 --distDir dist/mweb4 # 生成 MWeb 4.2+ 的 mwebtheme 文件
npm run compile-mweb4 # 等同于上一条命令
npm run compile -- --platform typora --distDir dist/typora # 生成 Typora 的 css 文件
npm run compile-typora # 等同于上一条命令
```

参数：
- `--file`：编译特定的主题文件，默认为空，即生成所有主题文件
- `--themeDir`：主题文件所在目录，默认为 `src/themes`
- `--distDir`：生成的 CSS 文件所在目录，默认为 `dist/themes`
- `--platform`：生成哪个平台的主题，默认为 `mweb3` (处理 `mweb-xxx.scss`)，可选 `mweb4`、`typora` (处理 `typora-xxx.scss`)

注意：传递参数时，必须添加 `--` 分隔符。

## MWeb 主题开发
1. 代码块：`pre code[class*="language-"]`
2. 代码块语法颜色：见 `prism.scss`

## Typora 主题开发
注意事项：
1. 所有样式内容放在 `#write` 块内
2. 代码块：

    ```scss
    pre.md-fences,
    pre.md-meta-block,
    .md-rawblock-control:not(.md-rawblock-tooltip) .md-rawblock-input {
        color: #f8f8f2;
        background: #272822;
        font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
        font-size: 1em;
    }
    ```

3. 代码块指针颜色：`.CodeMirror div.CodeMirror-cursor { border-color: $font-color; }`
4. 代码块语法颜色：见 `typora-bear.scss` → `.cm-s-inner {}`

    ```scss
    // 代码高亮 CodeMirror
    .cm-s-inner {
        // .cm-meta ?
        // .cm-hr ?
        // .cm-link ?

        .cm-comment {
            color: $prism-color-comment;
        }

        .cm-property,
        .cm-tag { // html tag，需要在 bracket 之前
            color: $prism-color-property;
        }

        .cm-bracket, // <、>
        .cm-punctuation {
            color: $prism-color-punctuation;
        }

        .cm-number {
            color: $prism-color-number;
        }

        .cm-qualifier, // css selector
        .cm-string, .cm-string-2, // 2 什么意思？
        .cm-builtin {
            color: $prism-color-selector;
        }

        .cm-attribute {
            color: $prism-color-attr-name;
        }

        .cm-operator {
            color: $prism-color-operator;
        }

        .cm-atom, // null, true, false
        .cm-keyword {
            color: $prism-color-keyword;
        }

        .cm-def, // 变量声明语句中的变量名
        .cm-variable,
        .cm-variable-2, .cm-variable-3 { // 2, 3 什么含义？
            color: $prism-color-variable;
        }

        .cm-type { // type 什么含义？
            color: darken($prism-color-variable, 25%);
        }
    }
    ```

5. 任务列表：
    
    ```scss
    $primary-color: #353535;  // 复选框选中时的背景颜色，建议和加粗字体的颜色一致
    $del-font-color: #525252; // 复选框选中时的字体颜色
    $body-bg-color: white;    // 复选框未选中时的背景颜色
    $border-color: #bfbfbf;   // 复选框未选中时的边框颜色，建议和表格边框的颜色一致

    // task list
    .task-list-item {
        padding-left: 0.3rem
        list-style-type: none;;

        > p {
            transition: color 0.3s, opacity 0.3s;
        }

        &.task-list-done > p {
            color: $del-font-color;
            text-decoration: line-through;

            > .md-emoji {
            opacity: .5;
            }

            > .md-link > a {
            opacity: .6;
            }
        }

        > input {
            -webkit-appearance: initial;
            display: block;
            position: absolute;
            border: 1px solid $border-color;
            border-radius: .25rem;
            // margin-top: .1rem;
            margin-left: -1.5rem;
            height: 1.2rem;
            width: 1.2rem;
            transition: border-color 0.3s;
            background-color: $body-bg-color;
        }

        > input:focus {
            outline: none;
            box-shadow: none;
        }

        > input:hover {
            border-color: $primary-color;
        }

        > input[checked] {
            &::before {
            content: '';
            position: absolute;
            top: 20%;
            left: 50%;
            height: 60%;
            width: 2px;
            transform: rotate(40deg);
            background: $primary-color;
            }

            &::after {
            content: '';
            position: absolute;
            top: 46%;
            left: 25%;
            height: 30%;
            width: 2px;
            transform: rotate(-40deg);
            background: $primary-color;
            }
        }
    }
    ```

6. 

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
