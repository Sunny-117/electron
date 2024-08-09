let isInited = false; // 检查是否已经初始化
module.exports = {
  // 初始化全局异常处理模块
  initGlobalErrorHandler: function () {
    if (isInited) return;
    if (!isInited) {
      // 进行初始化操作
      isInited = true;
      if (process.type === "renderer") {
        // 进入此分支，说明是来自渲染进程的错误
        window.addEventListener("error", (e) => {
          e.preventDefault();
          console.log("这是来自于渲染进程的 error 类型的异常");
          console.log(e.error);
        });
        window.addEventListener("unhandledRejection", (e) => {
          e.preventDefault();
          console.log("这是来自于渲染进程的 unhandledRejection 类型的异常");
          console.log(e.reason);
        });
      } else {
        // 进入此分支，说明是来自主进程的错误
        process.on("uncaughtException", (error) => {
          console.log("这是来自于主进程的 uncaughtException 类型的异常");
          console.log(error);
        });
        process.on("unhandledRejection", (error) => {
          console.log("这是来自于主进程的 unhandledRejection 类型的异常");
          console.log(error);
        });
      }
    }
  },
  // 用于捕获同步代码的异常
  captureSyncErrors: function (func) {
    try {
      func();
    } catch (error) {
      console.error("捕获到同步代码的异常：", error);
      // 这里往往会添加后续的逻辑，比如将错误信息发送到服务器，记录到错误日志中等
    }
  },
  // 用于捕获异步代码的异常
  captureAsyncErrors: async function (asyncFunc) {
    try {
      await asyncFunc();
    } catch (error) {
      console.error("捕获到异步代码的异常：", error);
      // 这里往往会添加后续的逻辑，比如将错误信息发送到服务器，记录到错误日志中等
    }
  },
};
