const { ipcRenderer } = require("electron");

const btn = document.getElementById("btn");

btn.addEventListener("click", async function () {
  // 我们需要弹出一个对话框
  const result = await ipcRenderer.invoke("show-open-dialog");
  console.log(result);
});
