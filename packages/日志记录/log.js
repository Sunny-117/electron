// 负责日志记录的模块
const log4js = require("log4js");
const { app, ipcRenderer } = require("electron");
const path = require("path");
const mkdirp = require("mkdirp");

// 首先第一步，我们需要确定日志的存储位置，这里我们选择存储在文件中
// 假设我们当前的应用是 markdown 编辑器应用
// 存储的位置位于 app.getPath("appData") "Markdown" "logs"
// 注意 app 这个模块只能在主进程里面获取到

let logPath = null; // 用于存储日志文件的路径

if (typeof app !== "undefined") {
  // 说明是在主进程里面
  logPath = path.join(app.getPath("appData"), "Markdown", "logs");
  configureLog4js();
} else {
  // 说明是在渲染进程里面
  // logPath = path.join(__dirname, "logs");
  // configureLog4js();
  ipcRenderer.invoke("get-log-path").then((res) => {
    logPath = res;
    configureLog4js();
  });
}

// 第二步，我们需要确定日志的格式
// 也就是对 log4js 进行配置
function configureLog4js() {
  // 1. 根据日志的存储位置来创建对应的目录
  mkdirp.sync(logPath);

  // 2. 接下来，就是各种各样的 log4js 的格式相关的配置

  // 定义日志的输出格式
  const pattern = "[%d{yyyy-MM-dd hh:mm:ss.200}][%p]%m%n";

  log4js.configure({
    appenders: {
      // 定义输出到控制台的 appender
      out: {
        type: "stdout", // 指定输出类型为标准输出，即控制台
        layout: {
          type: "pattern", // 使用自定义模式的布局
          pattern, // 应用上面定义的日志格式模式
        },
      },
      // 定义输出到指定位置的日志文件的 appender
      app: {
        type: "dateFile", // 指定类型为日期文件，日志会根据日期存储在不同的文件中
        filename: path.join(logPath, "Markdown.log"), // 指定日志文件的存储路径和基础文件名
        alwaysIncludePattern: true, // 文件名会包含下面定义的日期模式
        pattern: "-yyyy-MM-dd", // 定义文件名的日期模式
        daysToKeep: 7, // 日志文件的保留天数，超过这个时间的日志文件会被删除
        layout: {
          type: "pattern", // 使用自定义模式的布局
          pattern, // 应用上面定义的日志格式模式
        },
      },
    },
    // 配置要记录的日志的级别
    categories: {
      default: {
        appenders: ["out", "app"], // 默认情况下，日志消息会同时发送到上面定义的两个appender
        level: "info", // 设置日志级别为info，意味着所有info级别以上的日志都会被记录
      },
    },
  });
}

// 第三步，生成日志记录器，并且暴露出去
// getLogger 方法用于生成一个日志记录器，参数是记录器的名称
// 相当于为你的记录器提供了一个类别，用于更加细粒度的控制日志的输出
// 如果没有填写名称，那么就是默认的记录器
const logger = log4js.getLogger();

module.exports = logger;
