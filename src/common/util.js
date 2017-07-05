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

export const getCpuserid = function () {
    return localStorage.getItem('cpuserid') || ''
}

export const src = 'qqsd'
export const cptype = ''
export const payUrl = 'http://m.500.com/payment/index'
// let payUrl = 'http://m.500boss.com/payment/index';

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

export function invokeWxzf (data) {
    return new Promise((resolve, reject) => {
        const onBridgeReady = () => {
            window.WeixinJSBridge && window.WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                    'appId': data.appId,          // 公众号名称，由商户传入
                    'timeStamp': data.timeStamp, // 时间戳，自1970年以来的秒数
                    'nonceStr': data.nonceStr,   // 随机串
                    'package': data.package,
                    'signType': 'MD5',                // 微信签名方式：
                    'paySign': data.paySign // 微信签名
                },
                function (res) {
                    if (res.err_msg === 'get_brand_wcpay_request:ok') {
                        resolve('ok')
                    } else {
                        const error = new Error(res.err_msg)
                        error.code = '101'
                        reject(error)
                    }
                })
        }
        if (typeof WeixinJSBridge === 'undefined') {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
            }
        } else {
            onBridgeReady()
        }
    })
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
