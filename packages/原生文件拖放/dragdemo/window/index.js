const drag = document.getElementById("drag");
const { ipcRenderer } = require("electron");

drag.addEventListener("dragstart", () => {
  ipcRenderer.send("drag-start");
});
