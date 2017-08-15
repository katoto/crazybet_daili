/**
 * Created by xiezg on 2017/3/10.
 */

import Vue from 'vue'
import Vuex from 'vuex'
import ajax from '~common/ajax'
import {platform, src, wait, convertToQueryString, getCk, isLowAndroidVersion} from '~common/util'
import {Indicator} from 'mint-ui';
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
    userInfo: null,
    toastMsg: null,
    isLowAndroidVersion: false,
    formObj:{
        regisAjaxData:'',
    },
    myHomeObj:{

    },
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
    regisAjaxData( state, data ){
        state.formObj.regisAjaxData = data;
    },

}
const actions = {
    clearLoginState ({commit, dispatch}, data) {
        commit('ck', '0')
        localStorage.setItem('qq_uid', 0)
        localStorage.removeItem('ck')
    },
    async setRegis ({state, commit, dispatch},data) {
        /* 注册 */
        data = convertToQueryString(data)
        console.log(data)
        try {
            let regisData = await ajax.get(`/agent/register?${data}&platform=${platform}`);
            if( regisData.tips !== '' ){
                commit('regisAjaxData', regisData)
            }
            console.log(regisData);
        } catch (e) {
            Indicator.close();
            dispatch('showToast', e.message + '/agent/register')
        }
    },
    async getTelCode ({state, commit, dispatch},data) {
        // 获取code
        data = convertToQueryString(data)
        console.log(data)
        try {
            let codeData = await ajax.get(`/agent/verify/get?${data}`);
            console.log(codeData)
        } catch (e) {
            dispatch('showToast', e.message + '/agent/verify/get')
        }
    },
    async doLogin ({commit, dispatch}, params) {
        /* 登陆 */
        try {
            let doLoginData = null;
            params = convertToQueryString(params);
            doLoginData = await ajax.get(`agent/login?${params}&platform=${platform}`);
            console.log(doLoginData);
            localStorage.setItem('ck', doLoginData.token);
            commit('ck', doLoginData.token);
            // dispatch('getUserInfo')
            return doLoginData.token
        } catch (e) {
            dispatch('showToast', e.message)
        }
    },
    async passWdReset ({commit, dispatch}, params) {
        /* 充值密码 */
        try {
            let resetData = null;
            params = convertToQueryString(params);
            resetData = await ajax.get(`passwd/reset?${params}&platform=${platform}`);
            console.log(resetData);
        } catch (e) {
            dispatch('showToast', e.message)
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
        /* 用户信息 */
        try {
            let userInfo = await ajax.get(`/agent/user/detail?token=${getCk()}&src=${src}`)
            commit('userInfo', userInfo)
        } catch (e) {
            dispatch('showToast', e.message + 'agent/user/detail')
        }
    },
    // async getUserInfo ({state, commit, dispatch}) {
    //     /* 套现页面 */
    //     try {
    //         let userInfo = await ajax.get(`/agent/user/detail?token=${getCk()}&src=${src}`)
    //         commit('userInfo', userInfo)
    //     } catch (e) {
    //         dispatch('showToast', e.message + 'agent/user/detail')
    //     }
    // },
    async localLogin ({commit}, code) {
        let {ck} = await ajax.get(`/login/guest?deviceid=${code}`)
        localStorage.setItem('ck', ck)
        commit('ck', ck)
    },
}

export default () => new Vuex.Store({
    state,
    actions,
    mutations,
})
