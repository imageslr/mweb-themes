
## 欢迎贡献新的主题 🎉 ！

## 安装与运行

环境：node v12 及以上。

```
# 克隆本仓库
git clone imageslr/mweb-themes 

# 进入此目录
cd mweb-themes/src

# 安装依赖
npm install

# 编译并预览主题
npm run dev <theme_file_path>
```

最后一个命令会编译指定的主题文件，`<theme_file_path>` 是主题文件的路径，默认为 `mweb-default.scss`。主题文件类型可以是 SASS、SCSS 和 CSS。

运行后，终端会输出一个地址，默认 `http://localhost:3000`，在浏览器中打开，即可预览主题。之后更改主题文件，浏览器会实时刷新。


## 目录结构

```
.
├── index.html                // 预览模板
└── themes                    // 主题目录
    ├── mweb-default.scss     // 默认主题
    ├── mweb-xxx.scss         // 另一个主题
    ├── prism-themes          // prism 代码高亮主题
    ├── core                  // 基础样式文件
    └── variables             // 各个主题的变量配置
```

## 新增一个 MWeb 主题

1. 在 `themes/variables` 目录下创建文件 `xxx.scss`，`xxx` 是主题名称
2. 在 `themes` 目录下创建文件 `mweb-xxx.scss`，内容如下：

    ```scss
    @import "prism-themes/default.scss";
    @import "variables/xxx.scss"; // 这里更换为第一步的文件名
    @import "core"
    ```

3. 在 `xxx.scss` 中按需更改[默认主题变量](themes/variables/default.scss)的值
4. 如果有特殊的样式需求，可以写在 `mweb-xxx.scss` 中

<h2 id="prism">新增一个 Prism 主题</h2>

1. 在 [PrismJS 官网](https://prismjs.com/) 选择一个主题，进入[下载页](https://prismjs.com/download.html)查看其 CSS 代码（拉到下载页底部就可以看到）
2. 在 `themes/prism-themes` 目录下创建文件 `xxx.scss`
3. 按需更改[颜色代码](themes/prism-themes/default.scss)
4. 更改 `mweb-xxx.scss` 中引用的 prism 主题文件

社区提供的 PrismJS 主题：
* [Github - PrismJS/prism-themes](https://github.com/PrismJS/prism-themes)
* [最佳 Prism.js 代码高亮主题集合](https://ourcodeworld.com/articles/read/477/collection-of-the-best-open-source-prism-js-code-highlight-themes)

## 打包为 CSS 文件

根目录下执行：

```
npm run build
```

生成的 CSS 文件位于上层目录的 [`themes` 文件夹](../themes)内。