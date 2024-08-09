const { BrowserWindow } = require("electron");
const { v4 } = require("uuid");
const path = require("path");
/**
 * 窗口类
 */
class WindowItem {
  /**
   *
   * @param {*} settings 创建窗口的时候的相关配置
   */
  constructor(settings) {
    this.width = settings.width;
    this.height = settings.height;
    this.x = settings.x;
    this.y = settings.y;
    this.id = v4(); // 窗口的唯一标识
    this.window = this.createWindow();
    if (settings.url) {
      this.window.loadURL(settings.url);
    } else {
      // 如果没有url的话，就加载默认的页面
      this.window.loadFile(path.join(__dirname, "../defaultWindow/index.html"));
    }
  }
  createWindow() {
    return new BrowserWindow({
      width: this.width,
      height: this.height,
      x: this.x,
      y: this.y,
      show: false, // 一开始不显示窗口
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });
  }
}
module.exports = WindowItem;
