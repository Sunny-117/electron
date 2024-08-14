export const flattenArr = (arr) => {
    // reduce 归并: 接收回调，参数为之前的结果与当前的值
    return arr.reduce((map, item) => {
        map[item.id] = item
        return map
    }, {})
}

export const objToArr = (obj) => {
    return Object.keys(obj).map(key => obj[key])
}

// 找到父节点 以拿到 dataset
export const getParentNode = (node, parentClassName) => {
    let current = node
    while (current !== null) {
        if (current.classList.contains(parentClassName)) {
            return current
        }
        current = current.parentNode
    }
    return false
} 