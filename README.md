## MWeb-Themes

30+ 款 Markdown 预览主题，适用于 MWeb、Typora 等笔记软件，以及 Juejin、Jekyll、Hexo 等博客平台。

## 目录
- [主题列表](#主题列表)
- [使用主题](#使用主题)
- [开发主题](#开发主题)
- [Q & A](#q--a)

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

### Bear 同款主题
基于 [Bear](https://bear.app/cn/faq/Themes/About%20free%20and%20Pro%20themes%20in%20Bear/) 的主题修改，共 22 款。以下是默认主题 Red Graphite：
![](media/05-14-21-33-40.png)
![](media/05-14-21-33-51.png)

> 默认配置：字号 16px、页宽 46rem。如果希望和 Bear 完全一致（字号 14px、页宽 40em），请前往 [bear-14px](https://github.com/imageslr/mweb-themes/tree/bear-14px) 分支下载。

### 其他
* [JonoloLuo/MWeb-Theme-jonolo](https://github.com/JonoloLuo/MWeb-Theme-jonolo)：马克飞象风格
## 使用主题
1. 下载 [themes](themes) 文件夹下名为 `mweb-xxx.css` 的主题文件
2. 打开 MWeb 偏好设置 - 预览样式 - 编辑 - 打开自定义样式所在的文件夹...
3. 将下载的主题文件（.css 文件）拖到文件夹里（一般是 `PreviewCSS`）
4. 点击 MWeb 偏好设置 - 预览样式 - 刷新，可以看到所有主题列表
5. 选择喜欢的主题

## 开发主题

本项目提供了一个标准样式模板，可以通过设置变量（颜色、字号等）的方式快速开发一个新的**预览主题**。

可以从其他工具 / 平台的主题中获取灵感：
* 掘金的主题：https://github.com/xitu/juejin-markdown-themes
* typora 的主题：http://theme.typora.io/
* Hexo 的主题：https://hexo.io/themes/
* ...

阅读[开发文档](src/)，了解如何将主题适配到 MWeb。

## Q & A

Q：如何自定义代码块的主题？  
A：MWeb 使用 PrismJS 来高亮代码块中的语法，可以自己查找 PrismJS 主题并配置颜色代码，见[开发文档](src#prism)。

Q：代码块语法没有正确高亮？  
A：这是因为 MWeb 3.x 使用了基础版的 PrismJS，只支持部分语言，需要自行更新。
1. 前往 [PrismJS 官网](https://prismjs.com/download.html)，在 `Languages` 下方勾选 `Select/unselect all`，然后拉到底部点击 `Download JS`
2. 把下载的 `prism.js` 文件移动到 `/Applications/MWeb.app/Contents/Resources/PreviewAsset/prism` 文件夹
3. 重启 MWeb


Q：如何自定义 MWeb 编辑器主题？  
A：编辑器主题是 `.style` 文件，内容和 CSS 大同小异，请自行更改。
