const { ipcRenderer } = require("electron");

const saveBtn = document.getElementById("save");
const selectAndSaveBtn = document.getElementById("selectAndSave");
const content = document.getElementById("content");
saveBtn.addEventListener("click", () => {
  if (content.value) {
    ipcRenderer.send("save-to-desktop", content.value);
    alert("存储成功");
  } else {
    alert("请输入内容");
  }
});

selectAndSaveBtn.addEventListener("click", async () => {
  if (content.value) {
    // 拿到用户选择的目录
    const dirPath = await ipcRenderer.invoke("select-dir");
    ipcRenderer.send("save-to-dir", {
      dirPath,
      text: content.value,
    });
    alert("存储成功");
  } else {
    alert("请输入内容");
  }
});
