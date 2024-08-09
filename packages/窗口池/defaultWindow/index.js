const { ipcRenderer } = require("electron");
const windowInfo = document.getElementById("window-info");
ipcRenderer.on("window-info", (_, data) => {
  windowInfo.innerHTML += `
    <li>窗口 id： ${data.id}</li>
    <li>窗口 width：${data.width}</li>
    <li>窗口 height：${data.height}</li>
    <li>窗口 x：${data.x}</li>
    <li>窗口 y：${data.y}</li>
    `;
});
