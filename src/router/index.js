/**
 * Created by xiezg on 2017/3/10.
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const Help = () => import('~pages/Help' /* webpackChunkName: "chunks/main" */)

//  落地 home 主页

// 注册页
// 注册信息

//  登陆页
//  找回密码

//  重设密码
//  返佣详情

// 提现页面

// 代理合作协议
const Protocol = () => import('~pages/Protocol')

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
            path: '/help',
            component: Help
        },
        {
            path: '/help',
            component: Help
        },
        {
            path: '*',
            redirect: '/h5/home/hot'
        }
    ]
})

// 注意暴露出来
export default router
