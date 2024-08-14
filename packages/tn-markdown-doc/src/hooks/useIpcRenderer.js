import { useEffect } from 'react'
import { ipcRenderer } from 'electron'

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

export default useIpcRenderer