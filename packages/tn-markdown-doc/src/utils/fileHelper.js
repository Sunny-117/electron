const fs = window.require('fs').promises
const path = window.require('path')

const fileHelper = {
    // 读取
    readFile: (path, cb) => {
        return fs.readFile(path, { encoding: 'utf-8' })
    },
    // 写入
    writeFile: (path, content) => {
        return fs.writeFile(path, content, { encoding: 'utf-8' })
    },
    // 重命名
    renameFile: (path, newPath) => {
        return fs.rename(path, newPath)
    },
    // 删除
    deleteFile: (path) => {
        return fs.unlink(path)
    }
}

export default fileHelper