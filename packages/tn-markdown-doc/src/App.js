import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import "easymde/dist/easymde.min.css"
import { v4 as uuidv4 } from 'uuid'
import { flattenArr, objToArr } from './utils/helper'
import fileHelper from './utils/fileHelper'
import { faPlus, faFileImport, faSave } from '@fortawesome/free-solid-svg-icons'
import FileSearch from './components/FileSearch'
import FileList from './components/FileList'
import BottomBtn from './components/BottomBtn'
import TabList from './components/TabList'
import SimpleMDE from 'react-simplemde-editor'
import { useMemo, useState, useEffect } from 'react'

// 使用 require js
// dirname 可以获得去掉文件名的路径部分
const { join, basename, extname, dirname } = window.require('path')
const { ipcRenderer } = window.require('electron')
const remote = window.require('@electron/remote')
const Store = window.require('electron-store')
const fileStore = new Store({ 'name': 'Files Data1' })

// 这段 hook 放到 hooks 下引入会导致 fs、path 模块无法读取
const useIpcRenderer = (keyCallbackMap) => {
  useEffect(() => {
      Object.keys(keyCallbackMap).forEach(key => {
          ipcRenderer.on(key, keyCallbackMap[key])
      })
  })
  // 清除副作用
  return () => {
      Object.keys(keyCallbackMap).forEach(key => {
          ipcRenderer.removeListener(key, keyCallbackMap[key])
      })
  }
}
const saveFileToStore = (files) => {
  // 不需要把所有文件信息存到持久化系统里，例如 isNew，body都不需要存
  const fileStoreObj = objToArr(files).reduce((result, file) => {
    const { id, path, title, createdAt } = file
    result[id] = {
      id,
      path,
      title,
      createdAt
    }
    return result
  }, {})
  fileStore.set('files', fileStoreObj)
}
function App() {
  const [ files, setFiles ] = useState(fileStore.get('files') || {})
  const [ activeFileID, setActiveFileID ] = useState('')
  const [ openedFileIDs, setOpenedFileIDs ] = useState([])
  const [ unsavedFileIDs, setUnsavedFileIDs ] = useState([])
  const [ searchedFiles, setsearchedFiles ] = useState([])
  const filesArr = objToArr(files)    // 有些要转换前文件格式
  const saveLocation = remote.app.getPath('documents')  // 使用remote.app.getPath() 拿到文件路径
  console.log(saveLocation, 'saveLocation')
  const activeFile = files[activeFileID]
  const openedFiles = openedFileIDs.map(openID => {
    return files[openID]
  })
  const fileListArr = (searchedFiles.length > 0) ? searchedFiles : filesArr

  const fileClick = (fileID) => {
    // set 当前 ID 未活跃 ID
    setActiveFileID(fileID)
    const currentFile = files[fileID]
    if (!currentFile.isLoaded) {
      fileHelper.readFile(currentFile.path).then(value => {
        const newFile = { ...files[fileID], body: value, isLoaded: true }
        setFiles({ ...files, [fileID]: newFile })
      })
    }
    // 添加至右侧 TabList 里 - openedFileID
    if (!openedFileIDs.includes(fileID)) {
      setOpenedFileIDs([ ...openedFileIDs, fileID ])
    }
  }

  const tabClick = (fileID) => {
    // 点谁就把 ID 设置为 activeID
    setActiveFileID(fileID)
  }

  const tabClose = (id) => {
    // 移除点击的tab
    const tabWithout = openedFileIDs.filter(fileID => fileID !== id)
    setOpenedFileIDs(tabWithout)
    // 高亮其他内容
    if (tabWithout.length > 0) {
      setActiveFileID(tabWithout[0])
    } else {
      setActiveFileID('')
    }
  }
  const fileChange = (id, value) => {
    if (value !== files[id].body) {
      const newFile = { ...files[id], body: value }
      setFiles({ ...files, [id]: newFile })

      if (!unsavedFileIDs.includes(id)) {
        setUnsavedFileIDs([ ...unsavedFileIDs, id])
      }
    }
  }
  const deleteFile = (id) => {
    if (files[id].isNew) {
      const { [id]: value , ...afterDelete } = files
      setFiles(afterDelete)
    } else {
      fileHelper.deleteFile(files[id].path).then(() => {
        const { [id]: value , ...afterDelete } = files
        setFiles(afterDelete)
        saveFileToStore(afterDelete)
        // 关闭 tab
        tabClose(id)
      })
    }
    
  }
  const updateFileName = (id, title, isNew) => {
    // 旧文件就要去掉路径后的原名字拼接新名字，新文件使用户起的名字拼接路径
    const newPath = isNew ? join(saveLocation, `${title}.md`) : join(dirname(files[id].path), `${title}.md`)
    // 编辑更新标题
    const modifiedFile = { ...files[id], title, isNew: false, path: newPath }
    const newFiles = { ...files, [id]: modifiedFile }
    if (isNew) {  // 新建
      fileHelper.writeFile(newPath, files[id].body).then(() => {
        setFiles(newFiles)
        saveFileToStore(newFiles)
      })
    } else {      // 更新标题
      const oldPath = files[id].path
      fileHelper.renameFile(oldPath, newPath).then(() => {
        setFiles(newFiles)
        saveFileToStore(newFiles)
      })
    }
  }
  const fileSearch = (keyword) => {
    console.log({filesArr, keyword}, 'keyword')
    const newFiles = filesArr.filter(file => file.title.includes(keyword))
    setsearchedFiles(newFiles)
  }
  const createNewFile = () => {
    const newID = uuidv4()
    const newFile = {
      id: newID,
      title: '',
      body: '## 请输入 Markdown',
      createdAt: new Date().getTime(),
      isNew: true,
    }
    setFiles({ ...files, [newID]: newFile })
  }
  
  const saveCurrentFile = () => {
    fileHelper.writeFile(activeFile.path, activeFile.body).then(() => {
      // 不再是未保存状态
      setUnsavedFileIDs(unsavedFileIDs.filter(id => id !== activeFile.id))
    })
  }
  
  // 把 MDE 选项用 useMemo 放在这里可以避免光标失焦
  const mdeOptions = useMemo(() => {
    return {
      minHeight: '515px'
    }
  }, [])

  const importFiles = () => {
    remote.dialog.showOpenDialog({
      title: '选择导入的 markdown 文件',
      properties: ['openFile', 'multiSelections'],
      filters: [
        {name: 'Markdown files', extensions: ['md']}
      ]
    }).then((result) => {
      const paths = result.filePaths
      if (Array.isArray(paths)) {
        // 将路径数组过滤，看是否已经添加
        const filteredFiles = paths.filter(path => {
          const alreadyAdded = Object.values(files).find(file => {
            return file.path === path
          })
          return !alreadyAdded
        })
        // 将 path 拓展为 files 的格式
        const importFilesArr = filteredFiles.map(path => {
          return {
            id: uuidv4(),
            title: basename(path, extname(path)),
            path,
          }
        })
        // key-value 形式的对象
        const newFiles = { ...files, ...flattenArr(importFilesArr) }
        setFiles(newFiles)
        saveFileToStore(newFiles)
        if (importFilesArr.length > 0) {
          remote.dialog.showMessageBox({
            type: 'info',
            title: `成功导入了${importFilesArr.length}个文件`,
            message: `成功导入了${importFilesArr.length}个文件`
          })
        }
      }
    })
  }

  useIpcRenderer({
    'create-new-file': createNewFile,
    'import-file': importFiles,
    'save-edit-file': saveCurrentFile
  })

  return (
    <div className="App container-fluid px-0">
      <div className='row no-gutters'>
        <div className='col-3 bg-light left-panel'>
          <FileSearch
            title="My Document"
            onFileSearch={fileSearch}
          />
          <FileList
            files={fileListArr}
            onFileClick={fileClick}
            onSaveEdit={updateFileName}
            onFileDelete={deleteFile}
          />
          <div className='row no-gutters button-group'>
            <div className='col'>
              <BottomBtn
                text="新建"
                colorClass="btn-primary"
                icon={faPlus}
                onBtnClick={createNewFile}
              />
            </div>
            <div className='col'>
              <BottomBtn
                text="导入"
                colorClass="btn-success"
                icon={faFileImport}
                onBtnClick={importFiles}
              />
            </div>
          </div>
        </div>
        <div className='col-9 right-panel'>
          {
            !activeFile &&
            <div className='start-page'>
              选择/创建新的 Markdown 文档
            </div>
          }
          {
            activeFile &&
            <>
              <TabList
                files={openedFiles}
                activeId={activeFileID}
                unsaveIds={unsavedFileIDs}
                onTabClick={tabClick}
                onCloseTab={tabClose}
              />
              <SimpleMDE
                key={activeFile && activeFile.id}
                value={activeFile && activeFile.body}
                onChange={(value) => {fileChange(activeFileID, value)}}
                options={mdeOptions}
              />
              <BottomBtn
                text="保存"
                colorClass="btn-success"
                icon={faSave}
                onBtnClick={saveCurrentFile}
              />
            </>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
