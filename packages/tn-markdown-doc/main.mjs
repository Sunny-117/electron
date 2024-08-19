// import { app, BrowserWindow, Menu } from 'electron'
// import isDev from 'electron-is-dev'
// import path from 'path'
// import { remote, Store }  from './commonJSModule.js'
// import menuTemplate from './src/menuTemplate.js'

// let mainWindow
// const __dirname = path.resolve()            // 用import 导入 path 模块时这样获取 __dirname
// remote.initialize()                         // 初始化 remote
// Store.initRenderer()

// app.on('ready', () => {
//     mainWindow = new BrowserWindow({
//         width: 1024,
//         height: 680,
//         webPreferences: {
//             nodeIntegration: true,
//             preload: `${__dirname}/preload.js`,    // 添加preload文件参数
//             contextIsolation: false               // 关闭上下文隔离
//         }
//     })
//     const urlLocation = isDev ? 'http://localhost:3000' : 'dummyurl'
//     mainWindow.loadURL(urlLocation)
//     remote.enable(mainWindow.webContents)          // window 新建后添加 remote 配置
//     // 设置菜单
//     const menu = Menu.buildFromTemplate(menuTemplate)
//     Menu.setApplicationMenu(menu)
// })




import { app, ipcMain, Menu } from 'electron'
import isDev from 'electron-is-dev'
import path from 'path'
import { remote, Store }  from './commonJSModule.js'
import menuTemplate from './src/menuTemplate.js'
import AppWindow from './AppWindow.js'

let mainWindow
let settingsWindow
const __dirname = path.resolve()            // 用import 导入 path 模块时这样获取 __dirname
remote.initialize()                         // 初始化 remote
Store.initRenderer()

app.on('ready', () => {
    // mainWindow = new BrowserWindow({
    //     width: 1024,
    //     height: 680,
    //     webPreferences: {
    //         nodeIntegration: true,
    //         preload: `${__dirname}/preload.js`,    // 添加preload文件参数
    //         contextIsolation: false               // 关闭上下文隔离
    //     }
    // })
    const mainWindowConfig = {
        width: 1024,
        height: 680,
    }
    const urlLocation = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, './build/index.html')}`
    mainWindow = new AppWindow(mainWindowConfig, urlLocation)
    mainWindow.on('close', ()=>{
        mainWindow = null
    })

    ipcMain.on('open-settings-window', ()=>{
        const settingsWindowConfig = {
            width: 500,
            height: 400,
            parent: mainWindow
        }
        const settingsFileLocation = `file://${__dirname}/settings/settings.html`
        settingsWindow = new AppWindow(settingsWindowConfig, settingsFileLocation)
        settingsWindow.on('close', ()=>{
            settingsWindow = null
        })
    })


    // mainWindow.loadURL(urlLocation)
    remote.enable(mainWindow.webContents)          // window 新建后添加 remote 配置
    // 设置菜单
    const menu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(menu)
})