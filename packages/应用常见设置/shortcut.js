const { globalShortcut, app, dialog } = require("electron");

app.on("ready", () => {
  // 需要注意，在注册全局快捷键的时候，需要在 app 模块的 ready 事件触发之后
  // 使用 globalShortcut.register 方法注册之后会有一个返回值
  // 这个返回值是一个布尔值，如果为 true 则表示注册成功，否则表示注册失败
  const ret = globalShortcut.register("ctrl+e", () => {
    dialog.showMessageBox({
      message: "全局快捷键 ctrl+e 被触发了",
      buttons: ["好的"],
    });
  });

  if (!ret) {
    console.log("注册失败");
  }

  console.log(
    globalShortcut.isRegistered("ctrl+e")
      ? "全局快捷键注册成功"
      : "全局快捷键注册失败"
  );
});

// 当我们注册了全局快捷键之后，当应用程序退出的时候，也需要注销这个快捷键
app.on("will-quit", function () {
  globalShortcut.unregister("ctrl+e");
  globalShortcut.unregisterAll();
});
