# MWeb 自定义预览主题

👏 欢迎大家推荐其他的 Markdown 预览主题，我很乐意适配到 MWeb！

- [主题列表](#主题列表)
  - [Typo](#typo)
  - [Vue](#vue)
  - [Indigo](#indigo)
  - [SmartBlue](#smartblue)
  - [Jzman](#jzman)
  - [V-Green](#v-green)
- [如何使用？](#如何使用)
- [如何自定义 MWeb 预览样式？](#如何自定义-mweb-预览样式)
  - [搜索主题](#搜索主题)
  - [创建自定义预览样式](#创建自定义预览样式)
  - [修改代码语法高亮样式](#修改代码语法高亮样式)
- [如何自定义 MWeb 编辑器主题？](#如何自定义-mweb-编辑器主题)

## 主题列表
### Typo
基于 [Typo.css](https://github.com/sofish/Typo.css) 修改：
![](media/15732860467431.jpg)
![](media/15732860638359.jpg)

### Vue
基于 [typora-vue-theme](https://github.com/blinkfox/typora-vue-theme) 修改：
![](media/15732858925836.jpg)
![](media/15732859445415.jpg)

### Indigo
基于 [MDTU](https://markdown.devtool.tech/app) 修改：
![](media/05-13-12-47-13.png)
![](media/05-13-12-47-40.png)
![](media/05-13-12-47-50.png)

### SmartBlue

基于 [smartblue](https://github.com/cumt-robin/juejin-markdown-theme-smart-blue) 修改：
![](media/05-13-12-46-21.png)
![](media/05-13-12-46-46.png)

### Jzman
基于 [jzman](https://github.com/jzmanu/juejin-markdown-theme-jzman) 修改：
![](media/05-13-12-45-24.png)
![](media/05-13-12-45-54.png)

### V-Green
基于 [v-green](https://github.com/DawnLck/juejin-markdown-theme-v-green) 修改：
![](media/05-13-18-47-44.png)
![](media/05-13-18-48-12.png)
## 如何使用？
1. 下载名为 `mweb-xxx.css` 的主题文件
2. 打开 MWeb 偏好设置 - 预览样式 - 编辑 - 打开自定义样式所在的文件夹...
3. 将下载的主题文件拖到文件夹里
4. 点击 MWeb 偏好设置 - 预览样式 - 刷新，可以看到所有主题列表
5. 选择喜欢的主题

## 如何自定义 MWeb 预览样式？

### 搜索主题
MWeb 的主题文件其实就是一系列的 CSS 文件。除了搜索 MWeb 专用的主题外，还可以搜索博客使用的主题，比如：
* 掘金的主题：https://github.com/xitu/juejin-markdown-themes
* typora 的主题：http://theme.typora.io/
* wordpress 的主题

### 创建自定义预览样式
1. 打开 MWeb 偏好设置 - 预览样式 - 编辑 - 打开自定义样式所在的文件夹...
2. 目录下创建 `mweb-xxx.css` 文件
3. 复制上一步的主题代码，然后粘贴到该文件中
4. 点击 MWeb 偏好设置 - 预览样式 - 刷新，选择 `mweb-xxx` 样式
5. 查看效果是否符合预期
  
这些主题是为其他软件设计的，可能使用了特殊的选择器 (比如所有样式外面都包了一层 `.markdown-body`，这在 MWeb 中是不需要的)。这需要你了解 css 语法，自行修改。

如果主题文件是 scss 格式，可以使用 [这个在线网站](https://jsonformatter.org/scss-to-css) 转为 css。

### 修改代码语法高亮样式
一般下载的主题里不包含代码语法高亮样式。MWeb 使用 PrismJS 来高亮代码块中的语法，可以自己查找 PrismJS 主题并将代码拷贝到某个主题文件里。也可以去 MWeb 自带的主题文件里复制相应的 css 代码（`PrismJS 1.14.0...` 注释块后面的全部内容）。
* [PrismJS 官方主题预览](https://prismjs.com/)
* [PrismJS 主题下载](https://prismjs.com/download.html)：选择主题，页面最下方选择“Download CSS”
* [PrismJS 社区主题](https://ourcodeworld.com/articles/read/477/collection-of-the-best-open-source-prism-js-code-highlight-themes)

## 如何自定义 MWeb 编辑器主题？
编辑器主题是 `.style` 文件。同样可以在网上搜索主题文件，然后在偏好设置中更改。[TODO]