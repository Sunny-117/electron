const { ipcRenderer } = require("electron");
const useWinButton = document.getElementById("use-win-button");
const createNewWinButton = document.getElementById("create-new-win-button");
const windowCount = document.getElementById("count");
const windowList = document.getElementById("window-list");
const width = document.getElementById("width");
const xPosition = document.getElementById("x-position");
const height = document.getElementById("height");
const yPosition = document.getElementById("y-position");
const url = document.getElementById("url");

/**
 * 获取窗口池里面窗口的信息
 */
async function getWindowInfo() {
  // 获取窗口池里面的窗口信息
  const poolsInfo = await ipcRenderer.invoke("get-pools-info");
  windowCount.textContent = poolsInfo.count;
  windowList.innerHTML = "";
  for (let i = 0; i < poolsInfo.pools.length; i++) {
    windowList.innerHTML += `
        <li class="window-item">窗口 ${i + 1} id： ${poolsInfo.pools[i].id}</li>
    `;
  }
}
getWindowInfo();

useWinButton.addEventListener("click", () => {
  // 1. 获取输入框的值，因为从窗口池取出窗口的时候，需要传入这些值
  ipcRenderer.send("request-new-window", {
    width: width.value,
    height: height.value,
    x: xPosition.value,
    y: yPosition.value,
    url: url.value,
  });
  getWindowInfo();
  width.value =
    height.value =
    xPosition.value =
    yPosition.value =
    url.value =
      "";
});

createNewWinButton.addEventListener("click", () => {
  ipcRenderer.send("create-new-window");
  getWindowInfo();
});
