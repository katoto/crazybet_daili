/**
 * Created by xiezg on 2017/3/10.
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const Help = () => import('~pages/Help' /* webpackChunkName: "chunks/help" */)

//  落地 home 主页

// 注册页
const Regis = () => import('~pages/dailiDataPage/Regis' /* webpackChunkName: "chunks/regis" */)
// 注册信息   个人信息
const RegisMsg = () => import('~pages/dailiDataPage/RegisMsg' /* webpackChunkName: "chunks/regis_msg" */)

//  登陆页
const Login = () => import('~pages/dailiDataPage/Login' /* webpackChunkName: "chunks/login" */)
//  找回密码
//  重设密码
const ForgetPass = () => import('~pages/dailiDataPage/forgetPass' /* webpackChunkName: "chunks/forget_pass" */)

// 登陆后台首页
const MyHome = () => import('~pages/dailiDataPage/myhome' /* webpackChunkName: "chunks/myhome" */)
//  返佣详情
const MyHomeRebate = () => import('~pages/dailiDataPage/myhomeRebate' /* webpackChunkName: "chunks/myhome_rebate" */)
// 提现页面
const MyHomePayApply = () => import('~pages/dailiDataPage/myhomePayApply' /* webpackChunkName: "chunks/myhome_pay_apply" */)
const MyHomeApplyList = () => import('~pages/dailiDataPage/myhomeApplyList' /* webpackChunkName: "chunks/myhome_applyList" */)
/* 个人信息 */
const MyMessage = () => import('~pages/dailiDataPage/myMessage' /* webpackChunkName: "chunks/myMessage" */)
// 代理合作协议
const Protocol = () => import('~pages/Protocol'/* webpackChunkName: "chunks/protocol" */)

// mode 代表浏览器环境   路由是按顺序匹配的
const router = new VueRouter({
    mode: 'hash',
    routes: [
        {
            path: '/home/:from',
            component: Help
        },
        {
            path: '/protocol',
            component: Protocol
        },
        {
            path: '/register',
            component: Regis
        },
        {
            path: '/registerMsg',
            component: RegisMsg
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/myhome/:userCk',
            component: MyHome,
            meta:{ requiresAuth:true },
        },
        {
            path: '/myhomeRebate',
            component: MyHomeRebate,
            meta:{ requiresAuth:true },
        },
        {
            path: '/myhomeApplyList',
            component: MyHomeApplyList
        },
        {
            path: '/forgetPass',
            component: ForgetPass
        },
        {
            path: '/mymsg',
            component: MyMessage
        },
        {
            path: '/help',
            component: Help
        },
        {
            path: '*',
            redirect: '/login'
        }
    ]
})

// 注意暴露出来
export default router
