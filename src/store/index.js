/**
 * Created by xiezg on 2017/3/10.
 */

import Vue from 'vue'
import Vuex from 'vuex'
import ajax from '~common/ajax'
import {platform, src, wait, convertToQueryString, getCk, isLowAndroidVersion} from '~common/util'
import {Indicator} from 'mint-ui'
Vue.use(Vuex)

let baseURL = 'ws://192.168.41.76:6999'
if (process.env.NODE_ENV === 'production') {
    baseURL = 'wss://crazybet.choopaoo.com/wss'
} else if (process.env.NODE_ENV === 'preRelease') {
    baseURL = 'ws://192.168.41.76:6999'
}

// 全局的就是直接变量，一个页面一个对象
const state = {
    ck: 0,
    userInfo: null,
    toastMsg: null,
    isLowAndroidVersion: false,
    formObj: {
        regisAjaxData: '',
        loginAjaxData: '',
        checkWdReset: '',
        isSuccReset: null
    },
    myHomeObj: {
        showCalendar: false, // 显示日历
        myhomeData: null, // 代理后台数据 myhome
        homeApplyList: null, // 提现记录
        payApply: null, // 提现申请
        inviteList: null, // 返佣详情
        moneyNumber:null,
        isSuccApply:null,
    }
}
const mutations = {
    setisLowAndroidVersion (state, data) {
        state.isLowAndroidVersion = data
    },
    ck (state, ck) {
        state.ck = ck
        localStorage.setItem('ck', ck)
    },
    userInfo (state, userInfo) {
        if (userInfo && userInfo.photo === '') {
            userInfo.photo = 'http://img.choopaoo.com/esun/upload/be/83/be837ad8049611e797ef.png'
        }
        state.userInfo = userInfo
    },
    toastMsg (state, msg) {
        state.toastMsg = msg
    },
    /* 注册 */
    regisAjaxData (state, data) {
        state.formObj.regisAjaxData = data
    },
    /* 登陆 */
    loginAjaxData (state, data) {
        state.formObj.loginAjaxData = data
    },
    /* 重置密码code 数据 */
    checkWdReset (state, data) {
        state.formObj.checkWdReset = data
    },
    /* 重置密码code 数据 */
    isSuccReset (state, data) {
        state.formObj.isSuccReset = data
    },
    /* showCalendar 修改日历 */
    setCalendar (state, data) {
        state.myHomeObj.showCalendar = data
    },
    /* myhomeData 代理后台数据 */
    setMyHomeData (state, data) {
        state.myHomeObj.myhomeData = data
    },
    /* homeApplyList 代理提现申请 */
    sethomeApplyList (state, data) {
        state.myHomeObj.homeApplyList = data
    },
    /* setInviteList 返佣详情数据 */
    setInviteList (state, data) {
        state.myHomeObj.inviteList = data
    },
    /* setMoneyNumber  存金额 */
    setMoneyNumber (state, data) {
        state.myHomeObj.moneyNumber = data
    },
    setSuccApply(state,data){
        state.myHomeObj.isSuccApply = data
    }
};
const actions = {
    clearLoginState ({commit, dispatch}, data) {
        commit('ck', '0');
        localStorage.setItem('qq_uid', 0);
        localStorage.removeItem('ck')
    },
    async setRegis ({state, commit, dispatch}, data) {
        /* 注册 */
        data = convertToQueryString(data);
        console.log(data);
        try {
            let regisData = await ajax.get(`/agent/register?${data}&platform=${platform}`);
            if (regisData.tips !== '') {
                commit('regisAjaxData', regisData)
            }
            console.log(regisData)
        } catch (e) {
            Indicator.close();
            dispatch('showToast', e.message)
        }
    },
    async getTelCode ({state, commit, dispatch}, data) {
        // 获取code
        data = convertToQueryString(data)
        console.log(data)
        try {
            let codeData = await ajax.get(`/agent/verify/get?${data}`)
            console.log(codeData)
        } catch (e) {
            if(e.code){
                if(e.code === '816'){
                    dispatch('showToast', {
                        duration: 1500,
                        message: e.message,
                        cb:()=>{
                            window.location.href = window.location.origin +'/crazybet_daili/#/login';
                        }
                    })
                }
            }else{
                dispatch('showToast', e.message)
            }
        }
    },
    async doLogin ({commit, dispatch}, params) {
        /* 登陆 */
        try {
            let doLoginData = null;
            params = convertToQueryString(params);
            doLoginData = await ajax.get(`agent/login?${params}&platform=${platform}`);
            if (doLoginData) {
                commit('loginAjaxData', doLoginData)
            }
        } catch (e) {
            dispatch('showToast', e.message)
        }
    },
    async checkWdReset ({commit, dispatch}, params) {
        /*  重置密码验证手机code  */
        try {
            let checkData = null;
            params = convertToQueryString(params);
            checkData = await ajax.get(`agent/passwd/reset/check?${params}&platform=${platform}`);
            commit('checkWdReset', checkData);
            console.log(checkData)
        } catch (e) {
            if(e.code){
                if(e.code === '816'){
                    dispatch('showToast', {
                        duration: 1500,
                        message: e.message,
                        cb:()=>{
                            window.location.href = window.location.origin +'/crazybet_daili/#/login';
                        }
                    })
                }
            }else{
                dispatch('showToast', e.message)
            }
        }
    },
    async passWdReset ({commit, dispatch}, params) {
        /* 重置密码 */
        try {
            let resetData = null
            params = convertToQueryString(params)
            resetData = await ajax.get(`agent/passwd/reset?${params}&platform=${platform}`)
            commit('isSuccReset', true)
            console.log(resetData)
        } catch (e) {
            if(e.code){
                if(e.code === '816'){
                    dispatch('showToast', {
                        duration: 1500,
                        message: e.message,
                        cb:()=>{
                            window.location.href = window.location.origin +'/crazybet_daili/#/login';
                        }
                    })
                }
            }else{
                dispatch('showToast', e.message)
            }
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
        /* 用户信息 审核的 */
        try {
            let userInfo = await ajax.get(`/agent/user/detail?token=${getCk()}&platform=${platform}`)
            commit('userInfo', userInfo)
        } catch (e) {
            if(e.code){
                if(e.code === '816'){
                    dispatch('showToast', {
                        duration: 1500,
                        message: e.message,
                        cb:()=>{
                            window.location.href = window.location.origin +'/crazybet_daili/#/login';
                        }
                    })
                }
            }else{
                if(e.code){
                    if(e.code === '816'){
                        dispatch('showToast', {
                            duration: 1500,
                            message: e.message,
                            cb:()=>{
                                window.location.href = window.location.origin +'/crazybet_daili/#/login';
                            }
                        })
                    }
                }else{
                    dispatch('showToast', e.message)
                }
            }
        }
    },
    async getUserHomeInfo ({state, commit, dispatch}, date) {
        /* 用户信息 后台的 */
        try {
            let userHomeInfo = await ajax.get(`/agent/invite/summary?token=${getCk()}&platform=${platform}&date=${date}`)
            commit('setMyHomeData', userHomeInfo)
        } catch (e) {
            if(e.code){
                if(e.code === '816'){
                    dispatch('showToast', {
                        duration: 1500,
                        message: e.message,
                        cb:()=>{
                            window.location.href = window.location.origin +'/crazybet_daili/#/login';
                        }
                    })
                }
            }else{
                dispatch('showToast', e.message)
            }
        }
    },
    async gethomeApplyList ({state, commit, dispatch}, date) {
        /*  代理套现记录   */
        try {
            let applyList = await ajax.get(`/agent/cashout/record?token=${getCk()}&platform=${platform}`);
            commit('sethomeApplyList', applyList)
        } catch (e) {
            if(e.code){
                if(e.code === '816'){
                    dispatch('showToast', {
                        duration: 1500,
                        message: e.message,
                        cb:()=>{
                            window.location.href = window.location.origin +'/crazybet_daili/#/login';
                        }
                    })
                }
            }else{
                dispatch('showToast', e.message)
            }
        }
    },
    async getInviteList ({state, commit, dispatch}, date) {
        /* 用户信息 后台的 */
        try {
            let inviteList = await ajax.get(`/agent/invite/list?token=${getCk()}&platform=${platform}&date=${date}`);
            commit('setInviteList', inviteList)
        } catch (e) {
            if(e.code){
                console.error(e.code);
            }
            dispatch('showToast', e.message)
        }
    },
    async setApplyMoney ({state, commit, dispatch}, money) {
        /*   申请提现 */
        try {
            let applyBack = await ajax.get(`/agent/refound/apply?token=${getCk()}&platform=${platform}&money=${money}`);
            commit('setSuccApply', applyBack)
        } catch (e) {
            console.log(e)
            if(e.code){
                console.error(e.code);
            }
            dispatch('showToast', e.message)
        }
    },
    async localLogin ({commit}, code) {
        let {ck} = await ajax.get(`/login/guest?deviceid=${code}`);
        localStorage.setItem('ck', ck);
        commit('ck', ck)
    }
};

export default () => new Vuex.Store({
    state,
    actions,
    mutations
})
