import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './TabList.scss'

// files 文件, activeId 当前编辑的文件id , unsaveIds 未保存文件id, onTabClick 点击tab回调, onCloseTab 点击tab关闭回调
const TabList = ({ files, activeId, unsaveIds, onTabClick, onCloseTab }) => {
    return (
        <ul className="nav nav-pills tablist-component">
            {files.map(file => {
                const withUnsaveMark = unsaveIds.includes(file.id)
                // classNames 接收 Object 动态添加类
                const fClassName = classNames({
                    'nav-link': true,
                    'active': file.id === activeId,
                    "withUnsaved": withUnsaveMark
                })
                return (
                    <li className='nav-item' key={file.id}>
                        <a
                            href="#"
                            className={fClassName}
                            onClick={(e) => {e.preventDefault(); onTabClick(file.id)}}
                        >
                            {file.title}
                            <span 
                                className='ml-2 close-icon'
                                onClick={(e) => {e.stopPropagation(); onCloseTab(file.id)}}
                            >
                                <FontAwesomeIcon
                                    icon={faTimes}
                                />
                            </span>
                            { withUnsaveMark && <span className='rounded-circle ml-2 unsaved-icon'></span> }
                        </a>
                    </li>
                )
            })}
        </ul>
    )
}

TabList.propTypes = {
    files: PropTypes.array, 
    activeId: PropTypes.string, 
    unsaveIds: PropTypes.array, 
    onTabClick: PropTypes.func, 
    onCloseTab: PropTypes.func,
}
TabList.defaultProps = {
    unsaveIds: []
}
export default TabList