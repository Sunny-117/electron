const initErrorHandler = require("../errorHandler");
initErrorHandler.initGlobalErrorHandler();

const btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  //   throw new Error("渲染进程主动抛出错误");
  //   new promise((resolve, reject) => {
  //     reject("手动抛出一个错误");
  //   });
  // 示例1:捕获同步代码的异常
  //   initErrorHandler.captureSyncErrors(() => {
  //     const invalidJSON = "{name: 'Front-End Wizard', age: 25;}";
  //     JSON.parse(invalidJSON);
  //   });
  //   console.log("后续代码...");
  // 示例2:捕获异步代码的异常
  //   initErrorHandler.captureAsyncErrors(async () => {
  //     const res = await fetch("https://www.baidu.com");
  //     console.log("res:", res);
  //   });

  // 示例3:忘记做异常捕获，全局异常处理模块会捕获到这个异常
  const invalidJSON = "{name: 'Front-End Wizard', age: 25;}";
  JSON.parse(invalidJSON);
});
