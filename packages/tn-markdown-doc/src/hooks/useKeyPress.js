import { useState, useEffect } from 'react'

// 传入 keyCode, 返回这个键有没有被按到
const useKeyPress = (targetkeyCode) => {
    const [ keyPressed, setKeyPressed ] = useState(false)
    // 按下按键
    const keyDownHandler = ({ keyCode }) => {
        if (keyCode === targetkeyCode) {
            setKeyPressed(true)
        }
    }
    // 抬起按键
    const keyUpHandler = ({ keyCode }) => {
        if (keyCode === targetkeyCode) {
            setKeyPressed(false)
        }
    }
    useEffect(() => {
        document.addEventListener('keydown', keyDownHandler)
        document.addEventListener('keyup', keyUpHandler)
        return () => {
            document.removeEventListener('keydown', keyDownHandler)
            document.removeEventListener('keyup', keyUpHandler)
        }
    }, [])
    return keyPressed
}

export default useKeyPress