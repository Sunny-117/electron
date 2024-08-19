const { BrowserWindow } = require("electron");

// https://electronjs.org/docs/api/browser-window
class AppWindow extends BrowserWindow {
    constructor(config, urlLocation) {
        const basicConfig = {
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true,
                preload: `${__dirname}/preload.js`,    // 添加preload文件参数
                contextIsolation: false               // 关闭上下文隔离
            },
            show: false,
            backgroundColor: '#efefef',
        }
        const finialConfig = {...basicConfig, ...config}
        super(finialConfig)
        this.loadURL(urlLocation)
        this.once('ready-to-show', ()=>{
            this.show()
        })
    }
}
module.exports = AppWindow