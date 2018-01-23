/**
 * Created by xiezg on 2017/3/17.
 */
// 数组转对象，对象的key 队友第二个参数
export function convertArrToObj (arr, key) {
    let result = {}
    if (arr) {
        arr.forEach(item => {
            result[item[key]] = item
        })
    }
    return result
}

export const getCk = function () {
    return localStorage.getItem('ck') || ''
}

export const src = ''
export const cptype = ''

export const platform = (function () {
    return ~navigator.userAgent.indexOf('iPhone') ? 'ios' : 'android'
})()

export const isLowAndroidVersion = (function () {
    let userAgent = window.navigator.userAgent
    let indexAndroid = userAgent.indexOf('Android')
    let androidVersion = 0
    let isLowAndroidVersion = false
    if (indexAndroid >= 0) {
        androidVersion = parseFloat(userAgent.slice(indexAndroid + 8))
        if (androidVersion < 4.5) {
            isLowAndroidVersion = true
        }
    }
    return isLowAndroidVersion
})()

export const convertToQueryString = function (obj) {
    let result = []
    if (Object.keys(obj).length <= 0) {
        return false
    }
    Object.keys(obj).forEach(key => {
        result.push(`${key}=${obj[key]}`)
    })
    return result.join('&')
}
export const convertToObj = function (str) {
    let result = {}
    let seg = []
    let len, i, s
    if (str.length <= 0) {
        return false
    }
    seg = str.split('&')
    len = seg.length
    i = 0
    for (; i < len; i++) {
        if (!seg[i]) {
            continue
        }
        s = seg[i].split('=')
        result[s[0]] = s[1]
    }
    return result
}

export const wait = function (duration) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, duration)
    })
}

/**
 * @deprecated
 * @param ns
 * @returns {function(*): string}
 */
export function namespace (ns) {
    return (name) => [ns, name].join('/')
}

/**
 * @deprecated
 * @param array
 * @param ns
 * @returns {{}}
 */
export function mapTypes (array, ns) {
    const result = {}
    array.forEach(item => {
        result[item] = [ns, item].join('/')
    })
    return result
}

export function mapActions (acts, ns) {
    let aTypes = {}
    let actions = {}
    Object.keys(acts).forEach((key) => {
        aTypes[key] = [ns, key].join('/')
        actions[aTypes[key]] = acts[key]
    })
    return {actions, aTypes}
}

export function mapMutations (muts, ns) {
    let mTypes = {}
    let mutations = {}
    Object.keys(muts).forEach((key) => {
        mTypes[key] = [ns, key].join('/')
        mutations[mTypes[key]] = muts[key]
    })
    return {mutations, mTypes}
}

/**
*  禁止滚动条事件  公用样式
 */

export function stopHtml () {
    document.querySelector('html').className = 'overflow'
    document.querySelector('body').className = 'overflow'
}

/**
 *  禁止滚动条事件  公用样式
 */

export function starHtml () {
    document.querySelector('html').className = ''
    document.querySelector('body').className = ''
}
