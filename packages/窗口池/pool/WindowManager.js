const WindowItem = require("./WindowItem");
/**
 * 窗口池类：负责管理多个窗口
 */
class WindowManager {
  constructor() {
    this.pools = []; // 存储多个窗口实例
    this.defaultSettings = {
      width: 300,
      height: 300,
      x: 100,
      y: 100,
      url: null,
    };
  }
  /**
   * 初始化方法，用于初始化窗口池里面的窗口
   * 按照默认配置初始化 3 个窗口
   */
  init(n = 3) {
    for (let i = 0; i < n; i++) {
      this.createDefaultSettingWindow();
    }
    console.log(this.pools);
  }
  /**
   * 按照默认配置来创建窗口
   */
  createDefaultSettingWindow() {
    this.pools.push(new WindowItem(this.defaultSettings));
  }
  /**
   * 获取窗口池中窗口的数量
   */
  getWindowCount() {
    return this.pools.length;
  }
  /**
   * 从窗口池里面拿一个窗口出来
   */
  getWindow() {
    return this.pools.shift();
  }
}
module.exports = WindowManager;
