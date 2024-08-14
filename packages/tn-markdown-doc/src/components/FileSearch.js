import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import useKeyPress from '../hooks/useKeyPress'

// title: 搜索标题，onFileSearch: 点击搜索的回调
const FileSearch = ({ title, onFileSearch }) => {
    const [ inputActive, setInputActive ] = useState(false) // 输入状态
    const [ value, setValue ] = useState('')  // 搜索框内容
    const enterPressed = useKeyPress(13)  // 是否按了 Enter 键
    const escPressed = useKeyPress(27)  // 是否按了 Esc 键
    let node = useRef(null) // 记录DOM节点

    // 按 esc 或点击关闭按钮
    const closeSearch = () => {
        setInputActive(false)
        setValue('')
        onFileSearch('')
    }
    useEffect(() => {
        if (enterPressed && inputActive) {
            onFileSearch(value)   // 执行搜索功能回调
        }
        if (escPressed && inputActive) {
            closeSearch()         // 关闭搜索框
        }
    })
    useEffect(() => {
        // 当 inputActive 改变时，输入框聚焦
        if (inputActive) {
            node.current.focus()
        }
    }, [inputActive])
    return (
        <div className='alert alert-primary d-flex justify-content-between align-items-center mb-0'>
            { !inputActive && 
              <>
                <span>{title}</span>
                <button
                    title="button"
                    className="icon-button"
                    onClick={() => { setInputActive(true) }}
                >
                    <FontAwesomeIcon
                        title="搜索"
                        size="lg"
                        icon={faSearch}
                    />
                </button>
              </>
            }
            { inputActive &&
              <>
                <input
                    className="form-control"
                    value={value}
                    ref={node}
                    onChange={(e) => { setValue(e.target.value) }}
                />
                <button
                    title="button"
                    className="icon-button"
                    onClick={ closeSearch }
                >
                    <FontAwesomeIcon
                        title="关闭"
                        size="lg"
                        icon={faTimes}
                    />
                </button>
              </>
            }
        </div>
    )
}

// 类型检查
FileSearch.propTypes = {
    title: PropTypes.string,
    onFileSearch: PropTypes.func.isRequired // 必传
}
// 默认属性
FileSearch.defaultProps = {
    title: '我的云文档'
}
export default FileSearch