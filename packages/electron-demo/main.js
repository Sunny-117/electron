// 导入相应的功能接口
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

function createWindow() {
  // 创建应用窗口实例
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    titleBarStyle: 'hidden',
    titleBarOverlay: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })
  // 加载 index.html
  win.loadFile('index.html')
  // win.loadURL('http://static-serve.botue.com/electron/index.html')
}

// 监听 app 的 ready 事件（生命周期）
app.on('ready', () => {
  createWindow()
})

// 监听 app 的 activate 事件
app.on('activate', () => {
  console.log('Electron 应用被激活了...')
})

// 处理渲染进程发送过来的消息
ipcMain.handle('handle-message', (_ev, message) => {
  console.log('I have received your message: ' + message)
  // 将处理结果返回给渲染进程
  return 'Hi, your message is: ' + message
})
