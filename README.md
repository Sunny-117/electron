# Electron

## 本文介绍

**第一章 Electron快速入门**

该章节是整个 Electron 教程的第一个篇章，主要聚焦于 Electron 基础相关的知识：

- Electron 基本介绍
- 进程和线程的概念
  - 主进程和渲染进程
  - 两者之间的通信
  - 渲染进程之间的通信
- 窗口相关的知识
  - 基础的窗口知识
  - 多窗口的管理
- 应用常见的设置
  - 快捷键
    - 应用级别快捷键
    - 全局快捷键
  - 托盘图标
  - 剪切板
  - 系统通知
- 系统对话框
- 菜单
  - 自定义菜单
  - 右键菜单
- 数据持久化方案
  - 使用浏览器能力做持久化
  - 使用Node.js能力做持久化
- 生命周期
- 预加载脚本和上下文隔离



**第二章 实战案例：构建Markdown编辑器**

本章会从原理着手：

- Markdown原理
  - 抽象语法树
  - 常见的 Markdown 实现原理
- 使用 Electron 构建 Markdown 编辑器
  - 打开一个 Markdown 文档
  - 保存文档
  - 拖动一个文档到编辑器
  - ...



**第三章 实战案例：构建一个音乐播放器**

同样是通过不断迭代的方式，一步一步完善音乐播放器。

- 原生网页版音乐播放器
- AmplitudeJS迭代音乐播放器
- Electron版本音乐播放器
- Vite、Vue、Electron搭建一个项目，继续迭代音乐播放器
- Electron-Vite 迭代音乐播放器



**第四章 Electron开发进阶**

这一章的内容通常和业务逻辑关系不大，更多的是关于应用的健壮性以及一些周边功能的介绍。

- 应用打包
- 应用更新
- 单元测试
- 应用安全性
- 异常处理
- 日志处理
  - 日志的记录
  - 日志的上传



**第五章 底层原理**

这一章主要是聚焦于 Electron 底层一些比较重要的特性，针对一些非常重要的代码片段进行剖析。

- Electron 源码目录的结构
- Electron 如何做到跨平台
- Electron 本身 API 是如何为开发者提供支持的
- 进程间是如何通信
- ...

还会包含一些和 Electorn 相关的周边工具的原理剖析

- electron-builder
- electron-updater

以及还会介绍一些看似和 Electron 工程没有关系，但是其实是比较重要的一些原理。

- V8引擎执行的原理
- 垃圾回收相关原理



**第六章 Electron常见开发需求**

- 点对点通信
- 拼写检查
- 窗口池
- 原生文件的拖放
- 最近文件列表
- 屏幕截图


## Electron基本介绍

Electron是一个使用前端技术（HTML、CSS、JS）来开发桌面应用的框架。

> 什么是桌面应用？
>
> 顾名思义，就是需要安装包安装到电脑上的应用程序，常见的桌面应用：QQ、视频播放器、浏览器、VSCode
>
> 桌面应用的特点：
>
> - 平台依赖性
> - 需要本地安装
> - 可以是瘦客户端，也可以是厚客户端
>   - 所谓的瘦客户端，指的是严重依赖于服务器，离线状态下没办法使用（QQ、浏览器）
>   - 厚客户端刚好相反，并不严重依赖服务器，离线状态下也可以使用（视频播放器、VSCode）
> - 更新和维护：需要用户重新下载和安装新的版本

在早期的时候，要开发一个桌面应用，能够选择的技术框架并不多：

- Qt
- GTK
- wxWidgets

这三个框架都是基于 C/C++ 语言的，因此就要求开发者也需要掌握 C/C++ 语言，对于咱们前端开发人员来讲，早期是无法涉足于桌面应用的开发的。

> StackOverflow 联合创始人 Jeff 说：
>
> 凡是能够使用 JavaScript 来书写的应用，最终都必将使用 JavaScript 来实现。

使用前端技术开发桌面应用相关的框架实际上有两个：

- NW.js
- Electron

>这两个框架都与中国开发者有极深的渊源。
>
>2011 年左右，中国英特尔开源技术中心的王文睿（*Roger Wang*）希望能用 Node.js 来操作 WebKit，而创建了 node-webkit 项目，这就是 Nw.js 的前身，但当时的目的并不是用来开发桌面 GUI 应用。
>
>中国英特尔开源技术中心大力支持了这个项目，不仅允许王文睿分出一部分精力来做这个开源项目，还给了他招聘名额，允许他招聘其他工程师来一起完成。
>
>NW.js 官网：https://nwjs.io/
>
>2012 年，故事的另一个主角赵成（*Cheng Zhao*）加入王文睿的小组，并对 node-webkit 项目做出了大量的改进。
>
>后来赵成离开了中国英特尔开源技术中心，帮助 GitHub 团队尝试把 node-webkit 应用到 Atom 编辑器上，但由于当时 node-webkit 并不稳定，且 node-webkit 项目的走向也不受赵成的控制，这个尝试最终以失败告终。
>
>但赵成和 GitHub 团队并没有放弃，而是着手开发另一个类似 node-webkit 的项目 Atom Shell，这个项目就是 Electron 的前身。赵成在这个项目上倾注了大量的心血，这也是这个项目后来广受欢迎的关键因素之一。再后来 GitHub 把这个项目开源出来，最终更名为 Electron。
>
>Electron 官网：https://www.electronjs.org/

这两个框架实际上都是基于 Chromium 和 Node.js 的，两个框架的对比如下表所示：

| 能力       | Electron                   | NW.js |
| ---------- | -------------------------- | ----- |
| 崩溃报告   | 内置                       | 无    |
| 自动更新   | 内置                       | 无    |
| 社区活跃度 | 良好                       | 一般  |
| 周边组件   | 较多，甚至很多官方提供组件 | 一般  |
| 开发难度   | 一般                       | 较低  |
| 知名应用   | 较多                       | 一般  |
| 维护人员   | 较多                       | 一般  |

从上表可以看出，无论是在哪一个方面，Electron 都是优于 NW.js。



**Electron 特点**

在 Electron 的内部，集成了两大部件：

- Chromium：为 Electron 提供了强大的 UI 能力，可以在不考虑兼容的情况下，利用 Web 的生态来开发桌面应用的界面。
- Node.js：让 Electron 有了底层的操作能力，比如文件读写，集成 C++，而且还可以使用大量开源的 npm 包来辅助开发。

而且 Chromium 和 Node.js 都是跨平台的，这意味着我们使用 Electron 所开发的应用也能够很轻松的解决跨平台的问题。



**搭建 Electron 项目**

首先创建一个新的目录，例如 client，然后使用 npm init -y 进行一个初始化。

接下来需要安装 Electron 依赖：

```js
npm install --save-dev electron
```

之后分别创建 index.html 和 index.js 文件：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <!-- 书写桌面程序界面的 -->
    <h1>Hello Electron</h1>
    <p>Hello from Electron！！！</p>
</body>
</html>
```

index.html 负责的是我们桌面应用的视图。

```js
// index.js
const { app, BrowserWindow } = require("electron");

// 创建窗口的方法
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });
  win.loadFile("index.html");
};

// whenReady是一个生命周期方法，会在 Electron 完成应用初始化后调用
// 返回一个 promise
app.whenReady().then(() => {
  createWindow();
});
```

该文件就是我们桌面应用的入口文件。

最后需要在 package.json 中添加执行命令：

```js
"scripts": {
  "start": "electron ."
},
```

最后通过 npm start 就可以启动了。
## 关于 meta 标签安全策略

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; script-src 'self'"
/>
```

1. **`<meta>` 标签**：这是一个 HTML 元素，用于提供关于 HTML 文档的元数据。在这个例子中，它被用来定义内容安全策略。
2. **`http-equiv="Content-Security-Policy"`**：这个属性表示 `<meta>` 标签定义了一个等同于 HTTP 响应头的内容。在这里，它指定了内容安全策略的类型。
3. **`content="default-src 'self'; script-src 'self'"`**：这部分定义了具体的策略内容：
   - `default-src 'self'`：这意味着对于所有的加载资源（如脚本、图片、样式表等），默认只允许从当前源（即同一个域）加载。这是一个安全措施，用于防止跨站点脚本（XSS）攻击，因为它不允许从外部或不受信任的来源加载内容。
   - `script-src 'self'`：这是一个特定的指令，仅适用于 JavaScript 脚本。它进一步限定脚本只能从当前源加载。这个指令实际上是冗余的，因为 `default-src 'self'` 已经设定了同样的策略，但它可以被用来重写 `default-src` 对于特定资源类型的默认设置。

总结来说，这段代码的目的是增加网页的安全性，通过限制只能从当前网站加载资源，以此来防止潜在的跨站脚本攻击。这是一个在现代 web 开发中常用的安全最佳实践。



