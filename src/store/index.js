/**
 * Created by xiezg on 2017/3/10.
 */

import Vue from 'vue'
import Vuex from 'vuex'
import ajax from '~common/ajax'
import {platform, src, wait, convertToQueryString, getCk, isLowAndroidVersion} from '~common/util'
import main from './main'
import home from './home'
import my from './my'
Vue.use(Vuex)

let baseURL = 'ws://192.168.41.76:6999';
if (process.env.NODE_ENV === 'production') {
    baseURL = 'wss://crazybet.choopaoo.com/wss';
} else if (process.env.NODE_ENV === 'preRelease') {
    baseURL = 'ws://192.168.41.76:6999'
}

// 全局的就是直接变量，一个页面一个对象
const state = {
    ck: 0,
    qqsdCK: 0,
    userInfo: null,
    toastMsg: null,
    isLowAndroidVersion: false,
    cp_login_state: 0,  // 0： 合作方没登录， 1： 合作方已经登录
    socket: {
        reconnect: 0,
        sock: null,
        interval: null,
        data: null,
        latestSub: null
    },
    msgAllData: {         // 我的消息所有数据
        showMessbox: false, //  弹窗
        messageList: [],
        isReadyGet: true,
        isNoneMessList: false,
        isAddMessList: false,
        messPageNum: 1

    },
    guessAllData: {      // 赛事记录所有数据
        showBetListbox: false, //  弹窗
        goldList: null
    },
    chargeAllData: {   // 充值所有數據
        showChargebox: false,  // 彈窗
        chargeList: null,
        footballPropsList: null
    },
    eventCountAllData: {   // 賽事統計數據
        showEventCountbox: false,  // 彈窗
        footballCaseData: null,
        footballStatData: null
    },
    awardAllData: {
        showAwardbox: false,   // 显示，隐藏 嘉奖框
        setAwardImg: null
    }

}
const mutations = {
    setisLowAndroidVersion (state, data) {
        state.isLowAndroidVersion = data
    },
    cp_login_state (state, data) {
        state.cp_login_state = data
    },
    ck (state, ck) {
        state.ck = ck
        localStorage.setItem('ck', ck)
    },
    qqsdCK (state, qqsdck) {
        state.qqsdCK = qqsdck
    },
    userInfo (state, userInfo) {
        if (userInfo && userInfo.photo === '') {
            userInfo.photo = 'http://img.choopaoo.com/esun/upload/be/83/be837ad8049611e797ef.png'
        }
        state.userInfo = userInfo
    },
    addConnectNum (state) {
        state.socket.reconnect ++
    },
    toastMsg (state, msg) {
        state.toastMsg = msg
    },
    initSocket (state, {sock, interval}) {
        state.socket.sock = sock
        state.socket.interval = interval
    },
    updateSocketData (state, data) {
        state.socket.data = data
    },
    setLatestSub (state, latestSub) {
        state.socket.latestSub = latestSub
    },
    showAwardbox (state, data) {
        state.awardAllData.showAwardbox = data
    },
    setAwardImg (state, data) {
        state.awardAllData.setAwardImg = data
    },

    showMessbox (state, data) {
        state.msgAllData.showMessbox = data
    },
    showBetListbox (state, data) {
        state.guessAllData.showBetListbox = data
    },
    showChargebox (state, data) {
        state.chargeAllData.showChargebox = data
    },

    showEventCountbox (state, data) {
        state.eventCountAllData.showEventCountbox = data
    },

    setMessageList (state, messageList) {
        state.msgAllData.messageList = messageList
    },

    lqSuccess (state, prizeInfo) {
        // 得测试一下
        let lqMsg = null
        state.msgAllData.messageList.forEach((msg) => {
            if (msg.pid === prizeInfo.pid) {
                lqMsg = msg
            }
        })

        Vue.set(lqMsg, 'showSucc', true)
        setTimeout(() => {
            state.msgAllData.messageList.some((msg, index) => {
                if (msg.pid === prizeInfo.pid) {
                    msg.valid = false
                    lqMsg = msg
                    Vue.set(lqMsg, 'showSucc', false)
                    return true
                }
            })
        }, 800)
    },
    /* 赛事记录 */
    setGoldList (state, goldList) {
        state.guessAllData.goldList = goldList
    },
    /* 充值记录 */
    setChargeList (state, chargeList) {
        state.chargeAllData.chargeList = chargeList
    },
    /*  我的充值icon列表 */
    setFootballPropsList (state, footballPropsList) {
        state.chargeAllData.footballPropsList = footballPropsList
    },

    setfootballCaseData (state, data) {
        state.eventCountAllData.footballCaseData = data
    },
    setfootballStatData (state, data) {
        state.eventCountAllData.footballStatData = data
    }

}
const actions = {
    clearLoginState ({commit, dispatch}, data) {
        commit('ck', '0')
        localStorage.setItem('qq_uid', 0)
        localStorage.removeItem('ck')
    },
    async doLogin ({commit, dispatch}, params) {
        try {
            let doLoginData = null
            doLoginData = await ajax.get(`/login/cpuser?qq_ck=${params}&cptype=qqsd&src=${src}&platform=${platform}`)
            localStorage.setItem('ck', doLoginData.ck)
            localStorage.setItem('qq_uid', doLoginData.qq_uid)
            commit('ck', doLoginData.ck)
            dispatch('getUserInfo')
            return doLoginData.ck
        } catch (e) {
            dispatch('showToast', e.message + '/login/cpuser')
        }
    },

    async showToast ({commit}, msg) {
        let cb = null, duration = 2000
        if (typeof msg === 'object') {
            cb = msg.cb
            duration = msg.duration
            msg = msg.message
        }
        commit('toastMsg', msg)
        await wait(duration || 2000)
        commit('toastMsg')
        cb && cb()
    },
    async getUserInfo ({state, commit, dispatch}) {
        try {
            let userInfo = await ajax.get(`/user/info?ck=${getCk()}&src=${src}`)
            commit('userInfo', userInfo)
        } catch (e) {
            if (e.code === '136' || e.code === '102') {
                dispatch('clearLoginState', 0)
                //  再次调起登陆
                dispatch('doLogin', state.qqsdCK)
                return false
            }
            dispatch('showToast', e.message + '/user/info')
        }
    },

    /*   我的消息   */
    async getMessageList ({commit, dispatch, state}, pageNum = 1) {
        console.log('message')
        if (state.msgAllData.isReadyGet && !state.msgAllData.isNoneMessList) {
            state.msgAllData.isReadyGet = false
            state.msgAllData.isAddMessList = true
            try {
                const {notifies_list} = await ajax.get(`/notify/pull?ck=${getCk()}&platform=${platform}&page=${pageNum}&src=${src}`)
                state.msgAllData.isAddMessList = false
                state.msgAllData.isReadyGet = true
                notifies_list.forEach(item => {
                    item.valid = true
                })
                if (pageNum === 1) {
                    state.msgAllData.messageList = []
                }
                let messageList = [...state.msgAllData.messageList]
                if (notifies_list.length <= 0) {
                    state.msgAllData.isNoneMessList = true
                    return false
                }
                state.msgAllData.messPageNum++
                messageList = messageList.concat(notifies_list)
                commit('setMessageList', messageList)
            } catch (e) {
                dispatch('showToast', e.message)
            }
        }
    },
    async lqPrize ({commit, dispatch}, pid) {
        try {
            const prizeInfo = await ajax.get(`/activity/prize/dole?pid=${pid}&ck=${getCk()}&platform=${platform}&src=${src}`)
            prizeInfo.prize.pid = pid
            commit('lqSuccess', prizeInfo.prize)
            dispatch('getUserInfo')
        } catch (e) {
            dispatch('showToast', e.message)
        }
    },

    /* 赛事记录 */
    async getGoldList ({commit, dispatch}, matchid) {
        if (matchid === 'undefined' || matchid === undefined) {
            matchid = 0
        }
        try {
            const goldlist = await ajax.post(`/trade/gold/list?matchid=${matchid}&ck=${getCk()}&platform=${platform}&src=${src}`)

            commit('setGoldList', goldlist)
        } catch (e) {
            dispatch('showToast', e.message)
        }
    },
    /*  充值 */
    async do500_qqsdPay ({commit, dispatch}, params) {
        try {
            // 1,2  2  表示成功的回调
            params = Object.assign({}, params, {
                ck: getCk(),
                platform: platform,
                src: src
            })
            const weChatData = await ajax.get(`/shops/gold/buy?${convertToQueryString(params)}`)
            const newChatData = Object.assign({}, weChatData, {'type': '14'})
            delete newChatData.product_id
            delete newChatData.product_name
            delete newChatData.return_url

            console.log({
                'pid': weChatData.product_id,
                'fee': weChatData.paymoney,
                'title': weChatData.product_name,
                'pay_type': '1', /* 1微信支付 2 支付宝支付 */
                'mix': newChatData
            })
            if (window.qqsdApp && weChatData) {
                try {
                    // app 支付
                    qqsdApp.invoke('app_pay', {
                        'pid': weChatData.product_id,
                        'fee': weChatData.paymoney,
                        'title': weChatData.product_name,
                        'pay_type': '1', /* 1微信支付 2 支付宝支付 */
                        'mix': newChatData
                    })
                } catch (e) {
                    dispatch('showToast', '500qqsd支付出错')
                }
            } else {
                //  touch 支付
                // alert('走的H5 pay')
                dispatch('showToast', '支付失败请刷新再試一试')
             // location.replace(payUrl + '?' + convertToQueryString(params))
            }
        } catch (e) {
            if (e.code === '101') {
            } else {
                dispatch('showToast', e.message)
            }
        }
    },
    /*  充值列表 */
    async getChargeList ({commit, dispatch}) {
        try {
            const chargeList = await ajax.get(`/shops/golds/list?ck=${getCk()}&platform=${platform}&src=${src}`)
            commit('setChargeList', chargeList)
        } catch (e) {
            dispatch('showToast', e.message)
        }
    },
    /*  我的充值icon列表 */
    async getFootballPropsList ({commit, dispatch}) {
        try {
            const footballPropsList = await ajax.get(`/personal/props/list?ck=${getCk()}&src=${src}&platform=${platform}`)
            commit('setFootballPropsList', footballPropsList)
        } catch (e) {
            dispatch('showToast', e.message)
        }
    },

    // 赛事统计  统计数据
    async getFootballStat ({commit, dispatch}, matchid) {
        try {
            let footballStatData = await ajax.get(`/match/football/stat?src=${src}&matchid=${matchid}&platform=${platform}`)
            footballStatData.stats && commit('setfootballStatData', footballStatData.stats)
        } catch (e) {
            dispatch('showToast', e.message)
        }
    },
    // 赛事统计
    async getFootballCase ({commit, dispatch}, matchid) {
        try {
            let footballCaseData = await ajax.get(`/match/football/case?src=${src}&matchid=${matchid}&platform=${platform}`)
            footballCaseData.cases && commit('setfootballCaseData', footballCaseData.cases)
        } catch (e) {
            dispatch('showToast', e.message)
        }
    },

    async localLogin ({commit}, code) {
        let {ck} = await ajax.get(`/login/guest?deviceid=${code}`)
        localStorage.setItem('ck', ck)
        commit('ck', ck)
    },
    initWebsocket ({commit, state, dispatch}) {
        return new Promise((resolve, reject) => {
            let sock = new WebSocket(`${baseURL}/wapcrazybet`)
            let interval = null
            let flag = 0
            let hasFinished = false
            sock.onmessage = function (e) {
                if (!~e.data.indexOf('you said')) {
                    let data = JSON.parse(e.data)
                    commit('updateSocketData', data)
                } else {
                    // alert('收到服务端心跳')
                }
            }
            sock.onopen = function () {
                if (state.socket.latestSub) {
                    sock.send(state.socket.latestSub)
                }
                interval = setInterval(() => {
                    sock.send('x')
                }, 10000)
                flag = 1
                if (hasFinished) return
                hasFinished = true
                resolve()
            }
            sock.onclose = function () {
                console.warn('websocket 重连')
                clearInterval(interval)
                setTimeout(() => {
                    commit('addConnectNum')
                    dispatch('initWebsocket')
                }, 5000)
            }
            sock.onerror = function (e) {
                console.error('sock error')
                e.code = '102'
                if (flag === 1) return
                if (hasFinished) return
                hasFinished = true
                reject(e)
            }
            setTimeout(() => {
                if (hasFinished) return
                hasFinished = true
                let error = new Error('超时')
                error.code = '103'
                reject(error)
            }, 1000)
            commit('initSocket', {sock, interval})
        })
    },

    subscribe ({commit, state}, {ptype, body}) {
        try {
            let latestSub = JSON.stringify({
                ptype,
                action: 'sub',
                body
            })
            state.socket.sock && state.socket.sock.send(latestSub)
            commit('setLatestSub', latestSub)
        } catch (e) {
            console.error(e.message)
        }
    },
    unsubscribe ({commit, state}, {ptype, body}) {
        try {
            state.socket.sock && state.socket.sock.send(JSON.stringify({
                ptype,
                action: 'unsub',
                body
            }))
        } catch (e) {
            console.error(e.message)
        }
    }
}
export default () => new Vuex.Store({
    state,
    actions,
    mutations,
    modules: {
        main,
        home,
        my
    }
})
