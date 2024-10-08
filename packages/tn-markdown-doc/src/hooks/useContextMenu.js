import { useEffect, useRef } from 'react'
const remote = window.require('@electron/remote')
const { Menu, MenuItem } = remote

const useContextMenu = (itemArr, targetSelctor, deps) => {
    let clickedElement = useRef(null)
    useEffect(() => {  
        const menu = new Menu()
        itemArr.forEach(item => {
            menu.append(new MenuItem(item))
        })
        // useRef 可以在多次渲染中记住元素
        const handleContextMenu = (e) => {
            // 只有在特定 DOM 上右键才出现菜单
            if (document.querySelector(targetSelctor).contains(e.target)) {
                clickedElement.current = e.target
                menu.popup({window: remote.getCurrentWindow()})
            }
        }
        window.addEventListener('contextmenu', handleContextMenu)
        return () => {
            window.removeEventListener('contextmenu', handleContextMenu)
        }
    }, deps)
    return clickedElement
}

export default useContextMenu